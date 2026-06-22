import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MotorcycleService } from '../../../core/services/motorcycle.service';
import { Motorcycle } from '../../../core/models/motorcycle.model';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';
import { MotorcycleCardComponent } from '../../../shared/components/motorcycle-card/motorcycle-card.component';
import { LoadingSkeletonComponent } from '../../../shared/components/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-catalog-section',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    SectionHeaderComponent, 
    ScrollRevealDirective, 
    MotorcycleCardComponent,
    LoadingSkeletonComponent
  ],
  templateUrl: './catalog-section.component.html',
  styles: []
})
export class CatalogSectionComponent implements OnInit {
  allMotorcycles: Motorcycle[] = [];
  filteredMotorcycles: Motorcycle[] = [];
  visibleMotorcycles: Motorcycle[] = [];
  
  activeTab = 'ALL';
  visibleLimit = 4;
  isLoading = false;
  hasMore = false;

  tabs = [
    { label: 'TODOS', value: 'ALL' },
    { label: 'SPORT / PISTA', value: 'SPORT' },
    { label: 'NAKED / URBANO', value: 'NAKED' },
    { label: 'TRACK (EXCLUSIVE)', value: 'TRACK' },
    { label: 'SCOOTER', value: 'SCOOTER' },
    { label: 'COMMUTER / TRABAJO', value: 'COMMUTER' },
    { label: 'OFF-ROAD', value: 'OFF-ROAD' }
  ];

  constructor(private motorcycleService: MotorcycleService) { }

  ngOnInit(): void {
    this.motorcycleService.getAll().subscribe(motos => {
      this.allMotorcycles = motos;
      this.applyFilter();
    });
  }

  selectTab(tabValue: string): void {
    if (this.activeTab === tabValue) return;
    
    this.isLoading = true;
    this.activeTab = tabValue;
    this.visibleLimit = 4; // Reset limit when tab changes

    // Simulate smooth asynchronous load for animations
    setTimeout(() => {
      this.applyFilter();
      this.isLoading = false;
    }, 350);
  }

  applyFilter(): void {
    if (this.activeTab === 'ALL') {
      this.filteredMotorcycles = this.allMotorcycles;
    } else {
      this.filteredMotorcycles = this.allMotorcycles.filter(
        m => m.type.toUpperCase() === this.activeTab
      );
    }
    this.updateVisibleList();
  }

  updateVisibleList(): void {
    this.visibleMotorcycles = this.filteredMotorcycles.slice(0, this.visibleLimit);
    this.hasMore = this.visibleLimit < this.filteredMotorcycles.length;
  }

  loadMore(): void {
    this.visibleLimit += 4;
    this.updateVisibleList();
  }
}
