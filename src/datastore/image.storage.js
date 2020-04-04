const admin = require('firebase-admin');
const DataStore = require('./datastore');
const uuid = require('uuid');
const axios = require('axios');

// https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}

class ImageStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(image_data) {
        const filename = uuid.v4() + ".jpg";
        console.log("Start image convert")
        const jpegImg = dataURItoBlob(image_data);
        console.log("Image convert done")
        const file = admin.storage().bucket('hopesy-16904.appspot.com').file(
            ImageStoreFirebase.FOLDER + '/' + filename);
        console.log("Saving image");
        await file.save(jpegImg);
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