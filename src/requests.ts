import { MovieData } from "./components/movie-list-page/movie-list-page";
import {
    constructUrl,
    transformDtoToMovieData,
    transformMovieDataToDto,
} from "./utils";

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

class Request {
    private readonly HOST = "http://localhost:4000";

    constructor() {}

    public async get(url: string, signal: AbortSignal): Promise<any> {
        const response = await fetch(url, { signal });
        return response.json();
    }

    public async put(url: string, payload: any): Promise<any> {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        };

        const response = await fetch(url, requestOptions);
        return response.json();
    }

    public async post(url: string, payload: any): Promise<any> {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        };

        const response = await fetch(url, requestOptions);
        return response.json();
    }
}

export const request = new Request();
