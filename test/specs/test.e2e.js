const { expect, browser, $ } = require('@wdio/globals');
import { Key } from 'webdriverio';
const chai = require('chai');

describe('App', async () => {
    beforeEach(async () => {
        await browser.url(`http://localhost:3000`);
    })

    afterEach(async () => {
        await browser.mockRestoreAll();
    })

    it('should call fetch to correct url after serach ENTER press', async () => {
        const mock = await browser.mock('http://localhost:4000/**');
        const searchInput = await $('input[id="searchFormInput"]');

        await searchInput.click()
        await searchInput.addValue("Thor");
        await browser.keys(Key.Enter);
        await browser.pause();

        expect(mock.calls.length).toBe(1);
        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=&sortOrder=asc&search=Thor&searchBy=title&filter="
        );
        expect(await browser.getUrl()).toBe('http://localhost:3000/?query=Thor');
    });

    it('should call fetch to correct url after serach button press', async () => {
        const mock = await browser.mock('http://localhost:4000/**');
        const searchInput = await $('input[id="searchFormInput"]');
        const searchButton = await $('button[id="searchFormButton"]');

        await searchInput.click()
        await searchInput.addValue("Thor");
        await searchButton.click();
        await browser.pause();

        expect(mock.calls.length).toBe(1);
        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=&sortOrder=asc&search=Thor&searchBy=title&filter="
        );
        expect(await browser.getUrl()).toBe('http://localhost:3000/?query=Thor');
    });

    it('should call fetch to correct url after sort option selection', async () => {
        const mock = await browser.mock('http://localhost:4000/**');
        await browser.pause();
        const sortDropdown = await $('select[data-testid="MoviesSortingSelectDropdown"]');
        await sortDropdown.selectByAttribute('value', 'title');
        await browser.pause();

        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=title&sortOrder=asc&search=&searchBy=title&filter="
        );
        expect(await browser.getUrl()).toBe('http://localhost:3000/?sortBy=title');
    });

    it('should call fetch to correct url after genre selection', async () => {
        const mock = await browser.mock('http://localhost:4000/**')
        const genre = await $('a[id="Documentary-genre-item"]');
        await genre.click();
        await browser.pause();

        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=&sortOrder=asc&search=&searchBy=title&filter=Documentary"
        );
        expect(await browser.getUrl()).toBe('http://localhost:3000/?genre=Documentary');
    });

    it('should click on movie and show movie details', async () => {
        const movieTitle = await $(`span[class="movie-item-name"]`);

        const title = await movieTitle.getText();
        await movieTitle.click();

        const movieDetailsName = await $('span[id="movie-details-name"]');

        expect(await movieDetailsName.getText()).toBe(title.toUpperCase());
        expect(await browser.getUrl()).toBe('http://localhost:3000/337167');
    });
})

