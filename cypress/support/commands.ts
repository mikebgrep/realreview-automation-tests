declare global {
    namespace Cypress {
        interface Chainable {
            waitForEmailAndNavigateToReport(expectedSubject: string, maxAttempts?: number, attempt?: number): Chainable<any>;
            deleteAllEmailWithSubject(expectedSubject: string, maxAttempts?: number, attempt?: number): Chainable<any>;
            setupCymapConfigurationsEmail(): Chainable<any>;

        }
    }
}

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