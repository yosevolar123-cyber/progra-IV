import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') targetValue = 0;
  @Input() duration = 2000; // Animation duration in milliseconds
  @Input() delay = 0; // Startup delay in ms

  private observer: IntersectionObserver | null = null;
  private animationFrameId: number | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // Set initial value immediately for SSR
      this.el.nativeElement.textContent = this.targetValue.toLocaleString();
      return;
    }

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.startCountUp();
            }, this.delay);
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      }, {
        threshold: 0.1
      });

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback
      this.el.nativeElement.textContent = this.targetValue.toLocaleString();
    }
  }

  private startCountUp(): void {
    const startTime = performance.now();
    const startValue = 0;
    
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + (this.targetValue - startValue) * easeProgress);
      
      this.el.nativeElement.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.el.nativeElement.textContent = this.targetValue.toLocaleString();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
