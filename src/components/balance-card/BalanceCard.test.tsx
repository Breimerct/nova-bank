import { render, screen } from '@testing-library/react';
import BalanceCard from './BalanceCard';

describe('BalanceCard', () => {
  it('should render balance card with user data', () => {
    render(
      <BalanceCard
        titular="John Doe"
        balance={5000}
        currency="USD"
        isLoading={false}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('NovaBank')).toBeInTheDocument();
  });

  it('should display skeleton loaders when isLoading is true', () => {
    const { container } = render(
      <BalanceCard
        titular="John Doe"
        balance={5000}
        currency="USD"
        isLoading={true}
      />
    );

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should format currency correctly with es-CO locale', () => {
    render(
      <BalanceCard
        titular="Jane Smith"
        balance={1500.5}
        currency="EUR"
        isLoading={false}
      />
    );

    expect(screen.getByText(/1\.500,50/)).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('should hide skeleton when isLoading is false', () => {
    const { container } = render(
      <BalanceCard
        titular="John Doe"
        balance={5000}
        currency="USD"
        isLoading={false}
      />
    );

    const skeletons = container.querySelectorAll('[data-slot="skeleton"]');
    expect(skeletons.length).toBe(0);
  });
});
