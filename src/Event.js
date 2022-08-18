import React, { Component } from 'react';

class Event extends Component {

  state = {
    extraInfo: false
  }

  render() {
    const { summary } = this.props.event;
    const { description } = this.props.event;
    const startDateTime = this.props.event.start.dateTime;
    const startTimeZone = this.props.event.end.dateTime;
    const { location } = this.props.event;
    const detailsGoogleCalendar = this.props.event.htmlLink;
    let extraInfo = this.state.extraInfo;


    return (
      <div>
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
          <div>
            <div className='Title'>{summary}</div>
            <div className='startDateTime'>{startDateTime}</div>
            <div className='startTimeZone'>{startTimeZone}</div>
            <div className='Location'>{location}</div>
            <div className='detailsGoogleCalendar'>{detailsGoogleCalendar}</div>
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
