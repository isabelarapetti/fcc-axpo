import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { readCSV } from "./csv-utils"; // Adjust path

global.fetch = vi.fn();

describe("readCSV", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return data when fetch is successful", async () => {
    const mockCsvContent = `ID;Name\n1;asset name test`;
    const mockFilePath = "/dummy.csv";

    // Mock fetch
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () => Promise.resolve(mockCsvContent),
    } as Response);

    const result = await readCSV(mockFilePath);

    // Expect
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(mockFilePath);

    // Expect values
    expect(result).toBeDefined();
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.headers.length).toBeGreaterThan(0);
  });

  it("should return empty data if fetch fails", async () => {
    const mockFilePath = "/dummy.csv";

    // Mock a errore response
    (fetch as Mock).mockRejectedValueOnce(new Error("Mocked test error"));

    const result = await readCSV(mockFilePath);

    // Expect
    expect(fetch).toHaveBeenCalledWith(mockFilePath);

    expect(result).toBeDefined();
    expect(result.data).toEqual([]);
    expect(result.headers).toEqual([]);
  });
});
