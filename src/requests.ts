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

    async updateMovieById(movie: MovieData): Promise<MovieData | null> {
        try {
            const putResult: any = await this.put(
                `${this.HOST}/movies`,
                transformMovieDataToDto(movie)
            );

            return transformDtoToMovieData(putResult);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async addMovie(movie: MovieData): Promise<MovieData | null> {
        try {
            const { id: string, ...addMovieData } =
                transformMovieDataToDto(movie);
            const postResult: any = await this.post(
                `${this.HOST}/movies`,
                addMovieData
            );

            console.log(postResult);

            return transformDtoToMovieData(postResult);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findMovieById(
        movieId: string,
        signal: AbortSignal
    ): Promise<MovieData | null> {
        try {
            const parsedData = await this.get(
                `${this.HOST}/movies/${movieId}`,
                signal
            );

            return transformDtoToMovieData(parsedData);
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request Aborted!");
            }
            return null;
        }
    }

    async findMoviesByQuery(
        searchParams: FindMoviesParams,
        signal: AbortSignal
    ): Promise<MovieData[] | null> {
        try {
            const parsedData = await this.get(
                constructUrl(`${this.HOST}/movies`, searchParams),
                signal
            );

            return parsedData.data.map((movie: any): MovieData => {
                return transformDtoToMovieData(movie);
            });
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request Aborted!");
            }
            return null;
        }
    }

    private async get(url: string, signal: AbortSignal): Promise<any> {
        const response = await fetch(url, { signal });
        return response.json();
    }

    private async put(url: string, payload: any): Promise<any> {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        };

        const response = await fetch(url, requestOptions);
        return response.json();
    }

    private async post(url: string, payload: any): Promise<any> {
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
