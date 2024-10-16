import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public temperature: number,
    public description: string,
    public icon: string
  ) {}
}

class WeatherService {
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';

  constructor() {
    if (!this.apiKey) {
      throw new Error('API key for OpenWeather is missing. Set it in the .env file.');
    }
    console.log('Base URL:', this.baseURL);
  }

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const url = `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    console.log('Fetching location data from:', url); // Log the URL being fetched
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

  private extractCoordinates(data: any): Coordinates {
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }

  private buildWeatherQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
  }

  private async fetchWeatherData(coords: Coordinates): Promise<Weather> {
    const url = this.buildWeatherQuery(coords);
    console.log('Fetching weather data from:', url); // Log the URL being fetched
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const data = await response.json();
    return this.parseWeatherData(data);
  }

  private parseWeatherData(data: any): Weather {
    return new Weather(
      data.main.temp,
      data.weather[0].description,
      data.weather[0].icon
    );
  }

  public async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coords = await this.fetchLocationData(city);
      return await this.fetchWeatherData(coords);
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      throw new Error('Failed to retrieve weather data.');
    }
  }

  public async fetchWeatherForecast(lat: number, lon: number) {
    const url = `${this.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    console.log('Fetching weather forecast from:', url); // Log the URL being fetched
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather forecast: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // You may want to return a specific part of the data
  }
}

// Export the WeatherService instance
export default new WeatherService();
