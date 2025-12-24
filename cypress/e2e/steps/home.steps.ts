import { Before, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";
import homeScreen from '../screenobjects/home.screen'

Before({ tags: "@home" },() => {
    cy.visit('/');
    homeScreen.screenIsDisplayed();
});

When(/^I enter product url (.+) to product input field$/, (productUrl: string) => {
    homeScreen.isProductUrlFieldVisible();
    homeScreen.enterProductUrl(productUrl);
    }       
);

When(/^I enter email address (.+) in email field$/, (emailAddress: string) => {
    homeScreen.enterEmailAddress(emailAddress);
});

When(/^I submit form with product url (.+) and email address (.+\.com)( and agree to ToS)?$/, (productUrl: string, emailAddress: string, agreeToToS: string) => {
    if (!!agreeToToS) {
        homeScreen.submitFormAndHandleAgreementsModal(productUrl, emailAddress, true);
    } else {
        homeScreen.submitForm(productUrl, emailAddress);
    }
})

When(/^I submit valid form with product url (.+) to the default email and agree to Tos$/, (productUrl: string) => {
    homeScreen.submitFormAndHandleAgreementsModal(productUrl, Cypress.env('test_email'), true);
})


When('I click submit button', () => {
    homeScreen.isSendEmailButtonVisible();
    homeScreen.clickSendEmailButton();
});

Then('I should see agreements modal', () => {
    homeScreen.isAgreementsModalTitleDisplayed();
});

Then('I should not see agreements modal', () => {
    homeScreen.isAgreementsModalTitleDisplayed(false);
});

When('I click agree button on agreements modal', () => {
    homeScreen.handleAgreementsModal()
});

Then('Agreements modal button should be dissmised', () => {
    homeScreen.isAgreementsModalTitleDisplayed(false);
});

Then(/^Message bubble should contain text '(.+)'$/, (text: string) => {
    homeScreen.isMessageBubleVisible(text);
});

When('I click disagree button on agreements modal', () => {
    homeScreen.handleAgreementsModal(false);
})

When('I click info icon', () => {
    homeScreen.clickInfoIcon();
})

Then(/^I should (not )?see info modal$/, (notVisible: string) => {
    if (!!notVisible) {
        homeScreen.isInfoModalVisible(false)
    } else {
        homeScreen.isInfoModalVisible()
    }
})

Then(/^Info modal text lenght should be greater than (\d+) chars$/, (minLength: number) => {
    homeScreen.isInfoModalTextLenghtGreaterThen(minLength);
})

When('I click close info modal button', () => {
    homeScreen.clickInfoMocalCloseButton();
})


After({ tags: "@deleteEmails" }, () => {
    cy.deleteAllEmailWithSubject(Cypress.env('report_email_subject'));
})