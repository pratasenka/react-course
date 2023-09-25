import { nanoid } from "nanoid";
import { render, fireEvent } from "@testing-library/react";

import { EditMovieDetails } from "./edit-movie-details";
import { MovieData } from "../../App";



describe(EditMovieDetails, () => {
    const movie = {
        id: nanoid(),
        name: `Oppenheimer`,
        imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
        releaseYear: 2023,
        duration: '3h 10min',
        relevantGenres: ['DOCUMENTARY', 'HORROR'],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
        rating: '8.8',
    };

    it("should pass correct movie data in 'action' callback arguments after a click SUBMIT button", () => {
        let clickResult = null;
        const { getByText } = render(
            <EditMovieDetails
                movie={movie}
                action={(movieInfo: MovieData) => clickResult = movieInfo}
            />
        );

        const movieTitle = getByText('SUBMIT');
        fireEvent.click(movieTitle);

        expect(clickResult).toStrictEqual(movie);
    });
})