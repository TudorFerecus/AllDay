const dotenv = require("dotenv");
dotenv.config();

cloudinary = require("cloudinary").v2;

const { CLOUDINARY_API_KEY, CLOUDINARY_AUTHORIZATION, CLOUDINARY_CLOUD_NAME } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_AUTHORIZATION,
});

module.exports = {cloudinary}