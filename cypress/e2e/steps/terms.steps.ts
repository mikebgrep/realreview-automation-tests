import { Before, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import termsScreen from '../screenobjects/terms.screen'
import homeScreen from '../screenobjects/home.screen'


Before({ tags: "@terms" }, () => {
    cy.visit('/');
    homeScreen.screenIsDisplayed();
    homeScreen.clickTermsOfSerciveButton();
});

When('I am on the terms of service screen', () => {
    termsScreen.screenIsDisplayed();
})

Then('Terms page header should be visible', () => {
    termsScreen.isHeaderVisible()
})

Then(/^Paragraphs on Terms page text lenght should be greater than (\d+)$/, (minLength: number) => {
    termsScreen.isPragraphTextLenghtGreaterThan(minLength);
})