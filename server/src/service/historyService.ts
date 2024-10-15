import fs from 'fs/promises'; // Import the fs module for file operations
import { fileURLToPath } from 'url'; // Import fileURLToPath from url module
import path from 'path'; // Import path module to handle file paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// TODO: Define a City class with name and id properties
class City {
  constructor(public id: string, public name: string) {}
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string; // Declare filePath property

  constructor() {
    // Set the file path to the current directory plus the searchHistory.json filename
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8'); // Read file asynchronously
      return JSON.parse(data) as City[]; // Parse and return data as an array of City objects
    } catch (error) {
      console.error('Error reading search history:', error);
      return []; // Return an empty array in case of error
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2); // Convert cities array to JSON
      await fs.writeFile(this.filePath, data); // Write JSON to file asynchronously
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read(); // Simply call the read method to get cities
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read(); // Get current cities
    const newCity = new City((cities.length + 1).toString(), cityName); // Create a new City object
    cities.push(newCity); // Add the new city to the array
    await this.write(cities); // Save the updated array to the file
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read(); // Get current cities
    const updatedCities = cities.filter(city => city.id !== id); // Filter out the city with the specified id
    await this.write(updatedCities); // Save the updated array to the file
  }
}

export default new HistoryService();
