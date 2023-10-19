import { MovieData } from "./components/movie-list-page/movie-list-page";
import { request } from "./requests";
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

class APIRequest {
    private readonly HOST = "http://localhost:4000";

    constructor() {}

    async updateMovieById(movie: MovieData): Promise<MovieData | null> {
        try {
            const putResult: any = await request.put(
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
            const postResult: any = await request.post(
                `${this.HOST}/movies`,
                addMovieData
            );

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
            const parsedData = await request.get(
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
            const parsedData = await request.get(
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
}

export const apiRequest = new APIRequest();
