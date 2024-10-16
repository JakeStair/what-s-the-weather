// Import necessary dependencies
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Ensure node-fetch is installed
dotenv.config(); // Load environment variables from .env

// Define interface for coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class to represent weather data
class Weather {
  constructor(
    public temperature: number,
    public description: string,
    public icon: string
  ) {}
}

// Define the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.OPENWEATHER_API_KEY || '';

  constructor() {
    if (!this.apiKey) {
      throw new Error('API key for OpenWeather is missing. Set it in the .env file.');
    }
  }

  // Fetch coordinates from the OpenWeather API
  private async fetchLocationData(city: string): Promise<Coordinates> {
    const url = `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error(`City "${city}" not found.`);
    }
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return this.extractCoordinates(data);
  }

  // Extract coordinates from the API response
  private extractCoordinates(data: any): Coordinates {
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }

  // Build the weather query URL using coordinates
  private buildWeatherQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
  }

  // Fetch weather data using the coordinates
  private async fetchWeatherData(coords: Coordinates): Promise<Weather> {
    const url = this.buildWeatherQuery(coords);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const data = await response.json();
    return this.parseWeatherData(data);
  }

  // Parse the weather data into a Weather object
  private parseWeatherData(data: any): Weather {
    return new Weather(
      data.main.temp,
      data.weather[0].description,
      data.weather[0].icon
    );
  }

  // Main method to get weather data for a city
  public async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coords = await this.fetchLocationData(city);
      return await this.fetchWeatherData(coords);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      throw new Error('Failed to retrieve weather data.');
    }
  }
}

// Export the WeatherService instance
export default new WeatherService();
