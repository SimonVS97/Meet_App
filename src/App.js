import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySeach';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import NProgress from 'nprogress';



class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      getEvents().then((events) => {
        let locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        locationEvents = locationEvents.filter((event, index) => index < this.state.numberOfEvents);
        this.setState({
          events: locationEvents
        });
      });
    } else if (location === undefined) {
      this.setState({
        numberOfEvents: eventCount
      });
      const lengthEvents = this.state.events.filter((event, index) => index < this.state.numberOfEvents);
      this.setState({
        events: lengthEvents
      });
    }

  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    console.log(this.state.length);
    return (
      <div className="App" >
        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations}></CitySearch>
        <br></br>
        <br></br>
        <br></br>
        <NumberOfEvents updateEvents={this.updateEvents}></NumberOfEvents>
        <EventList events={this.state.events}></EventList>

      </div>
    );
  }


}

export default App;
