Feature: Specify number of events

  Scenario: When user hasn't specified a number, 32 is the default number
    Given the user opens the app
    When the user does not specify a number
    Then 32 elements should be shown

  Scenario: user can change the number of events they want to see
    Given the user has not specified a number
    When the user specifies a number
    Then this number of events should be shown
