const path = require('path');
const DatauriParser=require("datauri/parser");
const {cloudinary} = require('../middleware/cloudinary')
const parser = new DatauriParser();

const uploadImage = (request, response) => {
  let image = request.file;
  if (image) {
    const extName = path.extname(request.file.originalname).toString();
    const file64 = parser.format(extName, request.file.buffer);

    cloudinary.uploader.upload(file64.content, (error, result) => {
      if (error) {
        return response.status(500).json({
          error: "Failed to upload to the cloud",
          details: error,
        });
      }
      return response.status(200).json({
        data: result,
      });
    });
  } else {
    return response.status(400).json({
      error: "Please add the image to be uploaded",
    });
  }
};

module.exports = {uploadImage}