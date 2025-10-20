import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductList from '../pages/ProductList.jsx';
import * as productService from '../services/productService.js';
import '@testing-library/jest-dom';
import {MemoryRouter} from "react-router-dom";

// Mock ProductCard to simplify tests
vi.mock('../components/ProductCard.jsx', () => ({
    default: ({ product }) => <div data-testid="product-card">{product.model}</div>,
}));

describe('ProductList', () => {
    const mockProducts = [
        { id: 1, brand: 'Apple', model: 'iPhone 13' },
        { id: 2, brand: 'Samsung', model: 'Galaxy S21' },
        { id: 3, brand: 'Google', model: 'Pixel 6' },
    ];

    beforeEach(() => {
        // Mock getProducts function
        vi.spyOn(productService, 'getProducts').mockResolvedValue(mockProducts);
    });

    it('renders loading state initially', async () => {
        render(
            <MemoryRouter>
                <ProductList />
            </MemoryRouter>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        await waitFor(() => expect(productService.getProducts).toHaveBeenCalled());
    });

    it('renders products after loading', async () => {
        render(
            <MemoryRouter>
                <ProductList />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(3));
    });

    it('filters products based on search input', async () => {
        render(
            <MemoryRouter>
                <ProductList />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(3));

        const input = screen.getByLabelText(/search/i);
        fireEvent.change(input, { target: { value: 'Apple' } });

        // Wait for debounce
        await waitFor(() => {
            expect(screen.getAllByTestId('product-card')).toHaveLength(1);
            expect(screen.getByText(/iPhone 13/i)).toBeInTheDocument();
        });
    });

    it('shows all products if search is cleared', async () => {
        render(
            <MemoryRouter>
                <ProductList />
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(3));

        const input = screen.getByLabelText(/search/i);
        fireEvent.change(input, { target: { value: 'Apple' } });
        await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(1));

        fireEvent.change(input, { target: { value: '' } });
        await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(3));
    });
});
