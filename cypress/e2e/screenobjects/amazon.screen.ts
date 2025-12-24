import BaseScreen from './screen';


class AmazonResultScreen extends BaseScreen {
    constructor() {
        super('Amazon Product Review - Real Review');
    }

    get header() {
        return cy.get('h1');
    }

    get productName() {
        return cy.get('h2[data-test="product_name"]');
    }

    get viewProductButton() {
        return cy.get('a[data-test="view_product_button"]');
    }

    get reviewSectionText() {
        return cy.contains('h2', 'Review').next('p');
    }

    get criticalReviewSectionText() {
        return cy.contains('h2', 'Critical Review').next('p');
    }

    get productImage() {
        return cy.get('img[data-test="product_image"]');
    }

    get prosUlElements() {
        return cy.contains('h3', 'Pros').next('ul').children('li');
    }

    get ConstIlElements() {
        return cy.contains('h3', 'Cons').next('ul').children('li');
    }

    get customerRatingHeader() {
        return cy.contains('h2', /^Customer Rating Summary$/);
    }

    get customerRatingStarsPlural() {
        return this.customerRatingHeader.next('div').children('span');
    }

    get customerReatingContent() {
        return this.customerRatingHeader.nextAll('p');
    }

    get customerRatingInShortContent() {
        return cy.contains('h3', 'In short:').next('p');
    }

    get alternatives() {
        return cy.contains('h2', 'Alternatives').next('div').children('div').children('a');
    }

    get summaryContent() {
        return cy.contains('h2', /^Summary$/).next('p');
    }

    isHeaderTextAmazon(): void {
        this.header.invoke('text').should('eq', 'Amazon Product Review Report');
    }

    isProductNameVisible(): void {
        this.productName.should('be.visible');
    }

    isProductImageContainsAmazonHref(): void {
        this.productImage.invoke('attr', 'src').then((href) => {
            expect(href).to.contains('https://m.media-amazon.com/images');
        })
    }


    isViewProductButtonHrefContainsAsin(asin: string): void {
        this.viewProductButton.invoke('attr', 'href').then((href) => {
            expect(href).to.contains(asin);
        });
    }

    isViewProductButtonHrefContainsRefferalId(): void {
        this.viewProductButton.invoke('attr', 'href').then((href) => {
            expect(href).to.contains(Cypress.env('refferal_id'));
        });
    }

    isReviewSectionTextLenghtGreaterThan(minLength: number) {
        this.reviewSectionText.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    isCriticalReviewSectionTextGreaterThan(minLength: number) {
        this.criticalReviewSectionText.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    isProsSectionContainsMoreThan(count: number) {
        this.prosUlElements.should(($items) => {
            expect($items.length).to.be.greaterThan(count);
        })
    }

    isProsSectionElemetsTextLenghtGreaterThan(minLength: number) {
        this.prosUlElements.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    isConsSectionContainsMoreThan(count: number) {
        this.ConstIlElements.should(($items) => {
            expect($items.length).to.be.greaterThan(count);
        })
    }

    isConstSectionElemetsTextLenghtGreaterThan(minLength: number) {
        this.ConstIlElements.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    isCustomerRatingPluralDisplayedCorrectly() {
        this.customerRatingStarsPlural.invoke('text').then(($text) => {
            expect($text).to.match(/^\d.\d out of 5 \(\d+ reviews\)$/)
        })
    }

    isCustomerRatingContentLenghtGreaterThan(minLength: number) {
        this.customerReatingContent.invoke('text').then((text) => {
            const cleanText = text.trim().replace(/\s/g, "");
            expect(cleanText.length).to.be.greaterThan(minLength);
        });
    }

    isCustomerRatingInShortContentLenghtGreaterThan(minLength: number) {
        this.customerRatingInShortContent.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    isAlternativesHrefContainsRefId() {
        this.alternatives.first().invoke('attr', 'href').then((href) => {
            expect(href).to.contains(Cypress.env('refferal_id'));
        });
    }

    isSummaryContentLenghtGreaterThan(minLength: number) {
        this.summaryContent.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }


}

export default new AmazonResultScreen()