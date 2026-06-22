import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spec-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex justify-between items-center py-2.5 border-b border-border-hairline hover:bg-white/5 px-2 transition-all duration-300">
      <span class="font-label-sm text-outline uppercase tracking-wider text-[11px]">{{ label }}</span>
      <span class="font-body-md text-on-surface text-right font-medium">{{ value || 'N/D' }}</span>
    </div>
  `
})
export class SpecRowComponent {
  @Input() label = '';
  @Input() value: string | number | undefined = '';
}
