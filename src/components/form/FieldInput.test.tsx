import { render, screen } from '@testing-library/react';
import { FieldInput } from './FieldInput';

describe('FieldInput', () => {
  it('should render input with label', () => {
    render(
      <FieldInput
        label="Email"
        id="email"
        placeholder="Enter email"
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('should display error message when provided', () => {
    render(
      <FieldInput
        label="Email"
        id="email"
        errorMessage="Email is required"
      />
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <FieldInput
        label="Email"
        id="email"
        disabled={true}
      />
    );

    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('should have aria-invalid when error message is present', () => {
    render(
      <FieldInput
        label="Email"
        id="email"
        errorMessage="Invalid email"
      />
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should accept type attribute correctly', () => {
    render(
      <FieldInput
        type="email"
        label="Email"
        id="email"
      />
    );

    const input = screen.getByLabelText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });
});
