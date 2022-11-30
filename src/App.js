import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySerach from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { DarkMode } from './DarkMode';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import {
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/[,-]/).shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const {
      locations,
      numberOfEvents,
      events,
      offlineText,
      showWelcomeScreen,
    } = this.state;

    if (!showWelcomeScreen) return <div className="App" />;

    return (
      <div className="App">
        <h1>Meet App</h1>
        <OfflineAlert text={offlineText} />
        <CitySerach locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <DarkMode />
        <h2>Overview of the events</h2>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid stroke="#909090" strokeDasharray="2 2" />
              <XAxis
                type="category"
                dataKey="city"
                name="City"
                stroke="#909090"
              />
              <YAxis
                type="number"
                dataKey="number"
                name="Number of events"
                allowDecimals={false}
                stroke="#909090"
              />
              <Tooltip cursor={{ stroke: '#ff6200', strokeDasharray: '2 2' }} />
              <Scatter data={this.getData()} fill="#ff6200" shape="star" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <h2>Events</h2>
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={getAccessToken}
        />
      </div>
    );
  }
}

export default App;
/*import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, ResponsiveContainer } from 'recharts';


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
        location = [location];
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
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>

        <CitySearch updateEvents={this.updateEvents} locations={this.state.locations}></CitySearch>
        <br></br>
        <br></br>
        <br></br>
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

export default App;*/
