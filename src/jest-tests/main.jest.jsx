import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.jsx';

describe('App component (Jest)', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});