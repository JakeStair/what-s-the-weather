import path from 'node:path'; // Import path module for handling file and directory paths
import { fileURLToPath } from 'node:url'; // Import fileURLToPath to work with module URLs
import { Router, Request, Response } from 'express'; // Import Router, Request, and Response from express

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL and convert it to a file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

const router = Router(); // Create a new router instance

// Serve index.html located in the client folder when the root URL is accessed
router.get('*', (_req: Request, res: Response) => {
    // Adjusted path to point to index.html
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

// Export the router to use in the main server file
export default router;
