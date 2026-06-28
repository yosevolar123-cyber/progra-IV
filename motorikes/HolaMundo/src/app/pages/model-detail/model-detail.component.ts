import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MotorcycleService } from '../../core/services/motorcycle.service';
import { Motorcycle } from '../../core/models/motorcycle.model';
import { BrandBadgeComponent } from '../../shared/components/brand-badge/brand-badge.component';
import { SpecPanelComponent } from './spec-panel/spec-panel.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';

@Component({
  selector: 'app-model-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BrandBadgeComponent,
    SpecPanelComponent,
    BottomNavComponent,
    PriceFormatPipe
  ],
  templateUrl: './model-detail.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ModelDetailComponent implements OnInit, OnDestroy {
  motorcycle: Motorcycle | undefined;
  adjacentModels: { prev: Motorcycle | null; next: Motorcycle | null } = { prev: null, next: null };
  currentIndex = 0;
  totalCount = 0;

  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private motorcycleService: MotorcycleService
  ) {}

  ngOnInit(): void {
    // Subscribe to param changes so navigating prev/next reloads the component data
    this.sub.add(
      this.route.params.subscribe(params => {
        const slug = params['slug'];
        if (slug) {
          this.loadMotorcycle(slug);
        }
      })
    );
  }

  private loadMotorcycle(slug: string): void {
    this.motorcycleService.getBySlug(slug).subscribe(moto => {
      this.motorcycle = moto;

      if (moto) {
        // Calculate index and adjacent models after getting all motorcycles (ensuring cache is loaded)
        this.motorcycleService.getAll().subscribe(all => {
          this.totalCount = all.length;
          this.currentIndex = all.findIndex(m => m.id === moto.id);
          this.adjacentModels = this.motorcycleService.getAdjacentModels(moto.id);
        });
      }

      // Scroll to top when loading a new model
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
