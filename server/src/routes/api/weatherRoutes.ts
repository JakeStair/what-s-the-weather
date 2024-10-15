import { Router } from 'express'; // Import Router from express
import HistoryService from '../../service/historyService.js'; // Import HistoryService for managing search history
import WeatherService from '../../service/weatherService.js'; // Import WeatherService for fetching weather data

const router = Router(); // Create a new router instance

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    // Extract city name from request body
    const city = req.body.city;

    try {
        // Get weather data from city name
        const weatherData = await WeatherService.getWeatherForCity(city);
        
        // Save city to search history
        await HistoryService.addCity(city);
        
        // Send the weather data back as the response
        res.json(weatherData);
    } catch (error) {
        // Handle errors, send a 500 response with an error message
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {

    try {
        // Fetch the search history from HistoryService
        const history = await HistoryService.getCities();
        
        // Send the search history back as the response
        res.json(history);
    } catch (error) {
        // Handle errors, send a 500 response with an error message
        res.status(500).json({ error: 'An error occurred while fetching search history.' });
    }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    // Extract the city ID from the request parameters
    const cityId = req.params.id;

    try {
        // Call HistoryService to delete the city by ID
        await HistoryService.removeCity(cityId);
        
        // Send a success response
        res.status(200).json({ message: 'City deleted from history.' });
    } catch (error) {
        // Handle errors, send a 500 response with an error message
        res.status(500).json({ error: 'An error occurred while deleting the city from history.' });
    }
});

// Export the router to use in the main server file
export default router;
