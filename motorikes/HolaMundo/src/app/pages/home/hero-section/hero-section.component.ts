import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';
import { CountUpDirective } from '../../../core/directives/count-up.directive';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollRevealDirective, CountUpDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  translateX = 0;
  translateY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const x = event.clientX;
    const y = event.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Parallax intensity: 0.02
    this.translateX = (x - width / 2) * -0.02;
    this.translateY = (y - height / 2) * -0.02;
  }
}
