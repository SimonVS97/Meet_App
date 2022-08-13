import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySeach';


function App() {
  return (
    <div className="App">
      <CitySearch></CitySearch>
      <EventList></EventList>

    </div>
  );
}

export default App;
