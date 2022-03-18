const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
 
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "photos-gallery" // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  }
});

const musicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["mp3", "wav"],
    folder: "music-gallery" // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  }
});

const imageUploader = multer({ storage: imageStorage });

const musicUploader = multer({storage: musicStorage })
 
module.exports = {
    imageUploader,
    musicUploader
}