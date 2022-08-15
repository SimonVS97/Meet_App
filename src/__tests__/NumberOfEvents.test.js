import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NumberOfEvents from '../NumberOfEvents';



Enzyme.configure({ adapter: new Adapter() })

describe('<NumberOfEvents /> component', () => {
  let NumberOfEvents;
  beforeAll(() => {
    NumberOfEvents = shallow(<NumberOfEvents />);
  });
  beforeEach(() => {

  })
  afterEach(() => {

  })

  test('render correct elements', () => {

    expect(NumberOfEvents.find('.NumberOfEvents')).toHaveLength(1);
    expect(NumberOfEvents.find('.InputNumberOfEvents')).toHaveLength(1);

  });

})