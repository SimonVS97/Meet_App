import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

const feature = loadFeature('./specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given('the user opens the app', () => {
      AppWrapper = mount(<App />);


    });

    when('the user does not specify a number', () => {

    });

    then(/^(\d+) elements should be shown$/, (arg0) => {
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
    });
  });
  test('user can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('the user has not specified a number', () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();

    });

    when('the user specifies a number', () => {
      AppWrapper.find('.InputNumberOfEvents').simulate('change', { target: { value: 10 } });
      AppWrapper.update();

    });

    then('this number of events should be shown', () => {
      expect(AppWrapper.state('numberOfEvents')).toBe(10);

    });
  });


})