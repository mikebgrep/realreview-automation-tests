import { Before, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import privacyScreen from '../screenobjects/privacy.screen'
import homeScreen from '../screenobjects/home.screen'


Before({ tags: "@privacy" }, () => {
    cy.visit('/');
    homeScreen.screenIsDisplayed();
    homeScreen.clickPrivacyPolicyButton();
});

When('I am on the privacy policy screen', () => {
    privacyScreen.screenIsDisplayed();
})

Then('Privacy Policy page header should be visible', () => {
    privacyScreen.isHeaderVisible();
})

Then(/^Paragraphs on Privacy Policy page text lenght should be greater than (\d+)$/, (minLength: number) => {
    privacyScreen.isPragraphTextLenghtGreaterThan(minLength);
})