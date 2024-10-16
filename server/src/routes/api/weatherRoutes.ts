import { Router } from 'express'; // Import Router from express
import HistoryService from '../../service/historyService.js'; // Import HistoryService for managing search history
import WeatherService from '../../service/weatherService.js'; // Import WeatherService for fetching weather data

const router = Router(); // Create a new router instance

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    console.log('Received POST request with body:', req.body); // Log the request body
    const cityName = req.body.cityName; // Extract cityName from request

    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName); // Use cityName in the function call
        await HistoryService.addCity(cityName); // Add the city to search history
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log any error
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
