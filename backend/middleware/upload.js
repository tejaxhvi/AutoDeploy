import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(), // store  in memory
  limits: {
     fileSize: 5 * 1024 * 1024,
     files: 2
  },
  fileFilter(_req, file, cb ){                // underscore -> intentionally unused
    const allowed = ["text/html", "text/css"]
    if (allowed.includes(file.mimetype)) {
      cb(null,true)
    } else {
       cb(new Error(`Unsupported file type: ${file.mimetype}`))
    }
  }
});
