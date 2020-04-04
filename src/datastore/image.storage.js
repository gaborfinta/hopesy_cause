const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4();
        const file = admin.storage().bucket('causes').file(filename);
        await file.save(image_data);
        return filename;
    }

    async getById(path) {
        const file = admin.storage().bucket('causes').file(path);
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
        return "causes/default.png";
    }
}

module.exports = ImageStoreFirebase;