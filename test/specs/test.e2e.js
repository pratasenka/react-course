const { expect, browser, $ } = require('@wdio/globals');
const chai = require('chai');

describe('Counter', async () => {
    const clickCount = 10;

    beforeEach(async () => {
        await browser.url(`http://localhost:3000`)
    })

    it('should be displayed increase button', async () => {
        const increaseButton = await $('button[id="+"]');
        await expect(increaseButton).toBeDisplayed();
    });

    it('should be displayed decrease button', async () => {
        const decreaseButton = await $('button[id="-"]');
        await expect(decreaseButton).toBeDisplayed();
    })

    it('should be displayed counter label', async () => {
        const counterLabel = await $('span[data-testid="counterLabel"]');
        await expect(counterLabel).toBeDisplayed();
    })

    it('should increase counter label by clickCount times', async () => {
        const increaseButton = await $('button[id="+"]');

        for (let i = 0; i < clickCount; i++) {
            await increaseButton.click()
        }

        const counterLabel = await $('span[data-testid="counterLabel"]');
        chai.expect(await counterLabel.getText()).to.equal(String(clickCount));
    });

    it('should decrease counter label by clickCount times', async () => {
        const decreaseButton = await $('button[id="-"]');

        for (let i = 0; i < clickCount; i++) {
            await decreaseButton.click()
        }

        const counterLabel = await $('span[data-testid="counterLabel"]');
        chai.expect(await counterLabel.getText()).to.equal(String(clickCount * -1));
    });

    it('should increase and decrease counter label by clickCount for both operations times', async () => {
        const increaseButton = await $('button[id="+"]');
        const decreaseButton = await $('button[id="-"]');

        for (let i = 0; i < clickCount; i++) {
            await increaseButton.click()
        }

        for (let i = 0; i < clickCount; i++) {
            await decreaseButton.click()
        }

        const counterLabel = await $('span[data-testid="counterLabel"]');
        chai.expect(await counterLabel.getText()).to.equal(String(0));
    });
})

