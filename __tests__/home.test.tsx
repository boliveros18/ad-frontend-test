import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

jest.mock('@/components/layouts/Layout', () => ({
  Layout: ({ children }: never) => <div>{children}</div>,
}));

jest.mock('@/components/Header', () => ({
  Header: () => <h1>Welcome</h1>,
}));

jest.mock('@/components/ui/FilterUi', () => ({
  FilterUi: () => <button>Filter</button>,
}));

jest.mock('@/components/ItemsContainer', () => ({
  ItemsContainer: () => <div>No items</div>,
}));

describe('Home Page', () => {
  it('renders Header, FilterUi, and ItemsContainer', () => {
    render(<Home />);

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Filter')).toBeInTheDocument();
    expect(screen.getByText('No items')).toBeInTheDocument();
  });
});
