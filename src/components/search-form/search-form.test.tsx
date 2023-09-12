import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


import { SearchForm } from "./search-form";


describe(SearchForm, () => {

    it("should display correct initial value", () => {
        const searchText = "searchText"

        const { getByLabelText } = render(
            <SearchForm
                searchText={searchText}
                search={() => { }}
            />
        );
        expect(getByLabelText("searchFormInput").getAttribute('value')).toEqual(searchText)
    });

    it("should call onClick with proper value after typing into input and clicking submit button", () => {
        let expectedResult = '';

        const { getByLabelText, getByRole } = render(
            <SearchForm
                searchText={''}
                search={(newValue: string) => expectedResult = newValue}
            />
        );

        const newSearchValue = "new search value";

        const searchInput = getByLabelText("searchFormInput");
        fireEvent.change(searchInput, { target: { value: newSearchValue } });

        const submitButton = getByRole("button", { name: "SEARCH" });
        fireEvent.click(submitButton);

        expect(expectedResult).toEqual(newSearchValue)
    });

    it("should call onClick with proper value after typing into input and pressing enter key", async () => {
        let expectedResult = '';

        const { getByLabelText } = render(
            <SearchForm
                searchText={''}
                search={(newValue: string) => expectedResult = newValue}
            />
        );

        const newSearchValue = "new search value";

        const searchInput = getByLabelText("searchFormInput");
        await act(async () => {
            await userEvent.type(searchInput, `${newSearchValue}[Enter]`)
        })

        expect(expectedResult).toEqual(newSearchValue)
    });
})