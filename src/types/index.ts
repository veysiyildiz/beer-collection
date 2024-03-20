export type Status = "loading" | "success" | "failed";

export type Beer = {
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
};

export type BeerData = {
  total: number;
  beers: Beer[];
};

export type Comment = {
  id?: string;
  beerId: string;
  text: string;
};

export type Rating = {
  id?: string;
  beerId: string;
  rating: string;
};

export type SearchParams = {
  searchTerm?: string;
  sortOption?: string;
  _order?: string;
  page?: string;
  limit?: string;
};
