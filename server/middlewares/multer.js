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

// Multer middleware to handle multiple fields: "image", "video", and "notes"
export const uploadFiles = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
}).fields([
  { name: "file", maxCount: 1 }, // Field name "image" for image
  { name: "video", maxCount: 1 }, // Field name "video" for video
  { name: "notes", maxCount: 1 }, // Field name "notes" for notes
]);
