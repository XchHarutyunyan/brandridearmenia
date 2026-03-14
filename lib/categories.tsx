"use client";

import {
  Car,
  Building2,
  Store,
  Layout,
  Truck,
  Bike,
  Home,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ListingCategory } from "@/lib/types";

export const CATEGORY_ICONS: Record<ListingCategory, LucideIcon> = {
  cars: Car,
  buildings: Building2,
  shop_windows: Store,
  walls: Layout,
  trucks: Truck,
  couriers: Bike,
  balconies: Home,
  other: Sparkles,
};
