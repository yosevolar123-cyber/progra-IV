import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Motorcycle } from '../models/motorcycle.model';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class MotorcycleService {

  // Brand static list
  private readonly brands: Brand[] = [
    {
      id: 'brand-kawasaki',
      name: 'Kawasaki',
      slug: 'kawasaki',
      description: 'Ingeniería extrema y sobrealimentación en circuito. El verde característico de la deportividad pura sin compromisos.',
      logoText: 'KAWASAKI',
      colorAccent: '#39FF14',
      bgAccent: 'rgba(57, 255, 20, 0.1)'
    },
    {
      id: 'brand-honda',
      name: 'Honda',
      slug: 'honda',
      description: 'Fiabilidad legendaria, control total y eficiencia tecnológica que lidera la movilidad a nivel global.',
      logoText: 'HONDA',
      colorAccent: '#CC0000',
      bgAccent: 'rgba(204, 0, 0, 0.1)'
    },
    {
      id: 'brand-yamaha',
      name: 'Yamaha',
      slug: 'yamaha',
      description: 'Conexión emocional y revolución de sensaciones mediante motores Crossplane inspirados en MotoGP.',
      logoText: 'YAMAHA',
      colorAccent: '#003087',
      bgAccent: 'rgba(0, 48, 135, 0.1)'
    },
    {
      id: 'brand-suzuki',
      name: 'Suzuki',
      slug: 'suzuki',
      description: 'Poder equilibrado y precisión japonesa de competición concebida para dominar tanto el asfalto como la tierra.',
      logoText: 'SUZUKI',
      colorAccent: '#E8840B',
      bgAccent: 'rgba(232, 132, 11, 0.1)'
    }
  ];

  // 20 Motorcycles Mock Data
  private readonly motorcycles: Motorcycle[] = [
    // --- KAWASAKI ---
    {
      id: 'kaw-01',
      slug: 'kawasaki-z750-abs',
      name: 'Z750 ABS',
      year_range: '2007–2012',
      type: 'NAKED',
      image: 'assets/images/motos/kawasaki1.png',
      brand: 'kawasaki',
      price: 8200,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16 válvulas',
          cilindrada_cc: 748,
          refrigeracion: 'Líquida',
          potencia_cv: 106,
          potencia_rpm: 10500,
          torque_nm: 78,
          torque_rpm: 8300,
          alimentacion: 'Inyección electrónica Keihin 32mm',
          transmision: '6 velocidades, cadena',
          velocidad_max_kmh: 235
        },
        chasis: {
          tipo: 'Espina dorsal tubular acero alta resistencia',
          suspension_delantera: 'Horquilla invertida 41mm, ajustable, 120mm recorrido',
          suspension_trasera: 'Uni-Trak gas, ajustable rebote 4 vías + precarga 7 clics'
        },
        frenos: {
          delantero: 'Doble disco lobulado 300mm, pinzas 2 pistones, ABS',
          trasero: 'Monodisco lobulado 250mm, pinza 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17',
          trasero: '180/55-ZR17'
        },
        dimensiones: {
          peso_kg: 226,
          deposito_litros: 18.5,
          altura_asiento_mm: 815,
          distancia_ejes_mm: 1440
        }
      }
    },
    {
      id: 'kaw-02',
      slug: 'kawasaki-ninja-300-se',
      name: 'Ninja 300 Special Edition',
      year_range: '2013–2017',
      type: 'SPORT',
      image: 'assets/images/motos/kawasaki2.png',
      brand: 'kawasaki',
      price: 4900,
      specs: {
        motor: {
          tipo: 'Bicilíndrico en paralelo, 4T, DOHC, 8 válvulas',
          cilindrada_cc: 296,
          diametro_carrera: '62.0 x 49.0 mm',
          relacion_compresion: '10.6:1',
          refrigeracion: 'Líquida',
          potencia_cv: 39,
          potencia_rpm: 11000,
          torque_nm: 27,
          torque_rpm: 10000,
          alimentacion: 'Inyección electrónica Keihin 32mm',
          transmision: '6 velocidades, embrague antirrebote, cadena',
          velocidad_max_kmh: 175
        },
        chasis: {
          tipo: 'Diamante acero alta resistencia',
          suspension_delantera: 'Horquilla telescópica 37mm, 120mm recorrido',
          suspension_trasera: 'Uni-Trak gas, precarga 5 clics, 132mm recorrido'
        },
        frenos: {
          delantero: 'Monodisco lobulado 290mm, pinza 2 pistones (con/sin ABS)',
          trasero: 'Monodisco lobulado 220mm, pinza 2 pistones'
        },
        neumaticos: {
          delantero: '110/70-17 M/C 54S',
          trasero: '140/70-17 M/C 66S'
        },
        dimensiones: {
          peso_kg: 172,
          deposito_litros: 17,
          altura_asiento_mm: 785,
          distancia_ejes_mm: 1405,
          distancia_suelo_mm: 140
        }
      }
    },
    {
      id: 'kaw-03',
      slug: 'kawasaki-ninja-h2r',
      name: 'Ninja H2R',
      year_range: '2015–presente',
      type: 'TRACK',
      image: 'assets/images/motos/kawasaki3.png',
      brand: 'kawasaki',
      badge_special: 'SOLO CIRCUITO',
      price: 55000,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16v, Supercharged',
          cilindrada_cc: 998,
          diametro_carrera: '76.0 x 55.0 mm',
          relacion_compresion: '8.3:1',
          refrigeracion: 'Líquida',
          potencia_cv: 310,
          potencia_con_ram_air_cv: 326,
          potencia_rpm: 14000,
          torque_nm: 165,
          torque_rpm: 12500,
          alimentacion: 'Inyección doble inyector por cilindro, 50mm',
          transmision: '6 velocidades dog-ring, KQS bidireccional, antirrebote',
          velocidad_max_kmh: 400
        },
        chasis: {
          tipo: 'Multitubular Trellis acero alta resistencia',
          suspension_delantera: 'KYB AOS-II invertida 43mm, totalmente ajustable, 120mm',
          suspension_trasera: 'Öhlins TTX36 gas depósito separado, totalmente ajustable, 135mm',
          amortiguador_direccion: 'Öhlins electrónico'
        },
        frenos: {
          delantero: 'Doble disco Brembo semiflotante 330mm, pinzas radiales Brembo Stylema 4p, ABS curva KIBS',
          trasero: 'Monodisco 250mm, pinza Brembo 2 pistones'
        },
        neumaticos: {
          delantero: '120/600 R17 Slick Bridgestone Racing Battlax V01',
          trasero: '190/650 R17 Slick Bridgestone Racing Battlax V01'
        },
        dimensiones: {
          peso_kg: 216,
          deposito_litros: 17,
          altura_asiento_mm: 830,
          distancia_ejes_mm: 1450,
          distancia_suelo_mm: 130
        }
      }
    },
    {
      id: 'kaw-04',
      slug: 'kawasaki-z1000-abs',
      name: 'Z1000 ABS',
      year_range: '2014–2021',
      type: 'NAKED',
      image: 'assets/images/motos/kawasaki4.png',
      brand: 'kawasaki',
      price: 11500,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16 válvulas',
          cilindrada_cc: 1043,
          diametro_carrera: '77.0 x 56.0 mm',
          relacion_compresion: '11.8:1',
          refrigeracion: 'Líquida',
          potencia_cv: 142,
          potencia_rpm: 10000,
          torque_nm: 111,
          torque_rpm: 7300,
          alimentacion: 'Inyección Keihin 38mm',
          transmision: '6 velocidades, cadena, embrague antirrebote',
          velocidad_max_kmh: 250
        },
        chasis: {
          tipo: 'Doble viga de aluminio',
          suspension_delantera: 'Showa SFF-BP invertida 41mm, totalmente ajustable, 120mm',
          suspension_trasera: 'Back-link horizontal gas, ajustable precarga y extensión, 122mm'
        },
        frenos: {
          delantero: 'Doble disco semiflotante 310mm, pinzas Tokico monobloque radial 4p, ABS',
          trasero: 'Monodisco lobulado 250mm, pinza 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '190/50-ZR17 M/C 73W'
        },
        dimensiones: {
          peso_kg: 221,
          deposito_litros: 17,
          altura_asiento_mm: 815,
          distancia_ejes_mm: 1435,
          distancia_suelo_mm: 125
        }
      }
    },
    {
      id: 'kaw-05',
      slug: 'kawasaki-kx250f',
      name: 'KX250F',
      year_range: '2017–2018',
      type: 'OFF-ROAD',
      image: 'assets/images/motos/kawasaki5.png',
      brand: 'kawasaki',
      badge_special: 'MOTOCROSS',
      price: 7200,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, DOHC, 4 válvulas',
          cilindrada_cc: 249,
          diametro_carrera: '77.0 x 53.6 mm',
          relacion_compresion: '13.7:1',
          refrigeracion: 'Líquida',
          potencia_cv: 40,
          potencia_rpm: 12500,
          alimentacion: 'Inyección doble inyector Keihin 43mm',
          arranque: 'Kickstarter',
          transmision: '5 velocidades, cadena'
        },
        chasis: {
          tipo: 'Perimetral aluminio alta resistencia',
          suspension_delantera: 'Showa SFF Tipo 2 48mm, ajustable, 310mm recorrido',
          suspension_trasera: 'Uni-Trak Showa gas, totalmente ajustable, 310mm recorrido'
        },
        frenos: {
          delantero: 'Monodisco lobulado 270mm, pinza 2 pistones',
          trasero: 'Monodisco lobulado 240mm, pinza 1 pistón'
        },
        neumaticos: {
          delantero: '80/100-21 Dunlop Geomax MX3S',
          trasero: '100/90-19 Dunlop Geomax MX3S'
        },
        dimensiones: {
          peso_kg: 104.5,
          deposito_litros: 6.4,
          altura_asiento_mm: 945,
          distancia_ejes_mm: 1475,
          distancia_suelo_mm: 320
        }
      }
    },

    // --- HONDA ---
    {
      id: 'hon-01',
      slug: 'honda-cg160-fan',
      name: 'CG 160 Fan',
      year_range: '2016–presente',
      type: 'COMMUTER',
      image: 'assets/images/motos/honda1.png',
      brand: 'honda',
      price: 2100,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, OHC, 2 válvulas',
          cilindrada_cc: 162.7,
          diametro_carrera: '57.3 x 63.0 mm',
          relacion_compresion: '9.5:1',
          refrigeracion: 'Por aire',
          potencia_cv: 14.9,
          potencia_rpm: 8000,
          torque_nm: 14,
          torque_rpm: 6000,
          alimentacion: 'Inyección PGM-FI',
          transmision: '5 velocidades, cadena',
          arranque: 'Eléctrico'
        },
        chasis: {
          tipo: 'Diamante tubo de acero',
          suspension_delantera: 'Horquilla telescópica, 135mm',
          suspension_trasera: 'Doble amortiguador, 106mm'
        },
        frenos: {
          delantero: 'Monodisco 240mm, CBS',
          trasero: 'Tambor 130mm, CBS'
        },
        neumaticos: {
          delantero: '80/100-18 M/C 47P',
          trasero: '90/90-18 M/C 57P'
        },
        dimensiones: {
          peso_seco_kg: 116,
          deposito_litros: 16.1,
          altura_asiento_mm: 790,
          distancia_ejes_mm: 1315,
          distancia_suelo_mm: 196
        }
      }
    },
    {
      id: 'hon-02',
      slug: 'honda-vario-150',
      name: 'Vario 150 eSP',
      year_range: '2015–2018',
      type: 'SCOOTER',
      image: 'assets/images/motos/honda2.png',
      brand: 'honda',
      price: 2400,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, SOHC, 2v, eSP',
          cilindrada_cc: 149.3,
          diametro_carrera: '57.3 x 57.9 mm',
          relacion_compresion: '10.6:1',
          refrigeracion: 'Líquida',
          potencia_cv: 12.6,
          potencia_rpm: 8500,
          torque_nm: 12.8,
          torque_rpm: 5000,
          alimentacion: 'Inyección PGM-FI',
          transmision: 'Automática V-Matic CVT',
          velocidad_max_kmh: 110
        },
        chasis: {
          tipo: 'Tubo de acero Underbone',
          suspension_delantera: 'Horquilla telescópica',
          suspension_trasera: 'Basculante monoamortiguador lateral'
        },
        frenos: {
          delantero: 'Monodisco, CBS',
          trasero: 'Tambor, CBS'
        },
        neumaticos: {
          delantero: '80/90-14 M/C 40P',
          trasero: '90/90-14 M/C 46P'
        },
        dimensiones: {
          peso_seco_kg: 109,
          deposito_litros: 5.5,
          altura_asiento_mm: 769,
          distancia_ejes_mm: 1280,
          distancia_suelo_mm: 135,
          maletero_litros: 18
        }
      }
    },
    {
      id: 'hon-03',
      slug: 'honda-vario-110',
      name: 'Vario 110 FI',
      year_range: '2018–presente',
      type: 'SCOOTER',
      image: 'assets/images/motos/honda3.png',
      brand: 'honda',
      price: 1800,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, SOHC, eSP, refrigerado por aire',
          cilindrada_cc: 108.2,
          diametro_carrera: '50 x 55.1 mm',
          relacion_compresion: '9.5:1',
          refrigeracion: 'Aire',
          potencia_cv: 8.7,
          potencia_rpm: 7500,
          torque_nm: 9.1,
          torque_rpm: 6000,
          alimentacion: 'Inyección PGM-FI',
          transmision: 'Automática CVT V-Matic'
        },
        chasis: {
          tipo: 'Tubular acero Backbone',
          suspension_delantera: 'Horquilla telescópica',
          suspension_trasera: 'Monoshock brazo oscilante'
        },
        frenos: {
          delantero: 'Disco hidráulico pistón único',
          trasero: 'Tambor, CBS'
        },
        neumaticos: {
          delantero: '80/90-14 M/C 40P',
          trasero: '90/90-14 M/C 46P'
        },
        dimensiones: {
          peso_seco_kg: 96,
          deposito_litros: 3.7,
          altura_asiento_mm: 734,
          distancia_ejes_mm: 1256,
          distancia_suelo_mm: 140
        }
      }
    },
    {
      id: 'hon-04',
      slug: 'honda-cbr1000rr-fireblade',
      name: 'CBR 1000RR Fireblade',
      year_range: '2012–2013',
      type: 'SPORT',
      image: 'assets/images/motos/honda4.png',
      brand: 'honda',
      price: 14500,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16v, líquida',
          cilindrada_cc: 999,
          diametro_carrera: '76 x 55.1 mm',
          relacion_compresion: '12.3:1',
          refrigeracion: 'Líquida',
          potencia_cv: 178,
          potencia_rpm: 12000,
          torque_nm: 112,
          torque_rpm: 8500,
          alimentacion: 'Inyección PGM-DSFI doble etapa',
          transmision: '6 velocidades, embrague antirrebote, cadena'
        },
        chasis: {
          tipo: 'Diamante aluminio doble viga',
          suspension_delantera: 'Showa BPF invertida 43mm, totalmente ajustable',
          suspension_trasera: 'Showa BFRC Pro-Link, totalmente ajustable'
        },
        frenos: {
          delantero: 'Doble disco flotante 320mm, pinzas Tokico radial 4p',
          trasero: 'Monodisco 220mm, pinza 1 pistón',
          asistencia: 'HESD + C-ABS opcional'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '190/50-ZR17 M/C 73W'
        },
        dimensiones: {
          peso_marcha_kg: 200,
          deposito_litros: 17.7,
          altura_asiento_mm: 820,
          distancia_ejes_mm: 1410,
          distancia_suelo_mm: 130
        }
      }
    },
    {
      id: 'hon-05',
      slug: 'honda-cb150r-streetfire',
      name: 'CB150R StreetFire',
      year_range: '2019–presente',
      type: 'NAKED',
      image: 'assets/images/motos/honda5.png',
      brand: 'honda',
      price: 3500,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, DOHC, 4v, líquida con ventilador',
          cilindrada_cc: 149.16,
          diametro_carrera: '57.3 x 57.8 mm',
          relacion_compresion: '11.3:1',
          refrigeracion: 'Líquida',
          potencia_cv: 16.9,
          potencia_rpm: 9000,
          torque_nm: 13.8,
          torque_rpm: 7000,
          alimentacion: 'Inyección PGM-FI',
          transmision: '6 velocidades, cadena'
        },
        chasis: {
          tipo: 'Trellis Diamond Frame tubular acero',
          suspension_delantera: 'Horquilla telescópica convencional',
          suspension_trasera: 'Monoshock Pro-Link'
        },
        frenos: {
          delantero: 'Disco, pinza 2 pistones',
          trasero: 'Disco, pinza 1 pistón'
        },
        neumaticos: {
          delantero: '100/80-17 M/C 52P',
          trasero: '130/70-17 M/C 62P'
        },
        dimensiones: {
          peso_marcha_kg: 136,
          deposito_litros: 12,
          altura_asiento_mm: 797,
          distancia_ejes_mm: 1293,
          distancia_suelo_mm: 169
        }
      }
    },

    // --- YAMAHA ---
    {
      id: 'yam-01',
      slug: 'yamaha-yzf-r1-2004',
      name: 'YZF-R1',
      year_range: '2004–2006',
      type: 'SPORT',
      image: 'assets/images/motos/yamaha1.png',
      brand: 'yamaha',
      price: 9800,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 20 válvulas (5 por cilindro), líquida',
          cilindrada_cc: 998,
          diametro_carrera: '77 x 53.6 mm',
          relacion_compresion: '12.4:1',
          refrigeracion: 'Líquida',
          potencia_cv: 172,
          potencia_con_ram_air_cv: 180,
          potencia_rpm: 12500,
          torque_nm: 106.6,
          torque_rpm: 10500,
          alimentacion: 'Inyección electrónica con mariposas secundarias',
          transmision: '6 velocidades, cadena'
        },
        chasis: {
          tipo: 'Deltabox V aluminio fundido a presión',
          suspension_delantera: 'KYB invertida 43mm, totalmente ajustable',
          suspension_trasera: 'Monoamortiguador bieletas, totalmente ajustable'
        },
        frenos: {
          delantero: 'Doble disco flotante 320mm, Sumitomo 4 pistones radial',
          trasero: 'Monodisco 220mm, 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C',
          trasero: '190/50-ZR17 M/C'
        },
        dimensiones: {
          peso_seco_kg: 172,
          peso_marcha_kg: 193,
          deposito_litros: 18,
          altura_asiento_mm: 835,
          distancia_ejes_mm: 1395,
          distancia_suelo_mm: 135
        }
      }
    },
    {
      id: 'yam-02',
      slug: 'yamaha-yzf-r6-60aniversario',
      name: 'YZF-R6 60° Aniversario',
      year_range: '2016',
      type: 'SPORT',
      image: 'assets/images/motos/yamaha2.png',
      brand: 'yamaha',
      price: 10900,
      specs: {
        motor: {
          tipo: '4 cilindros en línea inclinado, 4T, DOHC, 16v titanio, líquida',
          cilindrada_cc: 599,
          diametro_carrera: '67 x 42.5 mm',
          relacion_compresion: '13.1:1',
          refrigeracion: 'Líquida',
          potencia_cv: 123.7,
          potencia_rpm: 14500,
          torque_nm: 65.7,
          torque_rpm: 10500,
          alimentacion: 'Inyección doble inyector YCC-T + YCC-I',
          transmision: '6 velocidades, Slipper Clutch, cadena'
        },
        chasis: {
          tipo: 'Deltabox aluminio (subchasis magnesio)',
          suspension_delantera: 'KYB invertida 41mm, totalmente ajustable',
          suspension_trasera: 'KYB depósito gas separado, totalmente ajustable'
        },
        frenos: {
          delantero: 'Doble disco flotante 310mm, Advics 4p radial, bomba radial',
          trasero: 'Monodisco 220mm, 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '180/55-ZR17 M/C 73W'
        },
        dimensiones: {
          peso_marcha_kg: 189,
          deposito_litros: 17,
          altura_asiento_mm: 850,
          distancia_ejes_mm: 1375,
          distancia_suelo_mm: 130
        }
      }
    },
    {
      id: 'yam-03',
      slug: 'yamaha-mt10',
      name: 'MT-10',
      year_range: '2016–2021',
      type: 'NAKED',
      image: 'assets/images/motos/yamaha3.png',
      brand: 'yamaha',
      price: 13200,
      specs: {
        motor: {
          tipo: '4 cilindros Crossplane CP4, 4T, DOHC, 16v, líquida',
          cilindrada_cc: 998,
          diametro_carrera: '79 x 50.9 mm',
          relacion_compresion: '12.0:1',
          refrigeracion: 'Líquida',
          potencia_cv: 160.4,
          potencia_rpm: 11500,
          torque_nm: 111,
          torque_rpm: 9010,
          alimentacion: 'Inyección YCC-T electrónica',
          transmision: '6 velocidades, A&S clutch, cadena'
        },
        chasis: {
          tipo: 'Deltabox aluminio doble viga, derivado R1',
          suspension_delantera: 'KYB invertida 43mm, totalmente ajustable, 120mm',
          suspension_trasera: 'KYB central bieletas, totalmente ajustable'
        },
        frenos: {
          delantero: 'Doble disco flotante 320mm, Advics 4p radial, ABS',
          trasero: 'Monodisco 220mm, 1 pistón, ABS'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '190/55-ZR17 M/C 75W'
        },
        dimensiones: {
          peso_marcha_kg: 210,
          deposito_litros: 17,
          altura_asiento_mm: 825,
          distancia_ejes_mm: 1400,
          distancia_suelo_mm: 130
        },
        electronica: ['TCS 3 niveles', 'D-Mode 3 mapas', 'Control de crucero', 'QSS quickshifter']
      }
    },
    {
      id: 'yam-04',
      slug: 'yamaha-fz16',
      name: 'FZ16 / FZ-S',
      year_range: '2008–presente (V1.0)',
      type: 'NAKED',
      image: 'assets/images/motos/yamaha4.png',
      brand: 'yamaha',
      price: 2600,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, SOHC, 2 válvulas, aire',
          cilindrada_cc: 153,
          diametro_carrera: '58 x 57.9 mm',
          relacion_compresion: '9.5:1',
          refrigeracion: 'Aire',
          potencia_cv: 14,
          potencia_rpm: 7500,
          torque_nm: 13.6,
          torque_rpm: 6000,
          alimentacion: 'Carburador BS26',
          transmision: '5 velocidades, cadena'
        },
        chasis: {
          tipo: 'Diamante acero',
          suspension_delantera: 'Horquilla telescópica 41mm',
          suspension_trasera: 'Monoamortiguador Monocross ajustable precarga'
        },
        frenos: {
          delantero: 'Monodisco 267mm, ByBre/Nissin 2p',
          trasero: 'Tambor mecánico 130mm'
        },
        neumaticos: {
          delantero: '100/80-17 M/C 52P',
          trasero: '140/60-R17 M/C 63P radial'
        },
        dimensiones: {
          peso_seco_kg: 126,
          peso_marcha_kg: 135,
          deposito_litros: 12,
          altura_asiento_mm: 790,
          distancia_ejes_mm: 1334,
          distancia_suelo_mm: 160
        }
      }
    },

    // --- SUZUKI ---
    {
      id: 'suz-01',
      slug: 'suzuki-inazuma-250',
      name: 'Inazuma 250 / GW250',
      year_range: '2012–2017',
      type: 'NAKED',
      image: 'assets/images/motos/suzuki1.png',
      brand: 'suzuki',
      price: 3800,
      specs: {
        motor: {
          tipo: 'Bicilíndrico paralelo, 4T, SOHC, 4v (2 por cilindro), líquida',
          cilindrada_cc: 248,
          diametro_carrera: '53.5 x 55.2 mm',
          relacion_compresion: '11.5:1',
          refrigeracion: 'Líquida',
          potencia_cv: 24,
          potencia_rpm: 8500,
          torque_nm: 22,
          torque_rpm: 6500,
          alimentacion: 'Inyección electrónica',
          transmision: '6 velocidades, cadena',
          velocidad_max_kmh: 140
        },
        chasis: {
          tipo: 'Cuna semidoble tubo acero',
          suspension_delantera: 'Horquilla telescópica Kayaba 37mm, 115mm',
          suspension_trasera: 'Monoamortiguador central ajustable 7 pos, 125mm'
        },
        frenos: {
          delantero: 'Monodisco 290mm, Nissin 2p',
          trasero: 'Monodisco 240mm, 1 pistón'
        },
        neumaticos: {
          delantero: '110/80-17 M/C 57H',
          trasero: '140/70-17 M/C 66H'
        },
        dimensiones: {
          peso_marcha_kg: 183,
          deposito_litros: 13.3,
          altura_asiento_mm: 780,
          distancia_ejes_mm: 1430,
          distancia_suelo_mm: 165
        }
      }
    },
    {
      id: 'suz-02',
      slug: 'suzuki-gsx-r150',
      name: 'GSX-R150',
      year_range: '2017–presente',
      type: 'SPORT',
      image: 'assets/images/motos/suzuki2.png',
      brand: 'suzuki',
      price: 3900,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, DOHC, 4 válvulas, líquida',
          cilindrada_cc: 147.3,
          diametro_carrera: '62.0 x 48.8 mm',
          relacion_compresion: '11.5:1',
          refrigeracion: 'Líquida',
          potencia_cv: 19,
          potencia_rpm: 10500,
          torque_nm: 14,
          torque_rpm: 9000,
          alimentacion: 'Inyección electrónica',
          transmision: '6 velocidades, cadena',
          velocidad_max_kmh: 145
        },
        chasis: {
          tipo: 'Diamante tubo acero geometría compacta',
          suspension_delantera: 'Horquilla telescópica, 110mm',
          suspension_trasera: 'Monoamortiguador Link type, 115mm'
        },
        frenos: {
          delantero: 'Monodisco lobulado 290mm, 2 pistones, ABS',
          trasero: 'Monodisco 187mm, 1 pistón'
        },
        neumaticos: {
          delantero: '90/80-17 M/C 46S',
          trasero: '130/70-17 M/C 62S'
        },
        dimensiones: {
          peso_marcha_kg: 131,
          deposito_litros: 11,
          altura_asiento_mm: 785,
          distancia_ejes_mm: 1300,
          distancia_suelo_mm: 160
        }
      }
    },
    {
      id: 'suz-03',
      slug: 'suzuki-gsx-s1000',
      name: 'GSX-S1000 ABS',
      year_range: '2015–2020',
      type: 'NAKED',
      image: 'assets/images/motos/suzuki3.png',
      brand: 'suzuki',
      price: 11900,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16v (heredado GSX-R1000 K5)',
          cilindrada_cc: 999,
          diametro_carrera: '73.4 x 59.0 mm',
          relacion_compresion: '12.2:1',
          refrigeracion: 'Líquida',
          potencia_cv: 150,
          potencia_rpm: 10000,
          torque_nm: 108,
          torque_rpm: 9500,
          alimentacion: 'Inyección SDTV doble mariposa',
          transmision: '6 velocidades, cadena (antirrebote desde 2018)',
          velocidad_max_kmh: 255
        },
        chasis: {
          tipo: 'Doble viga aluminio',
          suspension_delantera: 'KYB invertida 43mm, totalmente ajustable, 120mm',
          suspension_trasera: 'Monoamortiguador progresivo ajustable, 130mm'
        },
        frenos: {
          delantero: 'Doble disco flotante 310mm, Brembo monobloque 4p radial, ABS Bosch',
          trasero: 'Monodisco 250mm, Nissin 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '190/50-ZR17 M/C 73W'
        },
        dimensiones: {
          peso_marcha_kg: 209,
          deposito_litros: 17,
          altura_asiento_mm: 810,
          distancia_ejes_mm: 1460,
          distancia_suelo_mm: 140
        }
      }
    },
    {
      id: 'suz-04',
      slug: 'suzuki-gsx-r1000',
      name: 'GSX-R1000 ABS / R',
      year_range: '2017–2022',
      type: 'SPORT',
      image: 'assets/images/motos/suzuki4.png',
      brand: 'suzuki',
      price: 16500,
      specs: {
        motor: {
          tipo: '4 cilindros en línea, 4T, DOHC, 16v, SR-VVT distribución variable',
          cilindrada_cc: 999.8,
          diametro_carrera: '76.0 x 55.1 mm',
          relacion_compresion: '13.2:1',
          refrigeracion: 'Líquida',
          potencia_cv: 202,
          potencia_rpm: 13200,
          torque_nm: 117.6,
          torque_rpm: 10800,
          alimentacion: 'Inyección doble inyector S-SFI',
          transmision: '6 velocidades, antirrebote, QSS bidireccional (versión R)',
          velocidad_max_kmh: 299
        },
        chasis: {
          tipo: 'Doble viga aluminio perimetral compacto',
          suspension_delantera: 'Showa BPF invertida 43mm, totalmente ajustable, 120mm',
          suspension_trasera: 'Showa progresivo totalmente ajustable, 130mm'
        },
        frenos: {
          delantero: 'Doble disco Brembo T-drive 320mm, Brembo monobloque 4p radial, ABS Motion Track',
          trasero: 'Monodisco 220mm, Nissin 1 pistón'
        },
        neumaticos: {
          delantero: '120/70-ZR17 M/C 58W',
          trasero: '190/55-ZR17 M/C 75W'
        },
        dimensiones: {
          peso_marcha_kg: 202,
          deposito_litros: 16,
          altura_asiento_mm: 825,
          distancia_ejes_mm: 1420,
          distancia_suelo_mm: 130
        }
      }
    },
    {
      id: 'suz-05',
      slug: 'suzuki-gixxer-150',
      name: 'Gixxer 150 Naked',
      year_range: '2015–2019',
      type: 'NAKED',
      image: 'assets/images/motos/suzuki5.png',
      brand: 'suzuki',
      price: 2800,
      specs: {
        motor: {
          tipo: 'Monocilíndrico, 4T, SOHC, 2 válvulas, aire, SEP',
          cilindrada_cc: 154.9,
          diametro_carrera: '56.0 x 62.9 mm',
          relacion_compresion: '9.8:1',
          refrigeracion: 'Aire',
          potencia_cv: 14,
          potencia_rpm: 8000,
          torque_nm: 14,
          torque_rpm: 6000,
          alimentacion: 'Carburador (FI en versiones posteriores)',
          transmision: '5 velocidades, cadena',
          velocidad_max_kmh: 120
        },
        chasis: {
          tipo: 'Cuna central acero',
          suspension_delantera: 'Horquilla telescópica 41mm, 120mm',
          suspension_trasera: 'Monoamortiguador central, 7 posiciones, 110mm'
        },
        frenos: {
          delantero: 'Monodisco 266mm, ByBre (Brembo) 2p',
          trasero: 'Tambor mecánico 130mm (disc 220mm en variantes equipadas)'
        },
        neumaticos: {
          delantero: '100/80-17 M/C 52P',
          trasero: '140/60-17 M/C 63P'
        },
        dimensiones: {
          peso_marcha_kg: 135,
          deposito_litros: 12,
          altura_asiento_mm: 780,
          distancia_ejes_mm: 1330,
          distancia_suelo_mm: 160
        }
      }
    }
  ];

  constructor() { }

  /**
   * Returns all motorcycles in the catalog.
   */
  getAll(): Observable<Motorcycle[]> {
    return of(this.motorcycles);
  }

  /**
   * Filters motorcycles by brand.
   */
  getByBrand(brand: string): Observable<Motorcycle[]> {
    const filtered = this.motorcycles.filter(
      m => m.brand.toLowerCase() === brand.toLowerCase()
    );
    return of(filtered);
  }

  /**
   * Filters motorcycles by slug.
   */
  getBySlug(slug: string): Observable<Motorcycle | undefined> {
    const found = this.motorcycles.find(m => m.slug === slug);
    return of(found);
  }

  /**
   * Filters motorcycles by type/category.
   */
  getByType(type: string): Observable<Motorcycle[]> {
    const filtered = this.motorcycles.filter(
      m => m.type.toUpperCase() === type.toUpperCase()
    );
    return of(filtered);
  }

  /**
   * Returns all available brands.
   */
  getBrands(): Brand[] {
    return this.brands;
  }

  /**
   * Returns a specific brand details by its slug.
   */
  getBrandBySlug(slug: string): Brand | undefined {
    return this.brands.find(b => b.slug === slug);
  }

  /**
   * Navigation helper: returns the previous and next motorcycles relative to currentId.
   */
  getAdjacentModels(currentId: string): { prev: Motorcycle | null, next: Motorcycle | null } {
    const index = this.motorcycles.findIndex(m => m.id === currentId);
    if (index === -1) {
      return { prev: null, next: null };
    }

    const prev = index > 0 ? this.motorcycles[index - 1] : this.motorcycles[this.motorcycles.length - 1];
    const next = index < this.motorcycles.length - 1 ? this.motorcycles[index + 1] : this.motorcycles[0];

    return { prev, next };
  }
}
