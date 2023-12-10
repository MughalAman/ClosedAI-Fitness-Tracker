import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import { it } from 'vitest';

it("renders without crashing", () => {
  render(<App />)
  expect(screen.getByText('Fitness Tracker')).toBeInTheDocument()
})

it("should have login", () => {
  render(<App />)
  const message = screen.queryByText(/Login/i);
  expect(message).toBeVisible();
})