const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');
const stream = require('stream');

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4() + ".jpg";
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file(
            ImageStoreFirebase.FOLDER + '/' + filename);
        const bufferStream = new stream.PassThrough();
        bufferStream.end(Buffer.from(image_data, 'base64'));
        bufferStream
          .pipe(
            file.createWriteStream({
              metadata: {
                contentType: 'image/jpeg',
                metadata: {
                  custom: 'metadata',
                },
              },
              public: true,
              validation: 'md5',
            })
          )
          .on('error', function (err) {})
          .on('finish', function () {
            // The file upload is complete.
          });
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