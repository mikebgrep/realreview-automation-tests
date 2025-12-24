@terms
Feature: Terms of service screen flows

    Scenario: verify ToS screen header is visible
     When I am on the terms of service screen
     Then Terms page header should be visible

    Scenario: verify ToS screen paragraphs lengh is more than 7,000 chars
     When I am on the terms of service screen
     Then Paragraphs on Terms page text lenght should be greater than 7000