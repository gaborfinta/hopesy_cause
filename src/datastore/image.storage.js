const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = "causes/" + uuid.v4();
        const file = admin.storage().bucket().file(filename);
        await file.save(image_data);
        return filename;
    }

    async getById(path) {
        const file = admin.storage().bucket().file(path);
        const url = await file.getSignedUrl({});
        return url;
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