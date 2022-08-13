import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySeach';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

describe('<CitySearch /> component', () => {
  test('render text input', () => {
    const CitySeachWrapper = shallow(<CitySearch />);
    expect(CitySeachWrapper.find('.city')).toHaveLength(1);
  });
  test('renders a list of suggestions', () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
});