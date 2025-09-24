import { fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock useNavigate
const mockNavigate = vi.fn();
// Mock react-router-dom and useParams
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '1' }),
        useNavigate: () => mockNavigate,
        MemoryRouter: actual.MemoryRouter,
    };
});

import { MemoryRouter } from 'react-router-dom';
import Add from '../components/content/Add.jsx';

describe('Add component', () => {
    const mockSetSelectedCustomer = vi.fn();
    const highestCustomerId = 42;

    it('renders Add Wizard form by default', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={null}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        expect(screen.getByText(/Add Wizard/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add customer/i })).toBeInTheDocument();
    });

    it('renders Update Wizard form when selectedCustomer is provided and route param id is present', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={{ id: 1, name: 'Harry', email: 'harry@hogwarts.edu', password: 'magic' }}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/update wizard/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue('Harry')).toBeInTheDocument();
        expect(screen.getByDisplayValue('harry@hogwarts.edu')).toBeInTheDocument();
        expect(screen.getByDisplayValue('magic')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update customer/i })).toBeInTheDocument();
    });

    it('calls changeHandler when input changes', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={null}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'Hermione' } });
        expect(nameInput.value).toBe('Hermione');
    });

    it('disables DELETE and CANCEL buttons when adding a new customer', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={null}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        expect(screen.getByRole('button', { name: /delete customer/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
    });

    it('enables DELETE and CANCEL buttons when updating a customer', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={{ id: 1, name: 'Harry', email: 'harry@hogwarts.edu', password: 'magic' }}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        expect(screen.getByRole('button', { name: /delete customer/i })).not.toBeDisabled();
        expect(screen.getByRole('button', { name: /cancel/i })).not.toBeDisabled();
    });

    it('edits a customer', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={{ id: 1, name: 'Harry', email: 'harry@hogwarts.edu', password: 'magic' }}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        const nameInput = screen.getByLabelText(/name/i);
        fireEvent.change(nameInput, { target: { value: 'Hermione' } });
        expect(nameInput.value).toBe('Hermione');
        const updateBtn = screen.getByRole('button', { name: /update customer/i });
        expect(updateBtn).toBeInTheDocument();
        fireEvent.click(updateBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/list');
    });

    it('deletes a selected customer', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={{ id: 2, name: 'Ron', email: 'ron@hogwarts.edu', password: 'chess' }}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        const deleteBtn = screen.getByRole('button', { name: /delete customer/i });
        expect(deleteBtn).not.toBeDisabled();
        fireEvent.click(deleteBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/list');
    });

    it('adds a new customer', () => {
        render(
            <MemoryRouter>
                <Add
                    selectedCustomer={null}
                    setSelectedCustomer={mockSetSelectedCustomer}
                    highestCustomerId={highestCustomerId}
                />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Luna' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'luna@hogwarts.edu' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'spectrespecs' } });
        const addBtn = screen.getByRole('button', { name: /add customer/i });
        expect(addBtn).toBeInTheDocument();
        fireEvent.click(addBtn);
        expect(mockNavigate).toHaveBeenCalledWith('/list');
    });
});