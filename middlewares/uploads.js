
// export default upload;
import multer from "multer";
import path from "path";
import fs from "fs";
import { log } from "console";

// 1 Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "public/uploads");
try {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
} catch (err) {
    console.log("upload folder crsetion is failed", err);
}

// 2️ Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use timestamp + original extension
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const filename = `${name}-${Date.now()}${ext}`;
        // const filename = Date.now() + ext;
        cb(null, filename);
    }
});

// 3️⃣ File filter (only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// 4️⃣ Export multer middleware
const upload = multer({ storage, fileFilter });

export default upload;
