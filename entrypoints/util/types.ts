export interface ProductDetails {
  name: string;
  price?: number;
  point?: number;
  imagePath?: string;
  addedDate?: Date;
  usedDate?: Date;
}

export interface Product extends ProductDetails {
  url: string;
}

export interface ProductWithNum extends Product {
  num: number;
}

export interface SelectedItem {
  url: string;
  num: number;
}

export type Selected = SelectedItem[];
