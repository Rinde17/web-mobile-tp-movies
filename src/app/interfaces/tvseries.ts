export interface ITvSerie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  origin_country: string[];
  original_language: string;
  name: string;
  original_name: string;
  number_of_seasons: number;
  created_by: [{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string|null;
  }]
  genres: [{
    id: number;
    name: string;
  }]
  networks: [{
    name: string;
    id: number;
    logo_path: string;
    origin_country: string;
  }]
}
