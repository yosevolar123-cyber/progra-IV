import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MotorcycleService } from '../../../core/services/motorcycle.service';
import { Brand } from '../../../core/models/brand.model';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-brands-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, ScrollRevealDirective],
  templateUrl: './brands-section.component.html',
  styles: []
})
export class BrandsSectionComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private motorcycleService: MotorcycleService) { }

  ngOnInit(): void {
    this.brands = this.motorcycleService.getBrands();
  }
}
