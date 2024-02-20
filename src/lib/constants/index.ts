import { Beer, Plus } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Beer,
    route: "/",
    label: "Home",
  },
  {
    icon: Plus,
    route: "/add-beer",
    label: "Add Beer",
  },
];

export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const DEFAULT_PAGE_SIZE = 6;

export const DEFAULT_PAGE = 1;

export const sortOptions = [
  { value: "", text: "Sort" },
  { value: "abv", text: "Alcohol By Volume Asc" },
  { value: "abv&_order=desc", text: "Alcohol By Volume Desc" },
  { value: "first_brewed", text: "First Brewed Asc" },
  { value: "first_brewed&_order=desc", text: "First Brewed Desc" },
];
