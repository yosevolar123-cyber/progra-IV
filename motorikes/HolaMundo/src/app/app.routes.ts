import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogPageComponent } from './pages/catalog/catalog-page.component';
import { ModelDetailComponent } from './pages/model-detail/model-detail.component';
import { GuaranteesPageComponent } from './pages/guarantees/guarantees-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPortalComponent } from './pages/admin/admin-portal.component';
import { adminGuard } from './core/guards/admin.guard';

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
    path: 'garantias', 
    component: GuaranteesPageComponent, 
    title: 'HirosimaBikeMotors — Garantías',
    data: { animation: 'guarantees' }
  },
  { 
    path: 'contacto', 
    component: ContactPageComponent, 
    title: 'HirosimaBikeMotors — Contacto',
    data: { animation: 'contact' }
  },
  { 
    path: 'moto/:slug', 
    component: ModelDetailComponent,
    title: 'HirosimaBikeMotors — Modelo',
    data: { animation: 'detail' }
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'HirosimaBikeMotors — Iniciar Sesión',
    data: { animation: 'login' }
  },
  {
    path: 'admin',
    component: AdminPortalComponent,
    canActivate: [adminGuard],
    title: 'HirosimaBikeMotors — Administración',
    data: { animation: 'admin' }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
