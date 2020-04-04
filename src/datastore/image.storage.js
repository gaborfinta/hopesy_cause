const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');
const axios = require('axios');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4() + ".jpg";
        console.log("Start image convert")
        const jpegImg = Buffer.from(image_data, 'base64');
        console.log("Image convert done")
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file(
            ImageStoreFirebase.FOLDER + '/' + filename);
        console.log("Saving image");
        await file.save(jpegImg, { contentType: "image/jpeg" });
        console.log("Image saved");
        return filename;
    }

    async getById(path) {
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file(ImageStoreFirebase.FOLDER + '/' + path);
        const date = Date.parse('08 Apr 2020 00:12:00 GMT');
        const url = await file.getSignedUrl({
            action: "read",
            expires: date
        });
        return url;
    }

    async getAll() {
        throwNotImplementedError();
    }

    async patch(dummy_param) {
        throwNotImplementedError();
    }

    async getDefault() {
        return "default.png";
    }
}

ImageStoreFirebase.FOLDER = "causes";

module.exports = ImageStoreFirebase;