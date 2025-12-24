class BaseScreen {
    protected title: string;
    constructor(title: string) {
        this.title = title
    }

    screenIsDisplayed(timeout: number = 3000, visible: boolean = true) {
        cy.title({ timeout }).should(visible ? 'eq': 'not.eq', this.title)
    };

}

export default BaseScreen;