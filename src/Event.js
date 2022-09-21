import React, { Component } from 'react';

class Event extends Component {

  state = {
    extraInfo: false
  }

  render() {
    const { summary, description, location, start: { dateTime: { startDateTime } }, end: { dateTime: startTimeZone }, htmlLink } = this.props.event;
    /*
    const startDateTime = this.props.event.start.dateTime;
    const startTimeZone = this.props.event.end.dateTime;
    const { location } = this.props.event;
    const detailsGoogleCalendar = this.props.event.htmlLink;
    */
    let extraInfo = this.state.extraInfo;



    return (
      <div className='event'>
        <h1>{summary}</h1>
        <p>{startDateTime}</p>
        <p>{location}</p>
        <button
          className='showDetailsButton'
          onClick={() => this.setState({
            extraInfo: true
          })}>
          Show Details
        </button>
        {extraInfo &&
          <div className='event__Details'>
            <div className='Title'>{summary}</div>
            <div className='startDateTime'>{startDateTime}</div>
            <div className='startTimeZone'>{startTimeZone}</div>
            <div className='Location'>{location}</div>
            <div className='detailsGoogleCalendar'>{htmlLink}</div>
            <div className='Summary'>{description}</div>
            <button
              className='hideDetailsButton'
              onClick={() => this.setState({
                extraInfo: false
              })}>
              Hide Details
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Event;
