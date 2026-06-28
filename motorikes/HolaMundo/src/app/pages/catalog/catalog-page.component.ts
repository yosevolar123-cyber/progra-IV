import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { FilterService, FilterState } from '../../core/services/filter.service';
import { Motorcycle } from '../../core/models/motorcycle.model';
import { CatalogFilterComponent } from './catalog-filter/catalog-filter.component';
import { MotorcycleCardComponent } from '../../shared/components/motorcycle-card/motorcycle-card.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton/loading-skeleton.component';
import { ScrollRevealDirective } from '../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    CommonModule, 
    CatalogFilterComponent, 
    MotorcycleCardComponent, 
    LoadingSkeletonComponent,
    ScrollRevealDirective
  ],
  templateUrl: './catalog-page.component.html',
  styles: []
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  allMotorcycles: Motorcycle[] = [];
  filteredMotorcycles: Motorcycle[] = [];
  isLoading = false;

  activeFilters: FilterState = {
    brands: [],
    types: [],
    minCilindrada: null,
    maxCilindrada: null,
    minPotencia: null,
    maxPotencia: null,
    minPrice: null,
    maxPrice: null
  };
  hasActiveFilters = false;
  debugLogs: string[] = [];

  private sub = new Subscription();

  constructor(
    private motorcycleService: MotorcycleService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  log(msg: string): void {
    const timestamp = new Date().toISOString().substring(11, 19);
    this.debugLogs.push(`[${timestamp}] ${msg}`);
    console.log(`[${timestamp}] ${msg}`);
  }

  ngOnInit(): void {
    this.log('ngOnInit called. Loading all motorcycles...');
    this.motorcycleService.getAll().subscribe(motos => {
      this.allMotorcycles = motos;
      this.log(`Loaded ${motos.length} motorcycles from service`);
      this.initFiltersFromUrlAndSubscribe();
    });
  }

  private initFiltersFromUrlAndSubscribe(): void {
    // 1. Read initial query params from URL
    const queryParams = this.route.snapshot.queryParams;
    this.log(`Initial URL query parameters: ${JSON.stringify(queryParams)}`);
    const initialBrands = queryParams['marca'] ? queryParams['marca'].split(',') : [];
    const initialTypes = queryParams['tipo'] ? queryParams['tipo'].split(',') : [];
    const initialMaxCc = queryParams['max_cc'] ? parseInt(queryParams['max_cc'], 10) : null;
    const initialMaxCv = queryParams['max_cv'] ? parseInt(queryParams['max_cv'], 10) : null;

    // Apply URL params to filter service state
    this.log(`Updating filter service with initial values`);
    this.filterService.updateFilters({
      brands: initialBrands,
      types: initialTypes,
      maxCilindrada: initialMaxCc,
      maxPotencia: initialMaxCv
    });

    // 2. Subscribe to filter service updates to perform filter logic & update URL
    this.sub.add(
      this.filterService.filters$.subscribe(state => {
        if (!state) return;
        this.log(`filters$ subscription fired. State: ${JSON.stringify(state)}`);
        this.activeFilters = state;
        this.hasActiveFilters = 
          (state.brands && state.brands.length > 0) || 
          (state.types && state.types.length > 0) || 
          (state.maxCilindrada !== null && state.maxCilindrada < 1100) || 
          (state.maxPotencia !== null && state.maxPotencia < 320);

        this.isLoading = true;

        // Perform filter and update visible list with a slight delay for smooth visual transition
        setTimeout(() => {
          try {
            this.log('Running executeFilterLogic...');
            this.executeFilterLogic(state);
            this.log(`Filter complete. Found ${this.filteredMotorcycles.length} models`);
            this.syncFiltersToUrl(state);
          } catch (err: any) {
            this.log(`EXCEPTION in setTimeout: ${err.message}`);
            console.error('Error executing catalog filters:', err);
          } finally {
            this.isLoading = false;
            this.log(`Set isLoading to false`);
            this.cdr.detectChanges();
          }
        }, 300);
      })
    );
  }

  private executeFilterLogic(state: FilterState): void {
    this.filteredMotorcycles = this.allMotorcycles.filter(moto => {
      // Brand filter
      if (state.brands && state.brands.length > 0 && !state.brands.includes(moto.brand)) {
        return false;
      }
      
      // Type filter
      if (state.types && state.types.length > 0 && !state.types.includes(moto.type.toUpperCase())) {
        return false;
      }

      // Displacement filter
      if (state.maxCilindrada !== null && state.maxCilindrada < 1100 && moto.specs.motor.cilindrada_cc > state.maxCilindrada) {
        return false;
      }

      // Horsepower filter
      if (state.maxPotencia !== null && state.maxPotencia < 320 && moto.specs.motor.potencia_cv > state.maxPotencia) {
        return false;
      }

      return true;
    });
  }

  private syncFiltersToUrl(state: FilterState): void {
    const queryParams: any = {};
    
    if (state.brands && state.brands.length > 0) {
      queryParams.marca = state.brands.join(',');
    }
    if (state.types && state.types.length > 0) {
      queryParams.tipo = state.types.join(',');
    }
    if (state.maxCilindrada !== null && state.maxCilindrada < 1100) {
      queryParams.max_cc = state.maxCilindrada;
    }
    if (state.maxPotencia !== null && state.maxPotencia < 320) {
      queryParams.max_cv = state.maxPotencia;
    }

    // Compare with current query params to avoid redundant navigation (infinite loop protection)
    const currentParams = this.route.snapshot.queryParams;
    const paramsChanged = 
      Object.keys(queryParams).length !== Object.keys(currentParams).length ||
      Object.keys(queryParams).some(key => queryParams[key]?.toString() !== currentParams[key]?.toString());

    if (paramsChanged) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        replaceUrl: true
      });
    }
  }

  removeBrand(brand: string): void {
    this.filterService.toggleBrand(brand);
  }

  removeType(type: string): void {
    this.filterService.toggleType(type);
  }

  removeCilindrada(): void {
    this.filterService.updateFilters({ maxCilindrada: null });
  }

  removePotencia(): void {
    this.filterService.updateFilters({ maxPotencia: null });
  }

  clearFilters(): void {
    this.filterService.resetFilters();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
