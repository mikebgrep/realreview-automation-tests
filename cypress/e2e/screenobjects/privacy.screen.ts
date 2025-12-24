import BaseScreen from './screen';

class PrivacyScreen extends BaseScreen {
    constructor() {
        super('Privacy Policy - Real Review');
    }

    get header() {
        return cy.get('h1')
    }

    get parahpraphs() {
        return this.header.nextAll('p')
    }

    isHeaderVisible() {
        this.header.should('be.visible')
    }

    isPragraphTextLenghtGreaterThan(minLength: number) {
        this.parahpraphs.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

}

export default new PrivacyScreen()