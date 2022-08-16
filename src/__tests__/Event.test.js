import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mockData } from '../mockData';

Enzyme.configure({ adapter: new Adapter() })


describe('<Event /> component', () => {
  let EventWrapper;
  let event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  beforeEach(() => {
    EventWrapper.setState({
      extraInfo: false
    });
  })
  afterEach(() => {
    EventWrapper.setState({
      extraInfo: false
    });
  })

  test('render correct elements', () => {
    EventWrapper.setState({
      extraInfo: true
    });
    expect(EventWrapper.find('.Title')).toHaveLength(1);
    expect(EventWrapper.find('.startDateTime')).toHaveLength(1);
    expect(EventWrapper.find('.startTimeZone')).toHaveLength(1);
    expect(EventWrapper.find('.Location')).toHaveLength(1);
    expect(EventWrapper.find('.detailsGoogleCalendar')).toHaveLength(1);
    expect(EventWrapper.find('.Summary')).toHaveLength(1);

  });
  test('render elements with correct information', () => {
    EventWrapper.setState({
      extraInfo: true
    });
    expect(EventWrapper.find('.Title').text()).toBe(event.summary)
    expect(EventWrapper.find('.startDateTime').text()).toBe(event.start.dateTime)
    expect(EventWrapper.find('.startTimeZone').text()).toBe(event.end.dateTime)
    expect(EventWrapper.find('.Location').text()).toBe(event.location)
    expect(EventWrapper.find('.detailsGoogleCalendar').text()).toBe(event.htmlLink)
    expect(EventWrapper.find('.Summary').text()).toBe(event.description)
  })

  test('show extra information on click', () => {
    EventWrapper.find('.showDetailsButton').at(0).simulate('click');

    expect(EventWrapper.find('.Title')).toHaveLength(1);
    expect(EventWrapper.find('.startDateTime')).toHaveLength(1);
    expect(EventWrapper.find('.startTimeZone')).toHaveLength(1);
    expect(EventWrapper.find('.Location')).toHaveLength(1);
    expect(EventWrapper.find('.detailsGoogleCalendar')).toHaveLength(1);
    expect(EventWrapper.find('.Summary')).toHaveLength(1);
  })
});