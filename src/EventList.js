import React from 'react';
import { Component } from 'react';
import Event from './Event.js';
import { OfflineAlert } from './Alert.js';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <ul className='EventList'>
        <li>
          {!navigator.onLine && OfflineAlert}
        </li>
        {events.map(event =>
          <li key={event.id}>
            <Event event={event} />
          </li>
        )}

      </ul>
    );
  }
}

export default EventList;