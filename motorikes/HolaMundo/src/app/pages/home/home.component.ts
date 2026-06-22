import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { BrandsSectionComponent } from './brands-section/brands-section.component';
import { CatalogSectionComponent } from './catalog-section/catalog-section.component';
import { GuaranteeSectionComponent } from './guarantee-section/guarantee-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    BrandsSectionComponent,
    CatalogSectionComponent,
    GuaranteeSectionComponent,
    ContactSectionComponent
  ],
  template: `
    <div class="relative w-full">
      <!-- Landing Page sections -->
      <app-hero-section></app-hero-section>
      <app-brands-section></app-brands-section>
      <app-catalog-section></app-catalog-section>
      <app-guarantee-section></app-guarantee-section>
      <app-contact-section></app-contact-section>
    </div>
  `
})
export class HomeComponent { }
