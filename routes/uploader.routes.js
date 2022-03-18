const router = require("express").Router();

const { imageUploader, musicUploader } = require("../middleware/cloudinary.config")

// esta ruta recibe un archivo de image, lo pasa por cloudinary y regresa el url al frontend
router.post("/", imageUploader.single("image"), musicUploader.single("music"), (req, res, next) => {
    console.log("file is: ", req.file)
   
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    
    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    
    res.json({ imageUrl: req.file.path, musicUrl: req.file.path });
  });







module.exports = router;