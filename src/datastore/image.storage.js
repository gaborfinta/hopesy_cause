const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');

// https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
function dataURItoBlob(dataURI) {
    console.log("dataURIToBlob");
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    console.log(mimeString);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const retVal = {
        "data": ia,
        "mimetype": mimeString
    };

    console.log(retVal);

    return retVal;
}

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4() + ".jpg";
        console.log("Start image convert")
        const { data, mimeString } = dataURItoBlob(image_data);
        console.log("Image convert done")
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file(
            ImageStoreFirebase.FOLDER + '/' + filename);
        console.log("Saving image");
        await file.save(data, { "contentType": mimeString });
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