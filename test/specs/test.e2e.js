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
    });

    it('should call fetch to correct url after sort option selection', async () => {
        const mock = await browser.mock('http://localhost:4000/**');
        await browser.pause();
        const sortDropdown = await $('select[data-testid="MoviesSortingSelectDropdown"]');
        await sortDropdown.selectByAttribute('value', 'Title');
        await browser.pause();

        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=title&sortOrder=asc&search=&searchBy=title&filter="
        );
    });

    it('should call fetch to correct url after genre selection', async () => {
        const mock = await browser.mock('http://localhost:4000/**')
        const genre = await $('a[id="Documentary-genre-item"]');
        await genre.click();
        await browser.pause();

        console.log(mock.calls.length)
        expect(mock.calls[0].url).toBe(
            "http://localhost:4000/movies?sortBy=&sortOrder=asc&search=&searchBy=title&filter=Documentary"
        );
    });
})

