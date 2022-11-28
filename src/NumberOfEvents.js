import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32,
    infoText: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 33) {
      this.setState({
        numberOfEvents: value,
        infoText: ''
      });
      this.props.updateEvents(undefined, value);
    } else {
      this.setState({
        numberOfEvents: value,
        infoText: 'Please select a number from 1 to 32.'
      })
    }
  }


  render() {
    return (
      <div className='NumberOfEvents'>
        <label htmlFor="events-number" className="LabelNumberOfEvents">Number of Events: </label>
        <ErrorAlert text={this.state.infoText} />
        <input
          id="events-number"
          type="number"
          className="InputNumberOfEvents"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />

      </div>
    )
  }
}


export default NumberOfEvents;