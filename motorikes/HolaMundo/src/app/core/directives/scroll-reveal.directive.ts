import { Directive, ElementRef, AfterViewInit, Input, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0; // Delay in milliseconds
  @Input() threshold = 0.15; // Visibility threshold

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Check browser compatibility
    if ('IntersectionObserver' in window) {
      // Add base reveal class
      const element = this.el.nativeElement as HTMLElement;
      element.classList.add('reveal');

      if (this.revealDelay > 0) {
        element.style.transitionDelay = `${this.revealDelay}ms`;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.add('active');
            // Unobserve after revealing to prevent repeated triggering
            this.observer?.unobserve(element);
          }
        });
      }, {
        threshold: this.threshold
      });

      this.observer.observe(element);
    } else {
      // Fallback if IntersectionObserver is not supported: show immediately
      (this.el.nativeElement as HTMLElement).classList.add('active');
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
