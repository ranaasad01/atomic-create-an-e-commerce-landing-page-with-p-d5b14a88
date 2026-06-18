export const APP_NAME = "Luminary Shop";
export const APP_TAGLINE = "Curated products for modern living.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "Newsletter", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
}

export type CartItem = Product & { quantity: number };