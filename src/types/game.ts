export interface ICasinoGame {
  enabled: boolean;
  name: string;
  slug: string;
  vendor: string;
  description: string;
  thumbnail: string;
  thumbnailBlur: string;
  borderColor: string;
  categories: string[];
  theoreticalPayOut: number;
  restrictedTerritories: string[];
  hasFunMode: boolean;
  featured: boolean;
  favorite: boolean;
}
