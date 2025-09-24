import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { waitFor } from '@testing-library/react';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        MemoryRouter: actual.MemoryRouter,
    };
});

import { MemoryRouter } from 'react-router-dom';
import CustomerList from '../components/content/CustomerList.jsx';

const customersMock = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Name${i + 1}`,
    email: `email${i + 1}@test.com`,
    password: `pw${i + 1}`,
}));

beforeEach(() => {
    global.fetch = vi.fn((url) => {
        if (url.includes('/customers?_page=1&_limit=10')) {
            return Promise.resolve({
                json: () => Promise.resolve([
                    { id: 1, name: 'Name1', email: 'email1@test.com', password: 'pw1' }
                ])
            });
        }
        if (url.includes('/customers/1')) {
            return Promise.resolve({
                json: () => Promise.resolve({ id: 1, name: 'Name1', email: 'email1@test.com', password: 'pw1' })
            });
        }
        return Promise.resolve({
            json: () => Promise.resolve([])
        });
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('CustomerList component', () => {
    it('renders empty list', () => {
        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );
        expect(screen.getByText(/wizard list/i)).toBeInTheDocument();
        expect(screen.queryAllByRole('row')).toHaveLength(1); // Only header row
    });

    it('selects and deselects a customer', async () => {
        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} customers={customersMock.slice(0, 1)} />
            </MemoryRouter>
        );
        // Wait for the customer row to appear
        const row = await screen.findByText('Name1');
        const tr = row.closest('tr');
        fireEvent.click(tr);
        expect(tr).toHaveClass('selected');
        fireEvent.click(tr);
        expect(tr).not.toHaveClass('selected');
    });

    it('add customer redirects to add page', () => {
        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );
        const addBtn = screen.getByRole('button', { name: /add customer/i });
        fireEvent.click(addBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/add');
    });

    it('select customer and press cancel selection', async () => {
        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );
        // Wait for the customer row to appear
        const row = await screen.findByText('Name1');
        const tr = row.closest('tr');
        fireEvent.click(tr); // select
        expect(tr).toHaveClass('selected');
        const cancelBtn = screen.getByRole('button', { name: /cancel selection/i });
        fireEvent.click(cancelBtn); // deselect
        expect(tr).not.toHaveClass('selected');
    });

    it('pagination: more than ten customers, next and previous buttons', async () => {
        // Mock fetch for two pages
        global.fetch = vi.fn((url) => {
            if (url.includes('_page=1')) {
                return Promise.resolve({
                    json: () => Promise.resolve(
                        Array.from({ length: 10 }, (_, i) => ({
                            id: i + 1,
                            name: `Name${i + 1}`,
                            email: `email${i + 1}@test.com`,
                            password: `pw${i + 1}`,
                        }))
                    )
                });
            }
            if (url.includes('_page=2')) {
                return Promise.resolve({
                    json: () => Promise.resolve([
                        { id: 11, name: 'Name11', email: 'email11@test.com', password: 'pw11' },
                        { id: 12, name: 'Name12', email: 'email12@test.com', password: 'pw12' }
                    ])
                });
            }
            return Promise.resolve({ json: () => Promise.resolve([]) });
        });

        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );

        // Wait for first page customers
        await waitFor(() => {
            expect(screen.getByText('Name1')).toBeInTheDocument();
            expect(screen.getByText('Name10')).toBeInTheDocument();
        });

        const nextBtn = screen.getByRole('button', { name: /next 10/i });
        expect(nextBtn).not.toBeDisabled();

        fireEvent.click(nextBtn);

        // Wait for second page customers
        await waitFor(() => {
            expect(screen.getByText('Name11')).toBeInTheDocument();
            expect(screen.getByText('Name12')).toBeInTheDocument();
        });

        const prevBtn = screen.getByRole('button', { name: /previous 10/i });
        expect(prevBtn).not.toBeDisabled();

        fireEvent.click(prevBtn);

        // Wait for first page customers again
        await waitFor(() => {
            expect(screen.getByText('Name1')).toBeInTheDocument();
            expect(screen.getByText('Name10')).toBeInTheDocument();
        });
    });

    it('fetch customers after pagination', async () => {
        // Mock fetch for two pages and reset to first page on fetch
        global.fetch = vi.fn((url) => {
            if (url.includes('_page=2')) {
                return Promise.resolve({
                    json: () => Promise.resolve([
                        { id: 11, name: 'Name11', email: 'email11@test.com', password: 'pw11' },
                        { id: 12, name: 'Name12', email: 'email12@test.com', password: 'pw12' }
                    ])
                });
            }
            // Default to first page
            return Promise.resolve({
                json: () => Promise.resolve([
                    { id: 1, name: 'Name1', email: 'email1@test.com', password: 'pw1' },
                    { id: 2, name: 'Name2', email: 'email2@test.com', password: 'pw2' }
                ])
            });
        });

        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );

        // Go to next page
        const nextBtn = screen.getByRole('button', { name: /next 10/i });
        fireEvent.click(nextBtn);

        await waitFor(() => {
            expect(screen.getByText('Name11')).toBeInTheDocument();
            expect(screen.getByText('Name12')).toBeInTheDocument();
        });

        // Click fetch customers to reset to first page
        const fetchBtn = screen.getByRole('button', { name: /fetch customers/i });
        fireEvent.click(fetchBtn);

        await waitFor(() => {
            expect(screen.getByText('Name1')).toBeInTheDocument();
            expect(screen.getByText('Name2')).toBeInTheDocument();
        });
    });

    it('select customer and press edit (redirects to add page)', async () => {
        render(
            <MemoryRouter>
                <CustomerList setSelectedCustomer={vi.fn()} />
            </MemoryRouter>
        );
        // Wait for the customer row to appear
        const row = await screen.findByText('Name1');
        const tr = row.closest('tr');
        fireEvent.click(tr); // select customer
        const editBtn = screen.getByRole('button', { name: /edit customer/i });
        fireEvent.click(editBtn); // press edit
        expect(mockNavigate).toHaveBeenCalledWith('/update/1');
    });
});