import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-12 flex flex-col items-center text-center" [class]="customClass">
      <span *ngIf="eyebrow" class="font-label-sm text-primary uppercase tracking-widest mb-3 block">
        {{ eyebrow }}
      </span>
      
      <h2 class="font-headline-lg md:text-[40px] text-[32px] text-on-surface uppercase font-semibold tracking-wide">
        {{ title }}
      </h2>
      
      <!-- Decorative Accent Line -->
      <div class="flex items-center gap-1.5 mt-4 mb-5">
        <span class="h-0.5 w-8 bg-gradient-to-r from-transparent to-primary"></span>
        <span class="w-1.5 h-1.5 bg-primary rotate-45"></span>
        <span class="h-0.5 w-8 bg-gradient-to-r from-primary to-transparent"></span>
      </div>
      
      <p *ngIf="description" class="font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
        {{ description }}
      </p>
    </div>
  `
})
export class SectionHeaderComponent {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() customClass = '';
}
