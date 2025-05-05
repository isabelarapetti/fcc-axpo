import { expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModeSelector } from "./ModeSelector";
//prevent RTL/vistest or import types error
import '@testing-library/jest-dom/vitest'


test('ModeSelector should render buttons and call onModeChange on click', () => {

  const mockOnModeChange = vi.fn();

  // initialize
  const selectedMode = 'drone';
  render(<ModeSelector selectedMode={selectedMode} onModeChange={mockOnModeChange} />);

  // Find buttons
  const droneButton = screen.getByText('Drone Restrictions');
  const populationButton = screen.getByText('Population Density');

  // Assert if rendered
  expect(droneButton).toBeInTheDocument();
  expect(populationButton).toBeInTheDocument();

  // Change mode
  fireEvent.click(populationButton);

  // Assert mode changes
  expect(mockOnModeChange).toHaveBeenCalledTimes(1);
  expect(mockOnModeChange).toHaveBeenCalledWith('population');

  // Change mode again
  fireEvent.click(droneButton);

  // Assert mode changes
  expect(mockOnModeChange).toHaveBeenCalledTimes(2);
  expect(mockOnModeChange).toHaveBeenCalledWith('drone');
});