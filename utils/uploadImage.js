const cloudinary = require("./cloudinary");

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (result) {
        return resolve(result.secure_url);
      }
      return reject({ message: error.message });
    });
  });
};

module.exports = uploadImage;
