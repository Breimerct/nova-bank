import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

// Mock useAuthStore
jest.mock('@/stores/auth/auth.store', () => ({
  useAuthStore: () => ({
    login: jest.fn(),
    loadingLogin: false,
    user: null,
    logout: jest.fn(),
    setUser: jest.fn(),
  }),
}));

describe('LoginForm', () => {
  it('should render email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render login button', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show login text when not loading', () => {
    render(<LoginForm />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
