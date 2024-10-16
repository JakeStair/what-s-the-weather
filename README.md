# Weather Dashboard

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Calls](#api-calls)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Description
The Weather Dashboard application allows users to view the current and future weather conditions for multiple cities. Utilizing the OpenWeather API, the application fetches weather data based on user input, displays current weather conditions, and provides a 5-day forecast. Users can also access their search history for easy reference.

## User Story
AS A traveler  
I WANT to see the weather outlook for multiple cities  
SO THAT I can plan a trip accordingly.

## Acceptance Criteria
- GIVEN a weather dashboard with form inputs
  - WHEN I search for a city
    - THEN I am presented with current and future conditions for that city, and that city is added to the search history.
- WHEN I view current weather conditions for that city
  - THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's `alt` tag, the temperature, the humidity, and the wind speed.
- WHEN I view future weather conditions for that city
  - THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity.
- WHEN I click on a city in the search history
  - THEN I am again presented with current and future conditions for that city.

## Technologies Used
- HTML
- CSS
- JavaScript (TypeScript)
- Node.js
- Express
- OpenWeather API

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
2. Navigate to the project directory:
   ```bash
    cd weather-dashboard
3. Install the necessary dependencies:
   ```bash
    npm install

## Usage
1. Start the server:
   ```bash
    npm start
2. Open your browser and navigate to http://localhost:3000.
3. Use the search input to find the weather for your desired city.
4. View the current conditions and the 5-day forecast displayed on the dashboard.

## API Calls
The application makes use of the OpenWeather API to fetch weather data. Here’s an example of the API endpoint used for fetching the weather forecast:

https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}

Make sure to replace `{lat}`, `{lon}`, and `{API_KEY}` with the appropriate values.

## Deployment
The application is deployed on Render. You can access the live application at [your-live-app-url].

## Contributing
Contributions are welcome! If you have suggestions for improvements, please fork the repository and create a pull request.

## License
This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Questions
If you have any questions about the project, feel free to contact me:

- GitHub: [JakeStair](https://github.com/JakeStair)
- Email: jacob.watson00@yahoo.com