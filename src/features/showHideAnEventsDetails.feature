Feature: Show/Hide an events details

  Scenario: An event element is collapsed by default.
    Given the user has not opened the app
    When the user opens the app
    Then all event elemts should be collapsed

  Scenario: User can expand an event to see its details.
    Given the user has opened the app
    When the user clicks on that event
    Then more details about that event are shown

  Scenario: User can collapse an event to hide its details.
    Given that the details about an event are shown
    When the user clicks on that event
    Then the details should be hidden

