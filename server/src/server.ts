import dotenv from 'dotenv';
import express from 'express';

import routes from './routes/index.js';
// didn't import routes, missing connections from api to server

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from client/dist
app.use(express.static('../client/dist')); // Corrected path to client/dist
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes); 
// added routes to the server because it was missing

// Fallback route: Serve index.html for any unmatched routes
// app.get('*', (_req, res) => {  // Use _req to avoid unused parameter warning
//     const indexPath = path.join(clientPath, 'index.html');
//     console.log(`Sending file: ${indexPath}`); // Log file path
//     res.sendFile(indexPath, (err) => {
//         if (err) {
//             console.error('Error sending index.html:', err);
//             res.status(500).send('Internal Server Error');
//         }
//     });
// });

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
