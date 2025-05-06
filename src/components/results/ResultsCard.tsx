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
                const restrictionText = attributes?.zone_restriction_en ?? 'N/A';

                return (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded text-left">
                        <h3 className="font-medium flex items-center">
                            {attributes?.zone_name_en ?? 'N/A'}
                        </h3>
                        <p>
                            <span className='font-semibold'>Restriction:</span>
                            {restrictionText}
                        </p>
                        {attributes?.zone_message_en && (
                            <p className="text-sm text-gray-600 mt-2">
                                <span className='font-semibold'>Message: </span>
                                {attributes.zone_message_en}
                            </p>
                        )}

                        {/* authority Info */}
                        {(attributes?.auth_name_en || attributes?.auth_contact || attributes?.auth_phone || attributes?.auth_email || attributes?.auth_url_en) && (
                            <div className="mt-3 text-sm text-gray-700">
                                <h4 className="font-semibold">Authority Info:</h4>
                                {attributes.auth_name_en?.map((name, idx) => <p key={idx}>Name: {name}</p>)}
                                {attributes.auth_contact?.map((contact, idx) => <p key={idx}>Contact: {contact}</p>)}
                                {attributes.auth_phone?.map((phone, idx) => <p key={idx}>Phone: {phone}</p>)}
                                {attributes.auth_email?.map((email, idx) => <p key={idx}>Email: {email}</p>)}
                                {attributes.auth_url_en?.map((url, idx) => <p key={idx}>URL: <a href={url} target="_blank" className="text-blue-600">{url}</a></p>)}
                            </div>
                        )}

                        {/* Time-Period Info */}
                        {(attributes?.time_permanent || attributes?.time_start || attributes?.time_end || attributes?.period_day || attributes?.period_start || attributes?.period_end) && (
                            <div className="mt-3 text-sm text-gray-700">
                                <h4 className="font-semibold">Time/Period:</h4>
                                {attributes.time_permanent && <p>Permanent: {attributes.time_permanent}</p>}
                                {attributes.time_start && <p>Start Time: {attributes.time_start}</p>}
                                {attributes.time_end && <p>End Time: {attributes.time_end}</p>}
                                {attributes.period_day && <p>Day Period: {attributes.period_day}</p>}
                                {attributes.period_start && <p>Period Start: {attributes.period_start}</p>}
                                {attributes.period_end && <p>Period End: {attributes.period_end}</p>}
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
}

function PopulationResults({ items }: { items: ResultItem<PopulationDensityAttributes>[] }) {
    const latestYearItems = items.filter(item =>
        item.attributes?.i_year === Math.max(...items.map(i => i.attributes?.i_year ?? 0)
        )
    );
    return (
        <div>
            {latestYearItems.map((item, index) => {
                const attributes = item.attributes as PopulationDensityAttributes | undefined;
                return (
                    <div key={index} className="mb-4 p-3 bg-gray-50 rounded text-left">
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
            <div className="my-4 p-4 border rounded w-3/4 mx-auto">
                <h2 className="text-lg font-medium mb-2">
                    {mode === 'drone' ? 'Drone Restrictions Results' : 'Population Density Results'}
                </h2>

                {mode === 'drone' && <DroneResults items={results.results as ResultItem<DroneRestrictionAttributes>[]} />}
                {mode === 'population' && <PopulationResults items={results.results as ResultItem<PopulationDensityAttributes>[]} />}
            </div>
        );
    }
}