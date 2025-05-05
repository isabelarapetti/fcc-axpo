import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsCard } from './ResultsCard';
import { DroneRestrictionAttributes, GeoApiResponse, PopulationDensityAttributes } from '../../services/geoPortalService.types';

//prevent RTL/vistest or import types error
import '@testing-library/jest-dom/vitest';


test('Should display error message when error prop is not null', () => {
    const errorMessage = 'Test error message.';
    render(<ResultsCard results={null} mode="drone" error={errorMessage} />);
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
});

test('Should display API error message when response contains status error', () => {
    // Mock error
    const apiErrorResponse = {
        status: 'error',
        detail: 'API failed.',
        code: 500,
    };

    const resultsProp = apiErrorResponse as GeoApiResponse<DroneRestrictionAttributes>;

    render(<ResultsCard results={resultsProp} mode="drone" error={apiErrorResponse.detail} />);
    expect(screen.getByText('Error', { exact: false })).toBeInTheDocument();
});

test('Should display success results when results is a success response with population data', () => {
    // Mock success response with population results
    const successResponse = {
        results: [{ attributes: { number: 1234, i_year: 2020, reli: 1 } }],
    };

    const resultsProp = successResponse as GeoApiResponse<PopulationDensityAttributes>;

    render(<ResultsCard results={resultsProp} mode="population" error={null} />);

    expect(screen.getByText('Count: 1234')).toBeInTheDocument();
    expect(screen.getByText('Year: 2020')).toBeInTheDocument();
    expect(screen.getByText('Reliability Code: 1')).toBeInTheDocument();
});

test('Should display "No data found" when success response has empty results array', () => {
    // Mock success response with no results
    const emptySuccessResponse = { results: [] };
    const resultsProp = emptySuccessResponse as GeoApiResponse<DroneRestrictionAttributes>;
    render(<ResultsCard results={resultsProp} mode="drone" error={null} />);
    expect(screen.getByText('No specific data found for this location.')).toBeInTheDocument();
});

test('Should render nothing when results and error are null', () => {
    const { container } = render(<ResultsCard results={null} mode="drone" error={null} />);
    expect(container).toBeEmptyDOMElement();
});
