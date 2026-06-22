import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandSlug',
  standalone: true
})
export class BrandSlugPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
