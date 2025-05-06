import React, { useEffect, useState, useRef } from 'react';
import { readCSV } from '../../lib/csv-utils';
import { Asset } from '../../types/Asset';
import { CSVResult } from '../../types/CSVResult';

const ASSETS_FILEPATH = '/assets.csv';

interface AssetSelectorProps {
    onSelect: (asset: Asset | null) => void;
}

export function AssetSelector({ onSelect }: AssetSelectorProps) {
    const [csvData, setCsvData] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null); // Ref for the suggestions list to handle scrolling

    useEffect(() => {
        const loadCsvData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Read CSV data and initialize list
                const result: CSVResult<Asset> = await readCSV<Asset>(ASSETS_FILEPATH);
                setCsvData(result.data);
                // Show first 10 items as suggestions
                setFilteredAssets(result.data.slice(0, 20));
            } catch (err) {
                console.error("Error loading CSV data:", err);
                setError("Failed to load assets.");
            } finally {
                setIsLoading(false);
            }
        };
        loadCsvData();
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsListVisible(false);
                setHighlightedIndex(-1); // Reset highlighted index when closing
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [containerRef]);

    // Scrol through the list
    useEffect(() => {
        if (listRef.current && highlightedIndex !== -1) {
            const itemElement = listRef.current.children[highlightedIndex] as HTMLLIElement;
            if (itemElement) {
                itemElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex]);


    // Handle input change and filter
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        // Show list when typing
        setIsListVisible(true);
        // Reset highlighted item
        setHighlightedIndex(-1);

        if (value.length > 0) {
            const lowerCaseValue = value.toLowerCase();
            const filtered = csvData.filter(asset =>
                asset.ID.toLowerCase().includes(lowerCaseValue) ||
                asset.Name.toLowerCase().includes(lowerCaseValue) ||
                asset.Type.toLowerCase().includes(lowerCaseValue)
            );
            // limit suggestions
            setFilteredAssets(filtered.slice(0, 10));
        } else {
            // reset suggestions if input is empty
            setFilteredAssets(csvData.slice(0, 10));
        }
    };

    // Handle selecting an asset from the filtered list
    const handleAssetSelect = (asset: Asset) => {
        setInputValue(`${asset.ID} | ${asset.Name} | ${asset.Type}`);
        onSelect(asset);
        // Hide suggestions the list
        setIsListVisible(false);
        // clear filters
        setFilteredAssets([]);
        setHighlightedIndex(-1);
    };

    // Handle input focus
    const handleInputFocus = () => {
        setIsListVisible(true);
        // On focus, show initial list or current filtered list if input has value
        if (inputValue.length === 0) {
            setFilteredAssets(csvData.slice(0, 10));
        } else {
            // Re-filter based on current input value if list was hidden
            const lowerCaseValue = inputValue.toLowerCase();
            const filtered = csvData.filter(asset =>
                asset.ID.toLowerCase().includes(lowerCaseValue) ||
                asset.Name.toLowerCase().includes(lowerCaseValue) ||
                asset.Type.toLowerCase().includes(lowerCaseValue)
            );
            setFilteredAssets(filtered.slice(0, 20));
        }
        setHighlightedIndex(-1); // Reset highlight on focus
    };


    if (isLoading) {
        return <div className="my-4 w-11/12 sm:w-2/5 mx-auto"><p className="text-gray-700">Loading assets...</p></div>;
    }

    if (error) {
        return <div className="my-4 w-11/12 sm:w-2/5 mx-auto"><p className="text-red-600">Error loading assets: {error}</p></div>;
    }

    return (
        // Main container
        <div className="my-4 relative w-11/12 sm:w-2/5 mx-auto text-left">
            <label htmlFor="asset-search" className="block font-medium text-gray-700 mb-1 text-center">Select Asset:</label>
            <input
                id="asset-search"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Search or select an asset..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                disabled={csvData.length === 0} />

            {/* Autocomplete */}
            {isListVisible && filteredAssets.length > 0 && (
                <ul
                    id="asset-suggestions-list"
                    ref={listRef}
                    className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto"

                >
                    {filteredAssets.map((asset, index) => (
                        <li
                            key={asset.ID}
                            id={`asset-item-${index}`}
                            className={`px-3 py-2 cursor-pointer text-sm ${index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                            onClick={() => handleAssetSelect(asset)}
                            aria-selected={index === highlightedIndex}
                        >
                            {`${asset.ID} | ${asset.Name} | ${asset.Type}`}
                        </li>
                    ))}
                </ul>
            )}

            {csvData.length === 0 && !isLoading && !error && <p className="text-sm text-gray-500 mt-1 text-center">No assets available.</p>}
        </div>
    );
}
