import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="glass-panel rounded-xl border border-border-hairline overflow-hidden relative"
      [class]="customClass"
    >
      <!-- Subtle internal glow -->
      <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div class="relative z-10 p-6">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class GlassCardComponent {
  @Input() customClass = '';
}
