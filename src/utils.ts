import { MovieData } from "./components/movie-list-page/movie-list-page";
import { MovieDataDTO } from "./requests";

export const constructUrl = (url: string, params: any): string => {
    return decodeURIComponent(
        url.concat(
            "?",
            Object.keys(params)
                .map((key: string) => `${key}=${params[key]}`)
                .join("&")
        )
    );
};

export const filterSearchParams = (searchOptions: any): any => {
    const searchParams: any = {};

    Object.keys(searchOptions).map((key) => {
        if (searchOptions[key]) searchParams[key] = searchOptions[key];
    });

    return searchParams;
};

export const transformMovieDataToDto = (movie: MovieData): MovieDataDTO => {
    return {
        id: movie.id,
        title: movie.name,
        poster_path: movie.imageUrl,
        release_date: movie.releaseYear,
        runtime: Number(movie.duration),
        genres: movie.relevantGenres.length ? movie.relevantGenres : ["All"],
        overview: movie.description,
        vote_average: Number(movie.rating),
    };
};

export const transformDtoToMovieData = (movie: MovieDataDTO): MovieData => {
    return {
        id: movie.id,
        name: movie.title,
        imageUrl: movie.poster_path,
        releaseYear: movie.release_date,
        duration: String(movie.runtime),
        relevantGenres: movie.genres,
        description: movie.overview,
        rating: String(movie.vote_average),
    };
};

export const getEmptyMovieData = (): MovieData => {
    return {
        id: "",
        name: "",
        imageUrl: "",
        releaseYear: "",
        duration: "",
        relevantGenres: [],
        description: "",
        rating: "",
    };
};
