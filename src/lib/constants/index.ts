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

export const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/`
  : "http://localhost:3000/";

export const DEFAULT_PAGE_SIZE = "6";

export const DEFAULT_PAGE = "1";
