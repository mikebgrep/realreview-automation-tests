Feature: Amazon Report flows

    @amazon_setup
    Scenario: amazon report first container and title checks
     When I am on the amazon review report page
     Then The header state that this is Amazon review report
     Then The product name is visible
     Then Image is present and contains amazon.com href
     Then The view product button contains asin
     Then The view product button contains ref id

    @amazon
    Scenario: amazon review and critical review text checks
     When I am on the amazon review report page
     Then Review section text lenght is greater than 100 chars
     Then Critical review section text lenght is greater than 100 chars

    @amazon
    Scenario: zoom in section pros and contains
     When I am on the amazon review report page
     Then Zoom In section Pros bullets should be more than 3
     Then Zoom In section Pros bullets text leght should be greter than 100
     Then Zoom In section Cons bullets should be more than 2
     Then Zoom In section Cons bullets text leght should be greter than 100

    @amazon
    Scenario: customer rating sections checks
     When I am on the amazon review report page
     Then Customer rating plural is displayed correctly
     Then Customer rating content text greater than 300
     Then Customer rating in short content greater than 200

    @amazon
    Scenario: alternatives ref id checks and summary
     When I am on the amazon review report page
     Then First alternative contains the ref id
     Then Summary content lenght is greater than 100
