@home
Feature: Home screen flows

    Scenario: submit report wihtou email address
     When I enter product url https://www.amazon.com/ to product input field
     When I click submit button
     Then I should see agreements modal
     When I click agree button on agreements modal
     Then Agreements modal button should be dissmised
     Then Message bubble should contain text 'Please enter email address in order to generate the report'


    Scenario: submit remort without product url
     When I enter email address example@email.com in email field
     When I click submit button
     When I click agree button on agreements modal
     Then Message bubble should contain text 'Please enter product address in order to generate the report.'

    Scenario: when the user disagree consent modal it's shown again on re-submiting the form
     When I submit form with product url https://www.amazon.com/ and email address example@email.com
     Then I should see agreements modal
     When I click disagree button on agreements modal
     When I click submit button
     Then I should see agreements modal

    Scenario: when the user accpet ToS consent modal should not be displayed anymore
     When I submit form with product url https://www.amazon.com/ and email address example@email.com and agree to ToS
     When I submit form with product url https://www.amazon.com/ and email address example@email.com
     Then I should not see agreements modal

    Scenario: bubble message for not complete amazon url is displayed
     When I submit form with product url https://www.amazon.com/ and email address example@email.com and agree to ToS
     Then Message bubble should contain text 'Please use exact Amazon.com product url. Example address "https://www.amazon.com/Name-of-product/dp/ND10ZA..'

    Scenario: bubble message for non amazon.com url is displayed
     When I submit form with product url <product_url> and email address example@email.com and agree to ToS
     Then Message bubble should contain text 'Please use Amazon.com product. Example address starting with "https://www.amazon.com/.'

     Examples:
      | product_url                                                                                     |
      |    https://www.amazon.de/-/en/Keyboard-Customizable-Lighting-Mechanical-Switches/dp/B0DHCSSSZF/ |
      |    https://www.google.com/                                                                      |
      |    https://www.google.com/dp/                                                                   |
      |    https://www.yahoo.com/dp/Keyboard-Customizable-Lighting-Mechanical-Switches/dp/B0DHCSSSZF/   |

    Scenario: info modal functionality
     When I click info icon
     Then I should see info modal
     Then Info modal text lenght should be greater than 700 chars
     When I click close info modal button
     Then I should not see info modal

    @deleteEmails
    Scenario: check form submission with valid data
     When I submit valid form with product url https://www.amazon.com/ASUS-ZenScreen-viewable-Portable-MB249C/dp/B0BQPS9QCT/ to the default email and agree to Tos
     Then Message bubble should contain text 'Product review is requested successfully. Expect an email with report link approximately after 0:00:30 hrs.' 