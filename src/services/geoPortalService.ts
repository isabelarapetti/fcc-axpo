import {
  GeoApiResponse,
  DroneRestrictionAttributes,
  PopulationDensityAttributes
} from "./geoPortalService.types";

export async function fetchDroneRestrictions(
  longitude: number,
  latitude: number
) {
  try {
    const url = `https://api3.geo.admin.ch/rest/services/api/MapServer/identify?layers=all:ch.bazl.einschraenkungen-drohnen&geometryType=esriGeometryPoint&sr=4326&lang=en&returnGeometry=false&tolerance=0&geometry={"x": ${longitude},"y": ${latitude}}`;
    console.log("Fetching drone restrictions from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error("API  failed:", response.status, response.statusText);
      throw new Error(`API error: ${response.statusText}`);
    }
    return (await response.json()) as GeoApiResponse<DroneRestrictionAttributes>;
  } catch (error) {
    console.error("Error fetching drone restrictions:", error);
    throw error;
  }
}

export async function fetchPopulationDensity(
  longitude: number,
  latitude: number
) {
  try {
    const url = `https://api3.geo.admin.ch/rest/services/api/MapServer/identify?layers=all:ch.bfs.volkszaehlung-bevoelkerungsstatistik_einwohner&geometryType=esriGeometryPoint&sr=4326&lang=en&returnGeometry=true&tolerance=0&geometry={"x": ${longitude},"y": ${latitude}}`;
    console.log("Fetching drone restrictions from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error("API fetch failed:", response.status, response.statusText);
      throw new Error(`API error: ${response.statusText}`);
    }
    return await response.json() as GeoApiResponse<PopulationDensityAttributes>;
  } catch (error) {
    console.error("Error fetching population density:", error);
    throw error;
  }
}
