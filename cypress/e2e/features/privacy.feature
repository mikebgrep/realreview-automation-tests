@privacy
Feature: Privacy Policy screen flows

    Scenario: verify Privacy Policy screen header is visible
     When I am on the privacy policy screen
     Then Privacy Policy page header should be visible

    Scenario: verify Privacy Policy screen paragraphs lengh is more than 3,000 chars
     When I am on the privacy policy screen
     Then Paragraphs on Privacy Policy page text lenght should be greater than 3000