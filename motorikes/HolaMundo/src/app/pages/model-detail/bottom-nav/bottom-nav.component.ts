import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Motorcycle } from '../../../core/models/motorcycle.model';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-t border-border-hairline/50">
      <div class="max-w-container-max mx-auto px-6 md:px-margin-desktop h-16 flex items-center justify-between">
        
        <!-- Previous Model -->
        <a 
          *ngIf="prev" 
          [routerLink]="['/moto', prev.slug]"
          class="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors duration-300 group"
        >
          <span class="material-symbols-outlined text-lg transform group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
          <div class="flex flex-col">
            <span class="font-label-sm text-[9px] text-outline uppercase tracking-wider">Anterior</span>
            <span class="font-rajdhani font-semibold text-xs tracking-wider uppercase hidden sm:block">{{ prev.name }}</span>
          </div>
        </a>
        <div *ngIf="!prev" class="w-24"></div>

        <!-- Position Indicators (dots) -->
        <div class="flex items-center gap-1.5">
          <span 
            *ngFor="let dot of dots; let i = index"
            class="w-1.5 h-1.5 rounded-full transition-all duration-300"
            [class.bg-primary]="i === currentIndex"
            [class.w-4]="i === currentIndex"
            [class.bg-outline-variant]="i !== currentIndex"
          ></span>
        </div>

        <!-- Next Model -->
        <a 
          *ngIf="next" 
          [routerLink]="['/moto', next.slug]"
          class="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors duration-300 group text-right"
        >
          <div class="flex flex-col items-end">
            <span class="font-label-sm text-[9px] text-outline uppercase tracking-wider">Siguiente</span>
            <span class="font-rajdhani font-semibold text-xs tracking-wider uppercase hidden sm:block">{{ next.name }}</span>
          </div>
          <span class="material-symbols-outlined text-lg transform group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </a>
        <div *ngIf="!next" class="w-24"></div>

      </div>
    </div>
  `
})
export class BottomNavComponent {
  @Input() prev: Motorcycle | null = null;
  @Input() next: Motorcycle | null = null;
  @Input() currentIndex = 0;
  @Input() totalCount = 0;

  get dots(): number[] {
    return Array.from({ length: this.totalCount }, (_, i) => i);
  }
}
