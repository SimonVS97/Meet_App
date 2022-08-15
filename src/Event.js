import React, { Component } from 'react';

class Event extends Component {
  render() {
    const { summary } = this.props;
    const { description } = this.props;
    const { startDateTime } = this.props.start.dateTime;
    const { startTimeZone } = this.props.start.timeZone;
    const { location } = this.props.location;
    const { detailsGoogleCalendar } = this.props.htmlLink;


    return (
      <div>
        <div>{description}</div>
        <div>{startDateTime}</div>
        <div>{startTimeZone}</div>
        <div>{location}</div>
        <div>{detailsGoogleCalendar}</div>
        <div>{summary}</div>

      </div>
    )
  }
}

export default Event;
