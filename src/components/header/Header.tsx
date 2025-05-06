import { AxpoLogo } from "../icons/axpo_logo"

export function Header() {
    return (
        <header className="bg-gray-100 border-b-2 border-purple-600 py-4 px-8 flex justify-between items-center">
            <div className="flex flex-row w-80 items-center">
                <div className="w-16 shrink-0"><AxpoLogo className="h-12 w-12" /></div>
                <div className="ml-4 w-80 text-left  shrink-0">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">Axpo Asset Inspector</h1>
                    <p className="text-sm text-gray-600">Inspect asset data and geospatial information</p>
                </div>
            </div>

            {/* Language selection - not implemented*/}
            <div className="text-sm font-medium text-gray-600">
                <span className="font-bold text-orange-600">EN</span> | DE | FR | IT
            </div>
        </header>
    );
}
