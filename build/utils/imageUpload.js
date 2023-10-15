"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dkbzrakzu',
    api_key: '833368643811112',
    api_secret: 'ycdZi6RUQVUvZwGj_7pek3rv0FI'
});
const uploadImage = (image, id) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(image, { public_id: id }, function (error, result) {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            return reject(error);
        });
    });
};
exports.uploadImage = uploadImage;
