import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mockData } from '../mockData';

Enzyme.configure({ adapter: new Adapter() })


describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
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

  test('render correct information', () => {
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

  test('show extra information on click', () => {
    EventWrapper.find('.detailsButton').at(0).simulate('click');

    expect(EventWrapper.find('.Title')).toHaveLength(1);
    expect(EventWrapper.find('.startDateTime')).toHaveLength(1);
    expect(EventWrapper.find('.startTimeZone')).toHaveLength(1);
    expect(EventWrapper.find('.Location')).toHaveLength(1);
    expect(EventWrapper.find('.detailsGoogleCalendar')).toHaveLength(1);
    expect(EventWrapper.find('.Summary')).toHaveLength(1);
  })
});