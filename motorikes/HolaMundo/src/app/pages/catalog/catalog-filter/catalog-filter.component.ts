import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FilterService } from '../../../core/services/filter.service';
import { MotorcycleService } from '../../../core/services/motorcycle.service';
import { Brand } from '../../../core/models/brand.model';

@Component({
  selector: 'app-catalog-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-filter.component.html',
  styles: []
})
export class CatalogFilterComponent implements OnInit, OnDestroy {
  availableBrands: Brand[] = [];
  availableTypes = ['SPORT', 'NAKED', 'TRACK', 'SCOOTER', 'COMMUTER', 'OFF-ROAD'];
  
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  maxCilindrada: number | null = null;
  maxPotencia: number | null = null;

  private sub = new Subscription();

  constructor(
    private filterService: FilterService,
    private motorcycleService: MotorcycleService
  ) { }

  ngOnInit(): void {
    this.availableBrands = this.motorcycleService.getBrands();
    
    // Subscribe to filter state updates to sync UI
    this.sub.add(
      this.filterService.filters$.subscribe(state => {
        this.selectedBrands = state.brands;
        this.selectedTypes = state.types;
        this.maxCilindrada = state.maxCilindrada;
        this.maxPotencia = state.maxPotencia;
      })
    );
  }

  toggleBrand(brandSlug: string): void {
    this.filterService.toggleBrand(brandSlug);
  }

  toggleType(type: string): void {
    this.filterService.toggleType(type);
  }

  onCilindradaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    this.filterService.updateFilters({ maxCilindrada: value });
  }

  onPotenciaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    this.filterService.updateFilters({ maxPotencia: value });
  }

  resetAll(): void {
    this.filterService.resetFilters();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
