import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="animate-pulse bg-surface rounded border border-border-hairline overflow-hidden p-6 h-96 flex flex-col justify-between"
      [class]="customClass"
    >
      <!-- Image area skeleton -->
      <div class="h-44 bg-surface-container rounded mb-4"></div>
      
      <!-- Title skeleton -->
      <div class="h-6 bg-surface-container-high w-3/4 rounded mb-2"></div>
      <div class="h-4 bg-surface-container-high w-1/4 rounded mb-4"></div>
      
      <!-- Specs grid skeleton -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="h-3 bg-surface-container-high rounded w-5/6"></div>
        <div class="h-3 bg-surface-container-high rounded w-2/3"></div>
        <div class="h-3 bg-surface-container-high rounded w-4/5"></div>
        <div class="h-3 bg-surface-container-high rounded w-1/2"></div>
      </div>
      
      <!-- Button skeleton -->
      <div class="h-10 bg-surface-container-highest rounded w-full"></div>
    </div>
  `
})
export class LoadingSkeletonComponent {
  @Input() customClass = '';
}
