import { render, fireEvent, act } from "@testing-library/react";

import { EditMovieDetails } from "./edit-movie-details";
import { MovieData } from "../movie-list-page/movie-list-page";
import { request } from "../../requests";


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));

describe(EditMovieDetails, () => {
    const id: string = '1234'
    const movie: MovieData = {
        id: id,
        name: `Oppenheimer`,
        imageUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/c5292109-642c-4ab0-894a-cc304e1bcec4/600x900',
        releaseYear: '2023',
        duration: '3h 10min',
        relevantGenres: ['DOCUMENTARY', 'HORROR'],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean turpis turpis, mollis ut cursus ac, ultricies sed odio. Duis eleifend elit quam, sed gravida odio pharetra in. Quisque quam est, condimentum nec turpis id, auctor vulputate dui. Vivamus tempus, arcu ultrices tempor congue, odio orci semper nulla, placerat facilisis odio urna id tellus.`,
        rating: '8.8',
    }

    const utils = require('../../utils');
    jest
        .spyOn(utils, 'getEmptyMovieData')
        .mockImplementation((): MovieData => {
            return movie;
        });

    const addMovieMock = jest
        .spyOn(request, 'addMovie')
        .mockImplementation(async (movie: MovieData): Promise<MovieData | null> => {
            return null;
        });

    const findMovieMock = jest
        .spyOn(request, 'findMovieById')
        .mockImplementation(async (movieId: string): Promise<MovieData | null> => {
            return null;
        });

    it("should pass correct movie data in 'action' callback arguments after a click SUBMIT button", async () => {
        const { getByText } = await act(() => render(<EditMovieDetails />));

        await act(() => fireEvent.submit(getByText('SUBMIT')));

        expect(findMovieMock).toHaveBeenCalledTimes(0);
        expect(addMovieMock).toHaveBeenCalledTimes(1);
        expect(addMovieMock).toHaveBeenCalledWith(movie);
    });
})