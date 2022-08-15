import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySeach';
import NumberOfEvents from './NumberOfEvents';


function App() {
  return (
    <div className="App">
      <CitySearch></CitySearch>
      <NumberOfEvents></NumberOfEvents>
      <EventList></EventList>

    </div>
  );
}

export default App;
