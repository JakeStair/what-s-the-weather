import path from 'node:path'; // Import path module for handling file and directory paths
import { fileURLToPath } from 'node:url'; // Import fileURLToPath to work with module URLs
import { Router, Request, Response } from 'express'; // Import Router, Request, and Response from express

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

const router = Router(); // Create a new router instance

// TODO: Define route to serve index.html
router.get('/', (_req: Request, res: Response) => {
    // Send the index.html file when the root URL is accessed
    res.sendFile(path.join(__dirname, '../client/index.html')); // Construct the path to index.html and send it as the response
});

// Export the router to use in the main server file
export default router;
