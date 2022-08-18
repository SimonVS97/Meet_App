import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySeach';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';


class App extends Component {

  state = {
    events: [],
    locations: []
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
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
