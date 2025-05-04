import React, { useEffect, useState } from 'react';
import { readCSV } from '../../lib/csv-utils';
import { Asset } from '../../types/Asset';
import { CSVResult } from '../../types/CSVResult';

const ASSETS_FILEPATH = import.meta.env.REACT_APP_ASSETS_FILEPATH || '/assets.csv';

interface AssetSelectorProps {
    onSelect: (asset: Asset | null) => void;
}

export function AssetSelector({ onSelect }: AssetSelectorProps) {
    const [csvData, setCsvData] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        const loadCsvData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const result: CSVResult<Asset> = await readCSV<Asset>(ASSETS_FILEPATH);
                setCsvData(result.data);
            } catch (err) {
                console.error("Error loading CSV data:", err);
                setError("Failed to load assets.");
            } finally {
                setIsLoading(false);
            }
        };
        loadCsvData();
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedValue(selectedId);

        // search
        const selectedAsset = csvData.find(asset => asset.ID === selectedId);

        onSelect(selectedAsset || null);
    };


    if (isLoading) {
        return <div className="my-4"><p>Loading assets...</p></div>;
    }

    if (error) {
        return <div className="my-4"><p style={{ color: 'red' }}>Error loading assets: {error}</p></div>;
    }

    return (
        <div className="my-4">
            <label htmlFor="asset-select" className="block text-sm font-medium text-gray-700 mb-1">Select Asset:</label>
            <select
                id="asset-select"
                value={selectedValue}
                onChange={handleSelectChange}
                disabled={csvData.length === 0}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                <option value="">-- Select an asset --</option>
                {csvData.map((asset) => (
                    <option key={asset.ID} value={asset.ID}>
                        {`${asset.ID} | ${asset.Name} | ${asset.Type}`}
                    </option>
                ))}
            </select>
            {csvData.length === 0 && <p className="text-sm text-gray-500 mt-1">No assets available.</p>}
        </div>
    );
}
