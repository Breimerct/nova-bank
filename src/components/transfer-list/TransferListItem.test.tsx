import { render, screen } from '@testing-library/react';
import TransferListItem from './TransferListItem';
import type { TransferType } from '@/types/transfer.type';

const mockTransfer: TransferType = {
  payeer: {
    name: 'John Doe',
    document: '12345678',
  },
  value: 100,
  currency: 'USD',
  date: new Date('2024-06-24T10:30:00Z'),
};

describe('TransferListItem', () => {
  it('should render transfer payee name', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should display payee document', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    expect(screen.getByText(/DNI\. 12345678/)).toBeInTheDocument();
  });

  it('should show transfer currency', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    expect(screen.getByText(/USD/)).toBeInTheDocument();
  });

  it('should render transfer date', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    const timeElement = screen.getByText(/Jun 24 2024/);
    expect(timeElement.tagName).toBe('TIME');
  });

  it('should display avatar with initials', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should display transfer value correctly', () => {
    render(<TransferListItem transfer={mockTransfer} />);

    const container = screen.getByText('JD').closest('li');
    expect(container).toBeInTheDocument();
  });
});
