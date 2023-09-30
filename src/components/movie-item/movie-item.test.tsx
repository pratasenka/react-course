import { render, fireEvent } from "@testing-library/react";
import { nanoid } from 'nanoid';


import { MovieItem } from "./movie-item";
import { MovieData } from "../movie-list-page/movie-list-page";

jest.mock("nanoid", () => {
    return { nanoid: () => "1234" };
});


describe(MovieItem, () => {
    const movie = {
        name: `Oppenheimer`,
        imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
        releaseYear: '2023',
        duration: '3h 10min',
        relevantGenres: ['DOCUMENTARY', 'HORROR'],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
        rating: '8.8',
    };

    it("should pass correct movie data in 'onClick' callback arguments after a click movie detail title on movie detail component", () => {
        let clickResult = null;
        const { getByText } = render(
            <MovieItem
                movie={movie}
                setMovieDetails={(movieInfo: MovieData) => clickResult = movieInfo}
            />
        );

        const movieTitle = getByText(movie.name);
        fireEvent.click(movieTitle);

        expect(JSON.stringify(clickResult)).toEqual(JSON.stringify(movie));
    });
})

