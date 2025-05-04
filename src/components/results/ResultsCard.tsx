import { GeoApiResponse, DroneRestrictionAttributes, PopulationDensityAttributes } from '../../services/geoPortalService.types';

interface ResultsCardProps {
    results: GeoApiResponse<DroneRestrictionAttributes | PopulationDensityAttributes> | null;
    error: string | null;
}

export function ResultsCard({ results, error }: ResultsCardProps) {

    if (error) {
        return (
            <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {error}
            </div>
        );
    }

    if (!results) {
        return (
            <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                No results available for theis asset.
            </div>
        );
    }

    if (results.status === 'error' && results.detail) {
        return (
            <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                API Error: {results.detail} (Code: {results.code})
            </div>
        );
    }

    return (
        <div className="my-4 p-4 border rounded">
            <h2 className="text-lg font-medium mb-2">API Results</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto max-h-60">
                {JSON.stringify(results, null, 2)}
            </pre>
        </div>
    );
}
