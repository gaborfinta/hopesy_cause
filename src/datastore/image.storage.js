const admin = require('firebase-admin');
const DataStore = require('./datastore');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const url = this.imageCount++;
        this.images[url] = image_data;
        return url;
    }

    async getById(url) {
        throwNotImplementedError();
    }

    async getAll() {
        throwNotImplementedError();
    }

    async patch(dummy_param) {
        throwNotImplementedError();
    }

    async getDefault() {
        return "default";
    }
}

module.exports = ImageStoreFirebase;