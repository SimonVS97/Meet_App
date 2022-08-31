import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccesstoken } from './api';
import WelcomeScreen from './WelcomeScreen';
import NProgress from 'nprogress';



class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: true
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      getEvents().then((events) => {
        let locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        locationEvents = locationEvents.filter((event, index) => index < this.state.numberOfEvents);
        this.setState({
          events: locationEvents,
          locations: location
        });
      });
    } else if (location === undefined) {
      getEvents().then((events) => {
        let lengthEvents = events;
        if (typeof this.state.locations == 'string') {
          lengthEvents = lengthEvents.filter((event, index) => event.location == this.state.locations)
        }
        lengthEvents = lengthEvents.filter((event, index) => index < eventCount);
        this.setState({
          numberOfEvents: eventCount,
          events: lengthEvents
        });

      })


      /*this.setState({
        numberOfEvents: eventCount
      });
      const lengthEvents = this.state.events.filter((event, index) => index < this.state.numberOfEvents);
      this.setState({
        events: lengthEvents
      }); */
    }
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App'></div>
    return (
      <div className="App" >
        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations}></CitySearch>
        <br></br>
        <br></br>
        <br></br>
        <NumberOfEvents updateEvents={this.updateEvents}></NumberOfEvents>
        <EventList events={this.state.events}></EventList>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccesstoken={getAccesstoken} />
      </div>
    );
  }


}

export default App;
