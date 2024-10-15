import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the absolute path to the client/dist folder
const clientPath = path.join(__dirname, '../../client/dist'); // Correct path to client/dist

console.log(`Client path resolved to: ${clientPath}`); // Log path

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from client/dist
app.use(express.static(clientPath));

// Fallback route: Serve index.html for any unmatched routes
app.get('*', (_req, res) => {  // Use _req to avoid unused parameter warning
    const indexPath = path.join(clientPath, 'index.html');
    console.log(`Sending file: ${indexPath}`); // Log file path
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
