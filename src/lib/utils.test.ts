import {
  cn,
  groupTransfersByDate,
  formatCurrency,
  extractInitials,
  extractMessageError,
} from './utils';
import type { TransferType } from '@/types/transfer.type';

describe('Utils', () => {
  describe('cn', () => {
    it('should merge classnames correctly', () => {
      const result = cn('px-2 py-1', 'px-4');
      expect(result).toContain('py-1');
      expect(result).toContain('px-4');
      expect(result).not.toContain('px-2');
    });

    it('should handle conditional classnames', () => {
      const result = cn('base', true && 'active', false && 'inactive');
      expect(result).toContain('base');
      expect(result).toContain('active');
      expect(result).not.toContain('inactive');
    });
  });

  describe('groupTransfersByDate', () => {
    it('should group transfers by date', () => {
      const transfers: TransferType[] = [
        {
          value: 100,
          currency: 'USD',
          date: new Date('2024-06-24'),
          payeer: { name: 'John', document: '123' },
        },
        {
          value: 200,
          currency: 'USD',
          date: new Date('2024-06-24'),
          payeer: { name: 'Jane', document: '456' },
        },
        {
          value: 150,
          currency: 'USD',
          date: new Date('2024-06-23'),
          payeer: { name: 'Bob', document: '789' },
        },
      ];

      const grouped = groupTransfersByDate(transfers);

      expect(grouped['2024-06-24']).toHaveLength(2);
      expect(grouped['2024-06-23']).toHaveLength(1);
    });

    it('should handle empty array', () => {
      const grouped = groupTransfersByDate([]);
      expect(grouped).toEqual({});
    });

    it('should handle Date objects', () => {
      const transfers: TransferType[] = [
        {
          value: 100,
          currency: 'USD',
          date: new Date('2024-06-24'),
          payeer: { name: 'John', document: '123' },
        },
      ];

      const grouped = groupTransfersByDate(transfers);
      expect(Object.keys(grouped)).toContain('2024-06-24');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency with es-CO locale by default', () => {
      const result = formatCurrency(1000);
      expect(result).toBeDefined();
      expect(result).not.toBe('0');
    });

    it('should handle zero value', () => {
      expect(formatCurrency(0)).toBe('0');
    });

    it('should format decimal values correctly with es-CO locale', () => {
      const result = formatCurrency(1500.5);
      expect(result).toContain('50');
    });

    it('should format with custom locale', () => {
      const result = formatCurrency(1000, 'en-US');
      expect(result).toBeDefined();
    });
  });

  describe('extractInitials', () => {
    it('should extract initials from full name', () => {
      expect(extractInitials('John Doe')).toBe('JD');
    });

    it('should return N/A for empty string', () => {
      expect(extractInitials('')).toBe('N/A');
    });

    it('should convert to uppercase', () => {
      expect(extractInitials('john doe')).toBe('JD');
    });

    it('should handle multiple word names', () => {
      expect(extractInitials('Juan Carlos Rodriguez')).toBe('JC');
    });
  });

  describe('extractMessageError', () => {
    it('should extract string error', () => {
      expect(extractMessageError('Error message')).toBe('Error message');
    });

    it('should extract Error object message', () => {
      const error = new Error('Test error');
      expect(extractMessageError(error)).toBe('Test error');
    });

    it('should return unknown error for unknown type', () => {
      expect(extractMessageError({})).toBe('Unknown error');
    });

    it('should handle null/undefined', () => {
      expect(extractMessageError(null)).toBe('Unknown error');
      expect(extractMessageError(undefined)).toBe('Unknown error');
    });
  });
});
