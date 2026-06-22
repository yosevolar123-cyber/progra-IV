export interface SpecItem {
  label: string;
  value: string | number | undefined;
}

export interface SpecSection {
  title: string;
  icon: string;
  specs: SpecItem[];
}
