import { render, screen } from '@testing-library/react';
import TransferList from './TransferList';
import type { TransferType } from '@/types/transfer.type';

const mockTransfer: TransferType = {
  payeer: {
    name: 'John Doe',
    document: '12345678',
  },
  value: 100,
  currency: 'USD',
  date: new Date('2024-06-24T10:00:00Z'),
};

describe('TransferList', () => {
  it('should render transfer list with grouped transfers by date', () => {
    const transfersList = {
      '2024-06-24': [mockTransfer],
    };

    render(
      <TransferList
        transfersList={transfersList}
        isLoading={false}
      />
    );

    expect(screen.getByText('2024-06-24')).toBeInTheDocument();
  });

  it('should display loading state when isLoading is true', () => {
    const { container } = render(
      <TransferList
        transfersList={{}}
        isLoading={true}
      />
    );

    const loadingElement = container.querySelector('[class*="animate"]');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should show empty state when no transfers exist', () => {
    render(
      <TransferList
        transfersList={{}}
        isLoading={false}
      />
    );

    expect(screen.getByText(/No transfers to display/i)).toBeInTheDocument();
  });

  it('should render multiple transfer dates', () => {
    const transfersList = {
      '2024-06-24': [mockTransfer],
      '2024-06-23': [
        {
          ...mockTransfer,
          date: new Date('2024-06-23T10:00:00Z'),
        },
      ],
    };

    render(
      <TransferList
        transfersList={transfersList}
        isLoading={false}
      />
    );

    expect(screen.getByText('2024-06-24')).toBeInTheDocument();
    expect(screen.getByText('2024-06-23')).toBeInTheDocument();
  });
});
