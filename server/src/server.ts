import dotenv from 'dotenv'; // Required for loading environment variables
import express from 'express';

// Load environment variables from .env file
dotenv.config();

// Import the routes
import routes from './routes/index.js';

// Initialize the Express app
const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files from the client dist folder
app.use(express.static('client/dist'));

// TODO: Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Middleware to connect the routes
app.use(routes);

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
