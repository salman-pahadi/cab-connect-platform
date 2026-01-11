import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import App from '../App';
import { store } from '../src/redux/store';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to Cab Connect')).toBeTruthy();
  });
});
