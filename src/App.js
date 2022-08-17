import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySeach';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';


class App extends Component {

  state = {
    events: [],
    locations: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {
    return (
      <div className="App" >
        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations}></CitySearch>
        <NumberOfEvents></NumberOfEvents>
        <EventList events={this.state.events}></EventList>

      </div>
    );
  }


}

export default App;
