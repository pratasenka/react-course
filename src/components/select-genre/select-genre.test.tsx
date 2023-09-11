import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import { SelectGenre } from "./select-genre";


describe(SelectGenre, () => {
    it("should render all genres passed in props", () => {
        let genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

        const { getByText } = render(
            <SelectGenre
                genres={genres}
                activeGenres={[]}
            />
        );

        genres.forEach((genre: string) => {
            expect(getByText(genre).textContent).toEqual(genre);
        });
    });

    it("should should highlight a selected genre passed in props", () => {
        const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
        const activeGenres = ['ALL'];

        const { getByText } = render(
            <SelectGenre
                genres={genres}
                activeGenres={activeGenres}
            />
        );

        genres.forEach((genre: string) => {
            expect(getByText(genre).className).toEqual(activeGenres.includes(genre) ? "active" : "");
        });
    });

    it("should pass correct genre in 'onChange' callback arguments after a click event on genre button", () => {
        const genres = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];
        let activeGenres = ['ALL'];

        const setActiveGenres = (newActiveGenres: string[]) => {
            activeGenres = newActiveGenres;
        }

        const { getByText } = render(
            <SelectGenre
                genres={genres}
                activeGenres={activeGenres}
                setActiveGenres={setActiveGenres}
            />
        );

        genres.forEach((genre: string) => {
            expect(getByText(genre).className).toEqual(activeGenres.includes(genre) ? "active" : "");
        });

        const newActiveGenre = genres[genres.length - 1];

        const lastGenre = getByText(newActiveGenre);
        fireEvent.click(lastGenre);

        expect(activeGenres).toEqual([newActiveGenre])
    });
})