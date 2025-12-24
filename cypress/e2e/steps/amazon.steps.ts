import { Before, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import amazonResultScreen from '../screenobjects/amazon.screen'
import homeScreen from '../screenobjects/home.screen'

let productAsin = null;
let reportUuid = null;

Before({ tags: "@amazon_setup" }, () => {
    cy.visit('/');
    homeScreen.screenIsDisplayed();

    cy.task('readCsvRandomLine', { filePath: 'cypress/fixtures/products.csv' })
        .then((productUrl: string) => {
            const parts = productUrl.split("/");
            productAsin = parts[parts.length - 1]
            homeScreen.submitFormAndHandleAgreementsModal(`https://www.amazon.com${productUrl}`, Cypress.env('test_email'), true)
        });

    cy.waitForEmailAndNavigateToReport(Cypress.env('report_email_subject')).then((reportClean) => {
        reportUuid = reportClean
    });
});

Before({ tags: "@amazon" }, () => {
    cy.visit(`/result/${reportUuid}`);
})


When('I am on the amazon review report page', () => {
    amazonResultScreen.screenIsDisplayed();
})

Then('The header state that this is Amazon review report', () => {
    amazonResultScreen.isHeaderTextAmazon();
})

Then('The product name is visible', () => {
    amazonResultScreen.isProductNameVisible();
})

Then('Image is present and contains amazon.com href', () => {
    amazonResultScreen.isProductImageContainsAmazonHref();
})

Then('The view product button contains asin', () => {
    amazonResultScreen.isViewProductButtonHrefContainsAsin(productAsin);
})

Then('The view product button contains ref id', () => {
    amazonResultScreen.isViewProductButtonHrefContainsRefferalId();
})

Then(/^Review section text lenght is greater than (\d+)? chars$/, (minLength: number) => {
    amazonResultScreen.isReviewSectionTextLenghtGreaterThan(minLength);
})

Then(/^Critical review section text lenght is greater than (\d+)? chars$/, (minLength: number) => {
    amazonResultScreen.isCriticalReviewSectionTextGreaterThan(minLength);
})

Then(/^Zoom In section Pros bullets should be more than (\d+)$/, (count: number) => {
    amazonResultScreen.isProsSectionContainsMoreThan(count);
})

Then(/^Zoom In section Pros bullets text leght should be greter than (\d+)$/, (minLength: number) => {
    amazonResultScreen.isProsSectionElemetsTextLenghtGreaterThan(minLength);
})

Then(/^Zoom In section Cons bullets should be more than (\d+)$/, (count: number) => {
    amazonResultScreen.isProsSectionContainsMoreThan(count);
})

Then(/^Zoom In section Cons bullets text leght should be greter than (\d+)$/, (minLength: number) => {
    amazonResultScreen.isProsSectionElemetsTextLenghtGreaterThan(minLength);
})

Then('Customer rating plural is displayed correctly', () => {
    amazonResultScreen.isCustomerRatingPluralDisplayedCorrectly();
})

Then(/^Customer rating content text greater than (\d+)$/, (minLength: number) => {
    amazonResultScreen.isCustomerRatingContentLenghtGreaterThan(minLength);
})

Then(/^Customer rating in short content greater than (\d+)$/, (minLength: number) => {
    amazonResultScreen.isCustomerRatingInShortContentLenghtGreaterThan(minLength);
})

Then('First alternative contains the ref id', () => {
    amazonResultScreen.isAlternativesHrefContainsRefId();
})

Then(/^Summary content lenght is greater than (\d+)$/, (minLength: number) => {
    amazonResultScreen.isSummaryContentLenghtGreaterThan(minLength);
})