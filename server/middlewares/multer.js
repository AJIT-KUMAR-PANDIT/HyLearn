import multer from "multer";
import { v4 as uuid } from "uuid";

// Set up multer storage to store files with unique names
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads"); // Store files in the 'uploads' folder
  },
  filename(req, file, cb) {
    const id = uuid(); // Generate unique ID for each file
    const extName = file.originalname.split(".").pop(); // Get the file extension
    const fileName = `${id}.${extName}`; // Set the filename as a UUID with the original extension
    cb(null, fileName);
  },
});

// Multer middleware to handle two different file fields: "video" and "notes"
export const uploadFiles = multer({ storage }).fields([
  { name: "video", maxCount: 1 }, // Single file for "video"
  { name: "notes", maxCount: 1 }, // Single file for "notes"
]);
