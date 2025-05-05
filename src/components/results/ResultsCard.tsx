import { GeoApiResponse, DroneRestrictionAttributes, PopulationDensityAttributes, ResultItem } from '../../services/geoPortalService.types';

interface ResultsCardProps {
    results: GeoApiResponse<DroneRestrictionAttributes | PopulationDensityAttributes> | null;
    mode: 'drone' | 'population';
    error: string | null;
}
interface ResultsCardProps {
    results: GeoApiResponse<DroneRestrictionAttributes | PopulationDensityAttributes> | null;
    mode: 'drone' | 'population';
    error: string | null;
}

function DroneResults({ items }: { items: ResultItem<DroneRestrictionAttributes>[] }) {
    return (
        <div>
            {items.map((item, index) => {
                const attributes = item.attributes as DroneRestrictionAttributes | undefined;
                return (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
                        <h3 className="font-medium">{attributes?.zone_name_en ?? 'N/A'}</h3>
                        <p>{attributes?.zone_restriction_en ?? 'N/A'}</p>
                        <p className="text-sm text-gray-600 mt-2">{attributes?.zone_message_en ?? 'N/A'}</p>
                    </div>
                );
            })}
        </div>
    );
}

function PopulationResults({ items }: { items: ResultItem<PopulationDensityAttributes>[] }) {
    return (
        <div>
            {items.map((item, index) => {
                const attributes = item.attributes as PopulationDensityAttributes | undefined;
                return (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
                        <h3 className="font-medium">Population Data</h3>
                        <p>Count: {attributes?.number ?? 'N/A'}</p>
                        <p>Year: {attributes?.i_year ?? 'N/A'}</p>
                        <p className="text-sm text-gray-600 mt-1">Reliability Code: {attributes?.reli ?? 'N/A'}</p>
                    </div>
                );
            })}
        </div>
    );
}


export function ResultsCard({ results, mode, error }: ResultsCardProps) {
    console.log('ResultsCard', { results, mode, error });
    if (error) {
        return (
            <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error: {results?.detail ?? error}
            </div>
        );
    }
    if (!results) {
        return null;
    }
    if (results && results.results?.length === 0) {
        return <p>No specific data found for this location.</p>;
    }

    if (results.results && results.results.length > 0) {
        return (
            <div className="my-4 p-4 border rounded">
                <h2 className="text-lg font-medium mb-2">
                    {mode === 'drone' ? 'Drone Restrictions Results' : 'Population Density Results'}
                </h2>

                {mode === 'drone' && <DroneResults items={results.results as ResultItem<DroneRestrictionAttributes>[]} />}
                {mode === 'population' && <PopulationResults items={results.results as ResultItem<PopulationDensityAttributes>[]} />}
            </div>
        );
    }
}