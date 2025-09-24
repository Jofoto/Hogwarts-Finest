import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Body from '../components/Body.jsx';

describe('Body component', () => {
    it('renders navigation links', () => {
        render(
            <MemoryRouter>
                <Body />
            </MemoryRouter>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
        expect(screen.getByText('List')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('redirects root to /home', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Body />
            </MemoryRouter>
        );
        expect(screen.getByText(/home/i)).toBeInTheDocument();
    });

    it('renders Add component on /add route', () => {
        render(
            <MemoryRouter initialEntries={['/add']}>
                <Body />
            </MemoryRouter>
        );
        // Use getAllByText if "Add" appears multiple times
        expect(screen.getAllByText(/add/i).length).toBeGreaterThan(0);
    });

    it('renders CustomerList component on /list route', () => {
        render(
            <MemoryRouter initialEntries={['/list']}>
                <Body />
            </MemoryRouter>
        );
        expect(screen.getByText(/wizard list/i)).toBeInTheDocument();
    });

    it('renders Search component on /search route', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <Body />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/search/i).length).toBeGreaterThan(0);
    });
});