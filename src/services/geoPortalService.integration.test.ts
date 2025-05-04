// services/geoportal/geoportal.integration.test.ts

// These are integration tests that hit the actual external API.
// They are useful for checking connectivity but are slower and less reliable than unit tests.

import { describe, it, expect } from "vitest";
// Import the actual functions (no mocking fetch in this file)
import {
  fetchDroneRestrictions,
  fetchPopulationDensity,
} from "./geoPortalService";

// Define known coordinates that should ideally return some data or a specific response type
const knownTestLongitude = 8.56383; // Example coordinates near Zurich
const knownTestLatitude = 47.45531;

// Use a separate describe block for integration tests
describe("GeoPortal Service Integration Tests", () => {
  // Increase the timeout for these tests as they make real network calls
  // Default timeout in Vitest is 5000ms (5 seconds)
  // You might need to adjust this based on typical API response times
  it("fetchDroneRestrictions should connect to the real API and return a valid structure", async () => {
    try {
      const response = await fetchDroneRestrictions(
        knownTestLongitude,
        knownTestLatitude
      );

      console.log("Integration test response drone:", response); // Log the response for debugging
      // Assert that the call did not throw an error
      expect(response).toBeDefined();

      // Assert the response has at least one of the expected top-level properties
      // (e.g., 'results' for success or 'status' for a likely API-level error response)
      // This checks that the API responded with *something* that matches your GeoApiResponse shape
      expect(response).toHaveProperty("results");

      //Optional: Check if it looks like a success response and has results
      if ("results" in response && response.results !== undefined) {
        expect(response.results).toBeInstanceOf(Array);
        // If results are expected, you could check for minimum length or item structure
        // expect(response.results.length).toBeGreaterThan(0); // Only if data is guaranteed
      } else if ("status" in response && response.status === "error") {
        // Optional: Check if it looks like a specific API error format
        expect(response).toHaveProperty("detail");
        expect(response).toHaveProperty("code");
      }
    } catch (error) {
      // If fetch itself throws (e.g., network error, DNS issue), the test will fail here
      // This is intended - it tests real-world connectivity
      console.error("Integration test failed:", error);
      throw error; // Re-throw to fail the test
    }
  }, 10000); // Set a higher timeout (e.g., 10 seconds)

  // Add a similar test for fetchPopulationDensity
  it("fetchPopulationDensity should connect to the real API and return a valid structure", async () => {
    try {
      const response = await fetchPopulationDensity(
        knownTestLongitude,
        knownTestLatitude
      );
      console.log("Integration test response pop:", response); // Log the response for debugging
      expect(response).toBeDefined();
      expect(response).toHaveProperty("results"); // Check for success structure
    } catch (error) {
      console.error("Population Integration test failed:", error);
      throw error;
    }
  }, 10000); // Set a higher timeout
});
