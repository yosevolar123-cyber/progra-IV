import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogPageComponent } from './pages/catalog/catalog-page.component';
import { ModelDetailComponent } from './pages/model-detail/model-detail.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'HirosimaBikeMotors — Home',
    data: { animation: 'home' }
  },
  { 
    path: 'catalogo', 
    component: CatalogPageComponent, 
    title: 'HirosimaBikeMotors — Catálogo',
    data: { animation: 'catalog' }
  },
  { 
    path: 'moto/:slug', 
    component: ModelDetailComponent,
    title: 'HirosimaBikeMotors — Modelo',
    data: { animation: 'detail' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
