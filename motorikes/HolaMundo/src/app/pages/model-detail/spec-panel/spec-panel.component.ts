import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecRowComponent } from '../../../shared/components/spec-row/spec-row.component';
import { MotorcycleSpecs } from '../../../core/models/motorcycle.model';
import { SpecSection } from '../../../core/models/spec-section.model';

@Component({
  selector: 'app-spec-panel',
  standalone: true,
  imports: [CommonModule, SpecRowComponent],
  template: `
    <div class="flex flex-col gap-6">
      <div *ngFor="let section of specSections; let idx = index" class="border border-border-hairline/40 rounded-xl overflow-hidden">
        <!-- Section Header (clickable to toggle) -->
        <button 
          (click)="toggleSection(idx)"
          class="w-full flex items-center justify-between px-5 py-4 bg-surface-container/50 hover:bg-surface-container transition-colors duration-300 cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-xl">{{ section.icon }}</span>
            <h4 class="font-rajdhani font-bold text-sm tracking-widest text-on-surface uppercase">{{ section.title }}</h4>
          </div>
          <span 
            class="material-symbols-outlined text-outline text-xl transition-transform duration-300"
            [class.rotate-180]="openSections[idx]"
          >
            expand_more
          </span>
        </button>

        <!-- Section Content (collapsible) -->
        <div 
          *ngIf="openSections[idx]"
          class="px-4 py-2 bg-surface/50"
        >
          <app-spec-row 
            *ngFor="let spec of section.specs"
            [label]="spec.label"
            [value]="spec.value"
          ></app-spec-row>
        </div>
      </div>
    </div>
  `
})
export class SpecPanelComponent {
  @Input() set specs(value: MotorcycleSpecs | undefined) {
    if (value) {
      this.buildSections(value);
    }
  }

  specSections: SpecSection[] = [];
  openSections: boolean[] = [];

  private buildSections(s: MotorcycleSpecs): void {
    this.specSections = [
      {
        title: 'Motor y Rendimiento',
        icon: 'settings',
        specs: [
          { label: 'Tipo', value: s.motor.tipo },
          { label: 'Cilindrada', value: s.motor.cilindrada_cc + ' cc' },
          { label: 'Refrigeración', value: s.motor.refrigeracion },
          { label: 'Potencia', value: s.motor.potencia_cv + ' CV @ ' + (s.motor.potencia_rpm || '—') + ' rpm' },
          { label: 'Torque', value: s.motor.torque_nm ? s.motor.torque_nm + ' Nm @ ' + (s.motor.torque_rpm || '—') + ' rpm' : undefined },
          { label: 'Alimentación', value: s.motor.alimentacion },
          { label: 'Transmisión', value: s.motor.transmision },
          { label: 'Vel. Máxima', value: s.motor.velocidad_max_kmh ? s.motor.velocidad_max_kmh + ' km/h' : undefined },
          { label: 'Diámetro x Carrera', value: s.motor.diametro_carrera },
          { label: 'Relación Compresión', value: s.motor.relacion_compresion },
          { label: 'Potencia con Ram Air', value: s.motor.potencia_con_ram_air_cv ? s.motor.potencia_con_ram_air_cv + ' CV' : undefined },
          { label: 'Arranque', value: s.motor.arranque },
        ].filter(item => item.value !== undefined && item.value !== null)
      },
      {
        title: 'Chasis y Suspensión',
        icon: 'two_wheeler',
        specs: [
          { label: 'Chasis', value: s.chasis.tipo },
          { label: 'Suspensión Delantera', value: s.chasis.suspension_delantera },
          { label: 'Suspensión Trasera', value: s.chasis.suspension_trasera },
          { label: 'Amort. Dirección', value: s.chasis.amortiguador_direccion },
        ].filter(item => item.value !== undefined && item.value !== null)
      },
      {
        title: 'Frenos y Neumáticos',
        icon: 'speed',
        specs: [
          { label: 'Freno Delantero', value: s.frenos.delantero },
          { label: 'Freno Trasero', value: s.frenos.trasero },
          { label: 'Asistencia', value: s.frenos.asistencia },
          { label: 'Neumático Delantero', value: s.neumaticos.delantero },
          { label: 'Neumático Trasero', value: s.neumaticos.trasero },
        ].filter(item => item.value !== undefined && item.value !== null)
      },
      {
        title: 'Dimensiones y Capacidad',
        icon: 'straighten',
        specs: [
          { label: 'Peso', value: this.getWeight(s) },
          { label: 'Depósito', value: s.dimensiones.deposito_litros + ' litros' },
          { label: 'Altura Asiento', value: s.dimensiones.altura_asiento_mm + ' mm' },
          { label: 'Distancia Ejes', value: s.dimensiones.distancia_ejes_mm + ' mm' },
          { label: 'Distancia al Suelo', value: s.dimensiones.distancia_suelo_mm ? s.dimensiones.distancia_suelo_mm + ' mm' : undefined },
          { label: 'Maletero', value: s.dimensiones.maletero_litros ? s.dimensiones.maletero_litros + ' litros' : undefined },
        ].filter(item => item.value !== undefined && item.value !== null)
      }
    ];

    // Add electronics section if available
    if (s.electronica && s.electronica.length > 0) {
      this.specSections.push({
        title: 'Electrónica',
        icon: 'memory',
        specs: s.electronica.map((item, i) => ({ label: 'Sistema ' + (i + 1), value: item }))
      });
    }

    // Open all sections by default
    this.openSections = this.specSections.map(() => true);
  }

  private getWeight(s: MotorcycleSpecs): string {
    if (s.dimensiones.peso_kg) return s.dimensiones.peso_kg + ' kg';
    if (s.dimensiones.peso_marcha_kg) return s.dimensiones.peso_marcha_kg + ' kg (en marcha)';
    if (s.dimensiones.peso_seco_kg) return s.dimensiones.peso_seco_kg + ' kg (seco)';
    return 'N/D';
  }

  toggleSection(idx: number): void {
    this.openSections[idx] = !this.openSections[idx];
  }
}
