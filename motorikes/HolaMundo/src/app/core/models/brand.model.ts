export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoText: string;
  colorAccent: string; // Tailwind class or hex color code
  bgAccent?: string;   // Tailwind bg class
}
