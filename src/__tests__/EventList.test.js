import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Event from '../Event.js';
import { mockData } from '../mockData';

Enzyme.configure({ adapter: new Adapter() })

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  })
});