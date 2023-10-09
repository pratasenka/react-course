import { MovieData } from "./components/movie-list-page/movie-list-page";
import { constructUrl } from "./utils";

export interface FindMoviesParams {
    query: string;
    filter: string;
    sortBy: string;
    sortOrder: string;
    searchBy: string;
}

class Request {
    private readonly HOST = "http://localhost:4000";

    constructor() {}

    async findMovieById(
        movieId: string,
        signal: AbortSignal
    ): Promise<MovieData | null> {
        try {
            const parsedData = await this.request(
                `${this.HOST}/movies/${movieId}`,
                signal
            );

            return {
                id: parsedData.id,
                name: parsedData.title,
                imageUrl: parsedData.poster_path,
                releaseYear: parsedData.release_date,
                duration: parsedData.runtime,
                relevantGenres: parsedData.genres,
                description: parsedData.overview,
                rating: parsedData.vote_average,
            };
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
            const parsedData = await this.request(
                constructUrl(`${this.HOST}/movies`, searchParams),
                signal
            );

            return parsedData.data.map((movie: any): MovieData => {
                return {
                    id: movie.id,
                    name: movie.title,
                    imageUrl: movie.poster_path,
                    releaseYear: movie.release_date,
                    duration: movie.runtime,
                    relevantGenres: movie.genres,
                    description: movie.overview,
                    rating: movie.vote_average,
                };
            });
        } catch (error: any) {
            if (error.name === "AbortError") {
                console.log("Request Aborted!");
            }
            return null;
        }
    }

    private async request(url: string, signal: AbortSignal): Promise<any> {
        const response = await fetch(url, { signal });
        return response.json();
    }
}

export const request = new Request();
