import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="badgeClasses"
      class="inline-flex items-center gap-1 font-technical text-[10px] tracking-wider px-2 py-0.5 rounded-full border bg-opacity-10 backdrop-blur-md transition-all duration-300"
    >
      <span class="w-1.5 h-1.5 rounded-full animate-pulse" [class]="dotClasses"></span>
      {{ brandName }}
    </span>
  `
})
export class BrandBadgeComponent implements OnInit {
  @Input() brand = '';

  brandName = '';
  badgeClasses = '';
  dotClasses = '';

  ngOnInit(): void {
    const b = this.brand.toLowerCase();
    switch (b) {
      case 'kawasaki':
        this.brandName = 'KAWASAKI';
        this.badgeClasses = 'border-[#39FF14]/30 text-[#39FF14] bg-[#39FF14]';
        this.dotClasses = 'bg-[#39FF14]';
        break;
      case 'honda':
        this.brandName = 'HONDA';
        this.badgeClasses = 'border-[#CC0000]/30 text-[#CC0000] bg-[#CC0000]';
        this.dotClasses = 'bg-[#CC0000]';
        break;
      case 'yamaha':
        this.brandName = 'YAMAHA';
        this.badgeClasses = 'border-[#003087]/30 text-[#CEBDFF] bg-[#003087]';
        this.dotClasses = 'bg-[#003087]';
        break;
      case 'suzuki':
        this.brandName = 'SUZUKI';
        this.badgeClasses = 'border-[#E8840B]/30 text-[#E8840B] bg-[#E8840B]';
        this.dotClasses = 'bg-[#E8840B]';
        break;
      default:
        this.brandName = this.brand.toUpperCase();
        this.badgeClasses = 'border-primary/30 text-primary bg-primary';
        this.dotClasses = 'bg-primary';
        break;
    }
  }
}
