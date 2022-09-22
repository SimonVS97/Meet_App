import React, { Component } from 'react';

class Event extends Component {

  state = {
    extraInfo: false
  }


  render() {
    const { summary, description, location, start: { dateTime: { startDateTime } }, start: { timeZone: startTimeZone }, htmlLink } = this.props.event;
    /*
    const startDateTime = this.props.event.start.dateTime;
    const startTimeZone = this.props.event.end.dateTime;
    const { location } = this.props.event;
    const {htmlLink} = this.props.event;
    */
    let extraInfo = this.state.extraInfo;
    let time = this.props.event.start.startDateTime;



    return (

      <div className='event'>
        <h1>{summary}</h1>
        <p>{time}</p>
        <p>{location}</p>
        {extraInfo === false && <button
          className='showDetailsButton'
          onClick={() => this.setState({
            extraInfo: true
          })}>
          Show Details
        </button>}
        {extraInfo &&
          <div className='event__Details'>
            <div className='startDateTime'>Start: {startDateTime}</div>
            <div className='startTimeZone'>Timezone: {startTimeZone}</div>
            <a href={htmlLink} target="_blank">View in Google Calendar</a>
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
