const DataStore = require('./datastore');

class ImageStoreLocal extends DataStore {
    constructor() {
        super();
        this.images = { "default": "def_image.jpg" };
        this.imageCount = 0;
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

module.exports = ImageStoreLocal;