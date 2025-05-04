interface ModeSelectorProps {
    selectedMode: 'drone' | 'population';
    onModeChange: (mode: 'drone' | 'population') => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
    return (
        <div className="my-4">
            <h2 className="text-lg font-medium mb-2">Select Mode</h2>
            <div className="flex gap-4">
                <button
                    className={`px-4 py-2 rounded ${selectedMode === 'drone' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => onModeChange('drone')}
                >
                    Drone Restrictions
                </button>
                <button
                    className={`ml-2 px-4 py-2 rounded ${selectedMode === 'population' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => onModeChange('population')}
                >
                    Population Density
                </button>
            </div>
        </div>
    );
}
