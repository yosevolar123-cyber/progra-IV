import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';
import { CountUpDirective } from '../../../core/directives/count-up.directive';

@Component({
  selector: 'app-guarantee-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, CountUpDirective],
  templateUrl: './guarantee-section.component.html',
  styles: []
})
export class GuaranteeSectionComponent {
  cards = [
    {
      icon: 'build',
      title: 'Mano de Obra Especializada',
      description: 'Taller de servicio oficial con mecánicos especializados en puesta a punto japonesa para garantizar la máxima precisión.'
    },
    {
      icon: 'inventory_2',
      title: 'Repuestos Originales',
      description: 'Acceso directo y stock inmediato a piezas genuinas importadas directamente desde los fabricantes en Japón.'
    },
    {
      icon: 'support_agent',
      title: 'Asistencia en Ruta',
      description: 'Soporte técnico móvil y traslado en grúa de emergencia disponible las 24 horas, los 7 días de la semana, ante percances.'
    }
  ];
}
