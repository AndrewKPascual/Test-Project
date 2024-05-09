import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
  test('renders UserProfile component and checks for form elements', () => {
    render(<UserProfile />);
    expect(screen.getByLabelText(/health goals/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dietary preferences/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save profile/i })).toBeInTheDocument();
  });

  test('allows user to input and submit form', async () => {
    render(<UserProfile />);
    fireEvent.change(screen.getByLabelText(/health goals/i), { target: { value: 'Run 5km daily' } });
    fireEvent.change(screen.getByLabelText(/dietary preferences/i), { target: { value: 'Vegetarian' } });
    fireEvent.click(screen.getByRole('button', { name: /save profile/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/health goals/i)).toHaveValue('Run 5km daily');
      expect(screen.getByLabelText(/dietary preferences/i)).toHaveValue('Vegetarian');
    });
  });

  test('submits the form and handles success response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Profile updated successfully!' }),
      })
    );

    render(<UserProfile />);
    fireEvent.change(screen.getByLabelText(/health goals/i), { target: { value: 'Run 5km daily' } });
    fireEvent.change(screen.getByLabelText(/dietary preferences/i), { target: { value: 'Vegetarian' } });
    fireEvent.click(screen.getByRole('button', { name: /save profile/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/profile updated successfully!/i)).toBeInTheDocument();
    });
  });

  test('submits the form and handles error response', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    render(<UserProfile />);
    fireEvent.change(screen.getByLabelText(/health goals/i), { target: { value: 'Run 5km daily' } });
    fireEvent.change(screen.getByLabelText(/dietary preferences/i), { target: { value: 'Vegetarian' } });
    fireEvent.click(screen.getByRole('button', { name: /save profile/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/an error occurred while updating the profile./i)).toBeInTheDocument();
    });
  });
});
