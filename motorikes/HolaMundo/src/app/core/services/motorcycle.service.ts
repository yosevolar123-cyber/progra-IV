import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Motorcycle } from '../models/motorcycle.model';
import { Brand } from '../models/brand.model';
import { supabase } from '../config/supabase.config';
import { FALLBACK_MOTORCYCLES } from '../data/fallback-motorcycles';

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

  // In-memory cache for motorcycles
  private motorcycles: Motorcycle[] = [];

  // Flag to track whether Supabase is available
  private supabaseAvailable = true;

  constructor() { }

  /**
   * Returns all active/visible motorcycles in the catalog.
   * Falls back to local data when Supabase is unavailable.
   */
  getAll(forceRefresh = false): Observable<Motorcycle[]> {
    if (this.motorcycles.length > 0 && !forceRefresh) {
      return of(this.motorcycles);
    }

    // If we already know Supabase is down, use fallback immediately
    if (!this.supabaseAvailable) {
      this.motorcycles = [...FALLBACK_MOTORCYCLES];
      return of(this.motorcycles);
    }

    return from(
      supabase
        .from('motorcycles')
        .select('*')
        .eq('visible', true)
        .gt('stock', 0)
        .order('name', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error || !data || data.length === 0) {
          console.warn('Supabase unavailable or empty, using local fallback data.', error?.message);
          this.supabaseAvailable = false;
          this.motorcycles = [...FALLBACK_MOTORCYCLES];
          return this.motorcycles;
        }
        this.supabaseAvailable = true;
        this.motorcycles = data as Motorcycle[];
        return this.motorcycles;
      })
    );
  }

  /**
   * Returns all motorcycles for administrators (includes out-of-stock and invisible).
   */
  getAllAdmin(): Observable<Motorcycle[]> {
    return from(
      supabase
        .from('motorcycles')
        .select('*')
        .order('created_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error fetching admin motorcycles:', error);
          return [...FALLBACK_MOTORCYCLES];
        }
        return (data && data.length > 0) ? (data as Motorcycle[]) : [...FALLBACK_MOTORCYCLES];
      })
    );
  }

  /**
   * Filters motorcycles by brand.
   */
  getByBrand(brand: string): Observable<Motorcycle[]> {
    if (!this.supabaseAvailable) {
      return of(FALLBACK_MOTORCYCLES.filter(m => m.brand === brand.toLowerCase()));
    }
    return from(
      supabase
        .from('motorcycles')
        .select('*')
        .eq('visible', true)
        .gt('stock', 0)
        .eq('brand', brand.toLowerCase())
    ).pipe(
      map(({ data, error }) => {
        if (error || !data || data.length === 0) {
          return FALLBACK_MOTORCYCLES.filter(m => m.brand === brand.toLowerCase());
        }
        return data as Motorcycle[];
      })
    );
  }

  /**
   * Filters motorcycles by slug.
   */
  getBySlug(slug: string): Observable<Motorcycle | undefined> {
    if (!this.supabaseAvailable) {
      return of(FALLBACK_MOTORCYCLES.find(m => m.slug === slug));
    }
    return from(
      supabase
        .from('motorcycles')
        .select('*')
        .eq('slug', slug)
    ).pipe(
      map(({ data, error }) => {
        if (error || !data || data.length === 0) {
          return FALLBACK_MOTORCYCLES.find(m => m.slug === slug);
        }
        return data[0] as Motorcycle;
      })
    );
  }

  /**
   * Filters motorcycles by type/category.
   */
  getByType(type: string): Observable<Motorcycle[]> {
    if (!this.supabaseAvailable) {
      return of(FALLBACK_MOTORCYCLES.filter(m => m.type === type.toUpperCase()));
    }
    return from(
      supabase
        .from('motorcycles')
        .select('*')
        .eq('visible', true)
        .gt('stock', 0)
        .eq('type', type.toUpperCase())
    ).pipe(
      map(({ data, error }) => {
        if (error || !data || data.length === 0) {
          return FALLBACK_MOTORCYCLES.filter(m => m.type === type.toUpperCase());
        }
        return data as Motorcycle[];
      })
    );
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

  // =========================================================
  // ADMIN CRUD OPERATIONS
  // =========================================================

  /**
   * Uploads an image to Supabase Storage and returns the public URL.
   */
  async uploadProductImage(file: File, filename: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const cleanFilename = `${filename.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('productos-imagenes')
      .upload(cleanFilename, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('productos-imagenes')
      .getPublicUrl(cleanFilename);

    return publicUrl;
  }

  /**
   * Inserts a new motorcycle product.
   */
  async create(bike: Omit<Motorcycle, 'id' | 'slug'>): Promise<{ success: boolean; error?: string }> {
    const id = 'bike-' + Math.random().toString(36).substr(2, 9);
    const slug = `${bike.brand.toLowerCase()}-${bike.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    const { error } = await supabase
      .from('motorcycles')
      .insert({
        id,
        slug,
        ...bike
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Invalidate cache
    this.motorcycles = [];
    return { success: true };
  }

  /**
   * Updates an existing motorcycle product.
   */
  async update(id: string, updates: Partial<Motorcycle>): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('motorcycles')
      .update(updates)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Invalidate cache
    this.motorcycles = [];
    return { success: true };
  }

  /**
   * Performs a soft delete by marking stock=0 and visible=false.
   */
  async delete(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('motorcycles')
      .update({ visible: false, stock: 0 })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Invalidate cache
    this.motorcycles = [];
    return { success: true };
  }
}
