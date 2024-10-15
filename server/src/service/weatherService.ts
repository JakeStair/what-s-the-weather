import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import fetch for making API requests
// import { City } from './historyService.js'; // Assuming City is defined in historyService.ts

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public temperature: number,
    public description: string,
    public icon: string
  ) {}
}

// TODO: Complete the WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.OPENWEATHER_API_KEY || ''; // Get API key from environment variables

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await fetch(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return this.destructureLocationData(data); // Call the method to destructure location data
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon,
    };
  }

  // Removed unused buildGeocodeQuery method

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(city);
    return locationData; // Return the destructured coordinates
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return this.parseCurrentWeather(data); // Parse and return the current weather
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.weather[0].description,
      response.weather[0].icon
    );
  }

  // TODO: Complete buildForecastArray method
  // private _buildForecastArray(_currentWeather: Weather, weatherData: any[]): Weather[] {
  //   return weatherData.map((item: any) => {
  //     return new Weather(
  //       item.main.temp,
  //       item.weather[0].description,
  //       item.weather[0].icon
  //     );
  //   });
  // }
  

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    const coordinates = await this.fetchAndDestructureLocationData(city); // Get coordinates for the city
    return await this.fetchWeatherData(coordinates); // Fetch and return the weather data
  }
}

export default new WeatherService();
