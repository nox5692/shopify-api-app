import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

// Testing the Button component

describe('Button', () => {
    // Checks that when the url attribute is provided, button renders the anchor tag
    it('renders anchor if url is provided', () => {
        render(<Button size='small' url='https://example.com'>text</Button>);

        const anchor = screen.getByRole('link', { name: 'text' });
        expect(anchor).toBeInTheDocument();
    })

    // Checks that when the url attribute is NOT provided, button renders without the anchor tag
    it('does not renders anchor if url is provided', () => {
        render(<Button size='small'>text</Button>);

        const anchor = screen.queryByRole('link');
        expect(anchor).toBeNull();
    })

    // Checks that when <button></button> is the parent element tag
    it('renders button tag as the container tag', () => {
        render(<Button size='small'>hello</Button>);
        const button = screen.getByRole('button', { name: 'hello' })
        expect(button).toBeInTheDocument();
    })
})