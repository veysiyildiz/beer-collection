export type Status = "loading" | "success" | "failed";

export interface Beer {
  id: string;
  abv: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  averageRating?: number;
}

export interface BeerData {
  total: number;
  beers: Beer[];
}

export interface Comment {
  id?: string;
  beerId: string;
  text: string;
}

export interface Rating {
  id?: string;
  beerId: string;
  rating: string;
}
