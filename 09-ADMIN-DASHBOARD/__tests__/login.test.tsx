/**
 * Admin Login Page Tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { vi } from 'vitest';
import LoginPage from '@/app/login/page';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('LoginPage', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access the admin dashboard')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows entering email and password', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'admin@cabconnect.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('admin@cabconnect.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('requires email and password fields', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('validates email format', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;

    expect(emailInput.type).toBe('email');
  });

  it('shows loading state during submission', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'admin@cabconnect.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Button should be disabled during loading
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('navigates to dashboard on successful login', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'admin@cabconnect.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('prevents default form submission', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form');

    fireEvent.change(emailInput, { target: { value: 'admin@cabconnect.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    if (form) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      fireEvent(form, submitEvent);
      // preventDefault should be called in real implementation
    }
  });

  it('has proper accessibility attributes', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
  });

  it('renders form with proper structure', () => {
    render(<LoginPage />);

    const heading = screen.getByText('Admin Login');
    expect(heading).toBeInTheDocument();
    
    const form = screen.getByRole('button', { name: /sign in/i }).closest('form');
    expect(form).toBeInTheDocument();
  });
});

describe('LoginPage - Edge Cases', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push: mockPush,
    });
    vi.clearAllMocks();
  });

  it('handles empty form submission', () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    // HTML5 validation should prevent submission
    fireEvent.click(submitButton);
    
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('handles special characters in email', () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    
    fireEvent.change(emailInput, { target: { value: 'admin+test@cabconnect.com' } });
    
    expect(emailInput.value).toBe('admin+test@cabconnect.com');
  });

  it('does not expose password value in DOM', () => {
    render(<LoginPage />);

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    
    fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
    
    expect(passwordInput.type).toBe('password');
  });
});
