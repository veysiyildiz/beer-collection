import { Beer, Plus } from "lucide-react";

export const menuLinks = [
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

export const sortOptions = [
  { value: "", text: "Sort" },
  { value: "abv", text: "Alcohol By Volume" },
  { value: "first_brewed", text: "First Brewed" },
];

export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";

export const DEFAULT_PAGE_SIZE = "6";

export const DEFAULT_PAGE = "1";

export const DEFAULT_SORT_ORDER = "asc";
