# Meet_App

## Description
This app provides a list of upcoming events for any given city, with data provided by Google Calendar. The app works offline using cached data from the last time it was used online. The user can serach for events in a specific city or browse all events, customize how many events are shown on screen, click an event for more details, and see how many events are upcoming in certain cities.

![First Section](https://user-images.githubusercontent.com/104713327/209682295-cec493ed-e19e-44e7-ad96-b0412a631c22.png)
![Second Section](https://user-images.githubusercontent.com/104713327/209682242-6751854f-58c5-4123-afd0-10e372d8cf1b.png)


## How to access the project
You can access the app with this URL: https://simonvs97.github.io/Meet_App/

## Tech Stack
- HTML
- CSS
- JS
- React v.18.2.0
- AWS Lambda
- Serverless
- CRA

## Dependencies
* Axios
* nprogress
* React
* React-DOM
* React-Router-DOM
* Recharts

## User Stories

### User Story 1 
As a user, I want to filter events by city, so that I can see the list of events that take place in that city.
### User Story 2
As a user, I want to display and close out of details of a n event, so that I can make a better decision on attending.
### User Story 3
As a user, I want to set the number of events I see, so that I can control how many events are displyed on my screen.
### User Story 4
As a user, I want to be able to use the app offline, so that I can refer to it in any circumstance.
### User Story 5
As a user, I want to be able to know the number of upcoming events by city, so I can make a better decision on where to go.

## Scenarios
### User Story 1
> Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities
- Given the user has not searched for a city
- when the user opens the app
- then the user should see a list of all upcoming events

> Scenario 2: User should see a list of suggestions when they search for a city
- Given the main page is open 
- when the user starts typing in the city textbox
- then the user should see a list of cities that match what they've typed

> Scenario 3: User can select a city from the suggested list
- Given the user was typing a certain city in the textbox 
- and the list of suggestd cities is howing
- when the user selects a city from that list 
- then the users city should be changed to that city 
- and the user should receive a list of upcoming events in that city

### User Story 2
> Scenario 1: An event element is collapsed by default
- Given the user has not opened the app 
- when the user opens the app
- then all event elements should be collapsed

> Scenario 2: User can expand an event to see its details
- Given the user has opened the app
- when ther user clicks on an event 
- then more details about that event are shown

> Scenario 3: User can collapse an event to hide its details
- Given that the details about an event are shown 
- when the user clicks on that event 
- then the details should be hidden

### User Story 3
> Scenario 1: When user hasn’t specified a number, 32 is the default number
- Given the user opens the app
- when the user does not specify a number
- then 32 elements should be shown

> Scenario 2: User can change the number of events they want to see
- Given the user has not specified a number
- when the user specifies a number
- then his number of events shoulb be shown

### User Story 4
> Scenario 1: Show cached data when there’s no internet connection
- Given the user has no internet connection
- when the user opens the app
- then cached data should be used to display events/cities

> Scenario 2: Show error when user changes the settings (city, time range)
- Given the user has no internet connection
- when the user changes the settings
- then an error messageg should be displayed

### User Story 5
> Scenario 1: Show a chart with the number of upcoming events in each city
- Given the user was typing in the textbox the list of suggested cities is showing
- when the user clicks on a city
- then the user should see a chart with the number of upcoming events in that city


## API
This app uses the Google Calendar API to fetch information about upcoming events by location.




