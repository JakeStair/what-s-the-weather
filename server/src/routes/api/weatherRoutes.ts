import { Router } from 'express';
import HistoryService from '../../service/historyService.js'; 
import WeatherService from '../../service/weatherService.js'; 

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    // console.log(req.body, "line 9 weather routes");
    try {
        const cityName = req.body.cityName; 
        const weatherData = await WeatherService.getWeatherForCity(cityName); 
        // const weatherForecast = await WeatherService.fetchWeatherForecast(weatherData.lat, weatherData.lon)
        await HistoryService.addCity(cityName); 
        res.json(weatherData);
        console.log(weatherData, "this is weather data");
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});



// TODO: GET search history
router.get('/history', async (_req, res) => {

    try {
        
        const history = await HistoryService.getCities();
        
       
        res.json(history);
    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while fetching search history.' });
    }
});



// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    
    
    try {
        const cityId = req.params.id;
        
        await HistoryService.removeCity(cityId);
        
        
        res.status(200).json({ message: 'City deleted from history.' });
    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while deleting the city from history.' });
    }
});


export default router;
