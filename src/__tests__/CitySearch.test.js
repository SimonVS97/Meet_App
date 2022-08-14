import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySeach';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mockData } from '../mockData';
import { extractLocations } from '../api';

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
  test('renders text input corretly', () => {
    const CitySeachWrapper = shallow(<CitySearch />);
    const query = CitySeachWrapper.state('query');
    expect(CitySeachWrapper.find('.city').prop('value')).toBe(query);
  });
  test('change state when text input changes', () => {
    const CitySeachWrapper = shallow(<CitySearch />);
    CitySeachWrapper.setState({
      query: 'Munich'
    });
    const eventObject = { target: { value: 'Berlin' } };
    CitySeachWrapper.find('.city').simulate('change', eventObject);
    expect(CitySeachWrapper.state('query')).toBe('Berlin');
  });
  test('render list of suggestions correctly', () => {
    const locations = extractLocations(mockData);
    const CitySeachWrapper = shallow(<CitySearch />);
    CitySeachWrapper.setState({ suggestions: locations });
    const suggestions = CitySeachWrapper.state('suggestions');
    expect(CitySeachWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySeachWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });
});