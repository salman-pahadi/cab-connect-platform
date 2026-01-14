import React from 'react';
import { render } from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    const { root } = render(<App />);
    // App renders Navigation wrapped in Provider and SafeAreaProvider
    expect(root).toBeTruthy();
  });
});
