import { useState } from "react";
import "./App.css";
import { ModeSelector, AssetSelector, ResultsCard, Header } from "./components";
import { Asset } from "./types/Asset";
import { GeoApiResponse, DroneRestrictionAttributes, PopulationDensityAttributes } from "./services/geoPortalService.types";
import { fetchDroneRestrictions, fetchPopulationDensity } from "./services/geoPortalService";


function App() {
  const [selectedMode, setSelectedMode] = useState<'drone' | 'population'>('drone');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [apiResults, setApiResults] = useState<GeoApiResponse<DroneRestrictionAttributes | PopulationDensityAttributes> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setAPIError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!selectedAsset) {
      console.warn("No asset selected.");
      return;
    }

    // Reset previous results
    setLoading(true);
    setAPIError(null);
    setApiResults(null);

    try {
      const longitude = parseFloat(selectedAsset.Longitude);
      const latitude = parseFloat(selectedAsset.Latitude);

      let data;
      if (selectedMode === 'drone') {
        data = await fetchDroneRestrictions(longitude, latitude);
      } else {
        data = await fetchPopulationDensity(longitude, latitude);
      }
      if (data.status) {
        setApiResults(data);
        setAPIError(`Error: ${data.detail} `);
      } else {
        setApiResults(data);
        console.log("API results:", data);
      }
    } catch (err: unknown) {
      console.error("API error:", err);
      setAPIError(`Failed to fetch data ${selectedMode}.`);
      setApiResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <ModeSelector selectedMode={selectedMode} onModeChange={setSelectedMode} />
        <AssetSelector onSelect={setSelectedAsset} />

        <button
          onClick={fetchData}
          disabled={loading || !selectedAsset}
          className={`mt-4 px-4 py-2 w-11/12 sm:w-2/5 mx-auto rounded ${loading || !selectedAsset ? 'bg-secondary cursor-not-allowed' : 'bg-primary text-white'}`}
        >
          {loading ? 'Loading...' : 'inspect'}
        </button>


        <ResultsCard results={apiResults} mode={selectedMode} error={apiError} />

      </div>
    </>
  );
}

export default App;