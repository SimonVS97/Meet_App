import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mockData';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import EventList from '../EventList';

Enzyme.configure({ adapter: new Adapter() })

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the user has not opened the app', () => {

    });
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('all event elemts should be collapsed', () => {
      AppWrapper.update();
      let EventWrapper = AppWrapper.find('Event').first();
      expect(EventWrapper.state('extraInfo')).toBe(false);
      expect(EventWrapper.find('.event__Details')).toHaveLength(0);
    });
  });
  test('User can expand an event to see its details.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user has opened the app', () => {
      AppWrapper = mount(<App />);

    });
    let EventWrapper;
    when('the user clicks on that event', () => {
      AppWrapper.update();
      EventWrapper = AppWrapper.find('Event').first();
      EventWrapper.find('.showDetailsButton').simulate('click');
      expect(EventWrapper.state('extraInfo')).toBe(true);

    });

    then('more details about that event are shown', () => {
      AppWrapper.update();
      EventWrapper = AppWrapper.find('Event').first();
      expect(EventWrapper.find('.event__Details')).toHaveLength(1);
    });
  });
  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let AppWrapper;
    let EventWrapper;
    given('that the details about an event are shown', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper).toHaveLength(1);
      AppWrapper.update();
      EventWrapper = AppWrapper.find('Event').first();
      expect(EventWrapper.find('.event__Details')).toHaveLength(1);
    });

    when('the user clicks on that event', () => {
      AppWrapper.update();
      EventWrapper.find('.hideDetailsButton').simulate('click');
      AppWrapper.update();
      expect(EventWrapper.state('extraInfo')).toBe(false);
    });

    then('the details should be hidden', () => {
      EventWrapper = AppWrapper.find('Event').first();
      expect(EventWrapper.find('.event__Details')).toHaveLength(0);

    });
  });
});