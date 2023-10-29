export interface FindMoviesParams {
    search: string;
    filter: string;
    sortBy: string;
    sortOrder: string;
    searchBy: string;
}

export interface MovieDataDTO {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    genres: string[];
    overview: string;
    vote_average: number;
}

export interface MovieData {
    id: string;
    name: string;
    imageUrl: string;
    releaseYear: string;
    duration: string;
    relevantGenres: string[];
    description: string;
    rating: string;
}
