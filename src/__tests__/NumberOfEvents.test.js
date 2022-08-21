import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NumberOfEvents from '../NumberOfEvents';



Enzyme.configure({ adapter: new Adapter() })

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
  beforeEach(() => {

  })
  afterEach(() => {

  })

  test('render correct elements', () => {
    expect(NumberOfEventsWrapper.find('.LabelNumberOfEvents')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
    expect(NumberOfEventsWrapper.find('.InputNumberOfEvents')).toHaveLength(1);
  });
  test('render default input', () => {
    const query = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.InputNumberOfEvents').prop('value')).toBe(query);
  });
  test('setting a number should change state', () => {
    NumberOfEventsWrapper.find(".InputNumberOfEvents").simulate("change", {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual(10);
  });


})