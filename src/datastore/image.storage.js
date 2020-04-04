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
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file('causes/' + filename);
        await file.save(image_data);
        return filename;
    }

    async getById(path) {
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file('causes/' + path);
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

module.exports = ImageStoreFirebase;