import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App.jsx';
import Header from '../components/Header.jsx';
import Body from '../components/Body.jsx';
import Footer from '../components/Footer.jsx';

describe('App component', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    });
});

describe('Header component', () => {
    it('renders without crashing', () => {
        render(<Header />);
    });
});

describe('Body component', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
    });
});

describe('Footer component', () => {
    it('renders without crashing', () => {
        render(<Footer />);
    });
});