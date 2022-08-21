import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value
    });
    this.props.updateEvents(undefined, value);
  }


  render() {
    return (
      <div className='NumberOfEvents'>
        <label className="LabelNumberOfEvents">Number of Events: </label>
        <input
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