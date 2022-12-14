import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList/EventList.js';
import CitySearch from './components/CitySearch/CitySearch.js';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents.js';
import EventGenre from './components/EventGenre/EventGenre.js';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen.jsx';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: true
  }

  updateEvents = (location, eventCount) => {
    if (!location) location = 'all';
    !eventCount
      ? (eventCount = this.state.numberOfEvents)
      : this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
      });
    });
  };


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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { locations, numberOfEvents, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div className='App'></div>
    return (
      <div className="App" >
        <h1>meetApp</h1>
        <h4>Choose your nearest city</h4>

        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations}></CitySearch>
        <NumberOfEvents updateEvents={this.updateEvents}></NumberOfEvents>
        <h4>Overview of events</h4>
        <div style={{ textAlign: "center" }} className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
            >
              <CartesianGrid />
              <XAxis dataKey="city" name="City" type="category" />
              <YAxis dataKey="number" name="Number of events" type="number" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events}></EventList>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => getAccessToken()} />
      </div >
    );
  }


}

export default App;