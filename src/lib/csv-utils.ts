import { CSVResult } from "../types/CSVResult";

export async function readCSV<T>(filePath: string): Promise<CSVResult<T>> {
  try {
    const response = await fetch(filePath);
    const csvText = await response.text();

    const [headerLine, ...lines] = csvText.trim().split("\n");
    const headers = headerLine.split(";").map((header) => header.trim());

    const data = lines.map((line) => {
      const values = line.split(";").map((value) => value.trim());
      const row: T = {} as T;

      headers.forEach((header, index) => {
        (row as Partial<T>)[header as keyof T] = values[index] as T[keyof T];
      });

      return row;
    });

    return { headers, data };
  } catch (error) {
    console.error("Error reading CSV:", error);
    return { headers: [], data: [] };
  }
}
