import BaseScreen from './screen';

class HomeScreen extends BaseScreen {
    constructor() {
        super('The Real Review');
    }

    get infoIcon() {
        return cy.get('svg')
    }

    get productUrlFiled() {
        return cy.get('input[name="product_url"]');
    }

    get emailField() {
        return cy.get('input[name="user_email"]');
    }

    get sendEmailButton() {
        return cy.contains('button', 'Send me the report');
    }

    get agreemetsModalTitle() {
        return cy.contains('h2', 'Terms and Conditions');
    }

    get agreementsModalAgreeButton() {
        return cy.get('button[id="agreeButton"]');
    }

    get agreementsModalDisagreeButton() {
        return cy.get('button[id="disagreeButton"]');
    }

    get infoModalTitle() {
        return cy.contains('h2', 'Welcome to Therealreview')
    }

    get infoModalText() {
        return this.infoModalTitle.next('p')
    }

    get infoModalCloseButton() {
        return cy.contains('button', 'Close')
    }

    get termsOfServiceButton() {
        return cy.contains('a', 'Terms of Service')
    }

    get PrivacypolicyButton() {
        return cy.contains('a', 'Privacy Policy')
    }


    isProductUrlFieldVisible(): void {
        this.productUrlFiled.should('be.visible');
    }

    isEmailFieldVisible(): void {
        this.emailField.should('be.visible');
    }

    isSendEmailButtonVisible(): void {
        this.sendEmailButton.should('be.visible');
    }

    isAgreementsModalTitleDisplayed(expected: boolean = true): void {
        this.agreemetsModalTitle.should(expected ? 'be.visible' : 'not.be.visible');
    }

    isMessageBubleVisible(text: string): void {
        cy.contains('p', text).should('be.visible');
    }

    isInfoModalVisible(expected: boolean = true): void {
        this.infoModalTitle.should(expected ? 'be.visible' : 'not.be.visible')
    }

    isInfoModalTextLenghtGreaterThen(minLength: number): void {
        this.infoModalText.invoke('text').then((text) => {
            const textLength = text.trim().length;
            expect(textLength).to.be.greaterThan(minLength);
        })
    }

    enterProductUrl(url: string): void {
        this.productUrlFiled.type(url);
    }

    enterEmailAddress(email: string): void {
        this.emailField.type(email);
    }

    clickSendEmailButton(): void {
        this.sendEmailButton.click();
    }

    clickInfoIcon(): void {
        this.infoIcon.click();
    }

    clickInfoMocalCloseButton(): void {
        this.infoModalCloseButton.click();
    }

    clickTermsOfSerciveButton(): void {
        this.termsOfServiceButton.invoke('removeAttr', 'target').click();
    }

    clickPrivacyPolicyButton(): void {
        this.PrivacypolicyButton.invoke('removeAttr', 'target').click();
    }

    submitForm(product_url: string, email_address: string): void {
        this.productUrlFiled.type(product_url);
        this.emailField.type(email_address);
        this.clickSendEmailButton();
    }

    submitFormAndHandleAgreementsModal(productUrl: string, emailAddress: string, agree: boolean) {
        this.submitForm(productUrl, emailAddress);
        this.handleAgreementsModal(agree);
    }

    handleAgreementsModal(shouldAgree: boolean = true): void {
        if (shouldAgree) {
            this.agreementsModalAgreeButton.click();
        } else {
            this.agreementsModalDisagreeButton.click();
        }
    }
}

export default new HomeScreen()