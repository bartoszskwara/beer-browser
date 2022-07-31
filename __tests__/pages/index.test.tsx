import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'
import '@testing-library/jest-dom'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

describe('Home', () => {
    it('renders a beer', () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <Home beers={[{ id: 1, name: 'Custom Beer', tagline: 'Very cool beer' }]}/>
            </QueryClientProvider>
        );

        const name = screen.getByText('Custom Beer');
        const tagline = screen.getByText('Very cool beer');

        expect(name).toBeInTheDocument()
        expect(tagline).toBeInTheDocument()
    })
})