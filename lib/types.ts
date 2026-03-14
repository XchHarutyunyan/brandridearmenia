// Shared category type for both Spaces (listings) and Requests
export type ListingCategory =
  | "cars"
  | "buildings"
  | "shop_windows"
  | "walls"
  | "trucks"
  | "couriers"
  | "balconies"
  | "other";

export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  city: string;
  price: number;
  description: string | null;
  image_url: string | null;
  photo_urls?: string[] | null;
  contact_email: string | null;
  contact_phone: string | null;
  user_id: string;
  created_at: string;
}

export interface AdvertisingRequest {
  id: string;
  title: string;
  description: string | null;
  city: string;
  category: ListingCategory;
  budget: number;
  duration: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  user_id?: string | null;
  created_at: string;
}

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  cars: "Cars",
  buildings: "Buildings",
  shop_windows: "Shop Windows",
  walls: "Walls",
  trucks: "Trucks",
  couriers: "Couriers",
  balconies: "Balconies",
  other: "Other",
};

export const CATEGORIES: ListingCategory[] = [
  "cars",
  "buildings",
  "shop_windows",
  "walls",
  "trucks",
  "couriers",
  "balconies",
  "other",
];
