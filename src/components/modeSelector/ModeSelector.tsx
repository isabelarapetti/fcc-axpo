import { Button } from '@headlessui/react';
import { DroneIcon } from '../icons/drone_icon';
import { DensityIcon } from '../icons/density_icon';

interface ModeSelectorProps {
    selectedMode: 'drone' | 'population';
    onModeChange: (mode: 'drone' | 'population') => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
    return (
        <div className="my-4 w-full max-w-sm mx-auto">
            <h2 className="text-lg font-medium text-gray-800 mb-2 text-center">Select Mode</h2>
            <div className="flex justify-center gap-4">
                {/* Drone Restrictions mode */}
                <Button
                    className={`
                        group flex flex-col items-center justify-center
                        px-4 py-3 rounded-md
                        ${selectedMode === 'drone'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }
                    `}
                    onClick={() => onModeChange('drone')}
                >
                    <span className="text-sm font-medium mb-1">Drone Restrictions</span>
                    <DroneIcon className={`h-8 w-8 ${selectedMode === 'drone' ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}`} />
                </Button>

                {/* Population Density mode */}
                <Button
                    className={`
                        group flex flex-col items-center justify-center
                        px-4 py-3 rounded-md
                        ${selectedMode === 'population'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }
                    `}
                    onClick={() => onModeChange('population')}
                >
                    <span className="text-sm font-medium mb-1">Population Density</span>
                    <DensityIcon className={`h-8 w-8 ${selectedMode === 'population' ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'}`} />
                </Button>
            </div>
        </div>
    );
}
