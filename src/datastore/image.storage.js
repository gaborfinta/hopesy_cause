const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');
const axios = require('axios');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4();
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file('causes/' + filename);
        await file.save(image_data);
        return filename;
    }

    async getById(path) {
        const BASE_URL = "https://firebasestorage.googleapis.com/v0/b/hopesy-16904.appspot.com/o/causes%2F" + path;
        let resp = await axios.get(BASE_URL);
        console.log(resp);
        const { downloadTokens } = resp.data;
        return BASE_URL + '?alt=media&token=' + downloadTokens;
    }

    async getAll() {
        throwNotImplementedError();
    }

    async patch(dummy_param) {
        throwNotImplementedError();
    }

    async getDefault() {
        return "causes/default.png";
    }
}

module.exports = ImageStoreFirebase;