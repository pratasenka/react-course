import { render, fireEvent } from "@testing-library/react";

import { MoviesSorting } from "./movies-sorting";


describe(MoviesSorting, () => {
    const options: string[] = ['1', '2', '3', '4'];

    it("should pass correct option value in 'onClick' callback arguments after a selection value on movies sorting component", () => {
        let selectedOption = '';
        const { getByTestId } = render(
            <MoviesSorting 
                options={options}
                onClick={(option: string) => {
                    selectedOption = option
                }}
            />
        );

        const option = getByTestId('MoviesSortingSelectDropdown');
        fireEvent.change(option, {target: { value: options[1] },}
        );

        expect(selectedOption).toEqual(options[1]);
    });
})