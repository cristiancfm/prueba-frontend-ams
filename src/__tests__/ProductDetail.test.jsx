import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductDetail from '../pages/ProductDetail.jsx';
import * as productService from '../services/productService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock CartContext
const mockUpdateCartItems = vi.fn();
vi.mock('../context/CartContext.jsx', () => ({
    useCart: () => ({ updateCartItems: mockUpdateCartItems })
}));

describe('ProductDetail', () => {
    const mockProduct = {
        id: 1,
        brand: 'Apple',
        model: 'iPhone 13',
        price: 999,
        imgUrl: 'test.jpg',
        options: {
            colors: [{ code: 'red', name: 'Red' }, { code: 'blue', name: 'Blue' }],
            storages: [{ code: '64', name: '64GB' }, { code: '128', name: '128GB' }]
        }
    };

    beforeEach(() => {
        vi.spyOn(productService, 'getProduct').mockResolvedValue(mockProduct);
        vi.spyOn(productService, 'addProductToCart').mockResolvedValue({ count: 1 });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders loading initially and then product details', async () => {
        render(
            <MemoryRouter initialEntries={['/products/1']}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText(/Apple iPhone 13/i)).toBeInTheDocument());

        expect(screen.getByText(/€ 999/i)).toBeInTheDocument();

        expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/storage/i)).toBeInTheDocument();
    });

    it('allows selecting color and storage and adding to cart', async () => {
        render(
            <MemoryRouter initialEntries={['/products/1']}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText(/Apple iPhone 13/i)).toBeInTheDocument());

        const colorSelect = screen.getByLabelText(/color/i);
        const storageSelect = screen.getByLabelText(/storage/i);
        const addButton = screen.getByRole('button', { name: /add to cart/i });

        // Button should be disabled initially
        expect(addButton).toBeDisabled();

        await userEvent.click(colorSelect);
        const redOption = await waitFor(() => screen.getByRole('option', { name: 'Red' }));
        await userEvent.click(redOption);

        await userEvent.click(storageSelect);
        const storageOption = await waitFor(() => screen.getByRole('option', { name: '64GB' }));
        await userEvent.click(storageOption);

        // Button should be enabled after selections
        expect(addButton).toBeEnabled();

        fireEvent.click(addButton);

        await waitFor(() => {
            expect(productService.addProductToCart).toHaveBeenCalledWith(1, 'red', '64');
            expect(mockUpdateCartItems).toHaveBeenCalledWith(1);
        });
    });
});
