import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TrustModal } from './TrustModal';

describe('TrustModal', () => {
  it('is hidden when closed', () => {
    const { container } = render(<TrustModal state="closed" onClose={() => {}} onRetry={() => {}} />);
    const modal = container.querySelector('.modal');
    expect(modal).toBeNull();
  });

  it('shows pairing state with spinner when pairing', () => {
    render(<TrustModal state="pairing" onClose={() => {}} onRetry={() => {}} />);
    expect(screen.getByText('Continue on Your Device')).toBeInTheDocument();
    expect(screen.getByText('Waiting for device…')).toBeInTheDocument();
  });

  it('shows pending state with retry and close actions', async () => {
    const onClose = vi.fn();
    const onRetry = vi.fn();
    render(<TrustModal state="pending" onClose={onClose} onRetry={onRetry} />);
    expect(screen.getByText('Trust This Device')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'I Trusted This Device' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows success state with Continue button when paired', async () => {
    const onClose = vi.fn();
    render(<TrustModal state="paired" onClose={onClose} onRetry={() => {}} />);
    expect(screen.getByText('Device Paired')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Continue' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
