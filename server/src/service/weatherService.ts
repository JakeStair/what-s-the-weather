import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  public city: string
  public date: string
  public icon: string
  public iconDescription: string
  public tempF: number
  public windSpeed: number
  public humidity: number
  public lat: number
  public lon: number


  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number,
    lat: number,
    lon: number

  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.lat = lat;
    this.lon = lon;
  }
}

class WeatherService {
  private baseURL: string = process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';

  constructor() {
    if (!this.apiKey) {
      throw new Error('API key for OpenWeather is missing. Set it in the .env file.');
    }
    // console.log('Base URL:', this.baseURL);
  }

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const url = `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=imperial`;
    // console.log('Fetching location data from:', url); 
    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error(`City "${city}" not found.`);
    }
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log('Location data:', data); 
    return this.extractCoordinates(data);
  }

  private extractCoordinates(data: any): Coordinates {
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
    };
  }

  private buildWeatherQuery({ lat, lon }: Coordinates): string {
    return `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
  }

  private async fetchWeatherData(coords: Coordinates): Promise<[Weather]> {
    const url = this.buildWeatherQuery(coords);
    // console.log('Fetching weather data from:', url); 
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log('Weather data:', data); 
    return this.parseWeatherData(data);
  }

  private parseWeatherData(data: any): [Weather] {
    // console.log('Parsed data:', data); 
    return [new Weather(data.name, new Date(data.dt* 1000).toLocaleDateString(), data.weather[0].icon, data.weather[0].description, data.main.temp, data.wind.speed, data.main.humidity, data.coord.lat, data.coord.lon)];
  }
  private parseWeatherForecastData(data: any): [Weather] {
    // console.log('Parsed data:', data);
    const forecastData = data.list
    const cityName = data.city.name
    const fiveDayForecastData = forecastData.filter((_data: any, i: number) => i % 8 === 0)
    console.log({ fiveDayForecastData, cityName })

    const formattedForecastWeatherData = fiveDayForecastData.map((forecastData: any) => new Weather(cityName, new Date(forecastData.dt* 1000).toLocaleDateString(), forecastData.weather[0].icon, forecastData.weather[0].description, forecastData.main.temp, forecastData.wind.speed, forecastData.main.humidity, data.city.lat, data.city.lon))

    return formattedForecastWeatherData
  }

  public async getWeatherForCity(city: string): Promise<[Weather]> {
    try {
      const coords = await this.fetchLocationData(city);
      // const forecastData = 
      const weatherForecastData = await this.fetchWeatherForecast(coords.lat, coords.lon)
      // console.log(forecastData)

      const currentWeatherData = await this.fetchWeatherData(coords);
     
      const data = [...currentWeatherData,...weatherForecastData]
      //@ts-ignore
      return data
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      throw new Error('Failed to retrieve weather data.');
    }
  }

  public async fetchWeatherForecast(lat: number, lon: number) {
    const url = `${this.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;
    // console.log('Fetching weather forecast from:', url); 
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather forecast: ${response.statusText}`);
    }

    const data = await response.json();
    return this.parseWeatherForecastData(data);
  }
}

export default new WeatherService();
