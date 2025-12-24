# Cypress Real Review

<img align="left" src="assets/logo-the-real-review.png" height="210px" alt="Logo">
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


## What is this repository
 This repository contains Cypress e2e UI tests used to test https://www.realreview.report


## Table of content
 
1. e2e


    | Features          | Steps             | Screen object    | What is testing                 |
    | :---------------- | :------:          | ----:            | ---------------:                |
    | amazon.feature    |  amazon.steps.ts  | amazon.screen.ts | Amazon review report            |
    | home.feature      |  home.steps.ts    | home.screen.ts   | Home screen UI functuinalities  |
    | privacy.feature   |  privacy.steps.ts | privacy.screen.ts| Privacy Policy                  |
    | terms.feature     |  terms.steps.ts   | terms.screen.ts  | Therms of Service               |



2. support


    | Commands                         | Purpose                                                                                         | Usage  In        | 
    | :----------------                | :------:                                                                                        | ----:            | 
    | waitForEmailAndNavigateToReport  |  Wait for email to be recived, extract the review UUID and delete the email max 100 seconds     | amazon.steps.ts  |
    | deleteAllEmailWithSubject        |  Try to delete all email with subject form env. 'report_email_subject'  max 30 seconds wait     | home.steps.ts    | 
    | setupCymapConfigurationsEmail    |  Setup cymap email dependancy (needs to be before each test)                                    | commands.ts      | 


   
   
   <details>
    <summary>waitForEmailAndNavigateToReport details</summary>

    ```typescript
        Cypress.Commands.add('waitForEmailAndNavigateToReport', (expectedSubject, maxAttempts = 10, attempt = 0) => {
            if (attempt >= maxAttempts) {
                throw new Error('Email with subject not found after max attempts');
            }
            cy.setupCymapConfigurationsEmail();
            return cy.getEmailByIndex(1).then((email) => {
                if (email.subject === expectedSubject) {
                    const html = email.html;
                    const $doc = Cypress.$(html);
                    const anchors = $doc.find('a[data-test]');
                    const reportAddress = anchors.attr('href');

                    if (!reportAddress) {
                        throw new Error('Report address not found in email HTML');
                    }

                    const parts = reportAddress.split("/");
                    const reportClean = parts[parts.length - 1];

                    return cy.visit(`/result/${reportClean}`).then(() => {
                        return cy.deleteEmailByIndex(1).then(() => {
                            return cy.wrap(reportClean);
                        });
                    });

                } else {
                    return cy.wait(10000).then(() => {
                        return cy.waitForEmailAndNavigateToReport(expectedSubject, maxAttempts, attempt + 1);
                    });
                }
            });
        });
    ```

    </details>

    <details>
    <summary>deleteAllEmailWithSubject details</summary>

    ```typescript
        Cypress.Commands.add('deleteAllEmailWithSubject', (expectedSubject, maxAttempts = 3, attempt = 0) => {

            cy.setupCymapConfigurationsEmail();
            cy.getEmailByIndex(1).then((email) => {
                if (email.subject === expectedSubject) {
                    cy.deleteEmailByIndex(1);
                }

                if (maxAttempts >= attempt) {
                    cy.wait(10000).then(() => {
                        cy.deleteAllEmailWithSubject(expectedSubject, maxAttempts, attempt + 1);
                    });

                }
            });
        });
    ```

    </details>

    <details>
    <summary>setupCymapConfigurationsEmail details</summary>

    ```typescript
        Cypress.Commands.add('setupCymapConfigurationsEmail', () => {
            // Set confing for cymap email service
            cy.setConnectionConfig({
                password: Cypress.env('email_password'),
                user: Cypress.env('test_email'),
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false }
            })
        });
    ```

    </details>

## Install dependancies

`> npm i package.json`

## Envirument variables

`> cp cypress.env.json.example cypress.env.json`
    
| Variable             | Purpose                                                                                                                        |
| :----------------    | :------:                                                                                                                       | 
| refferal_id          |  Amazon refferial id linked to the Real Review                                                                                 |
| test_email           |  Email used in the tests to recive the reports                                                                                 | 
| email_password       |  The email password used by cymap in `setupCymapConfigurationsEmail`                                                           | 
| report_email_subject |  The subject of the email used to match the recived email in `waitForEmailAndNavigateToReport` and `deleteAllEmailWithSubject` |


## Run tests

`> npm run e2e:chrome `