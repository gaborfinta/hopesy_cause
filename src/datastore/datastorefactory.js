const CauseStoreLocal = require('./cause.array_local');
const CauseStoreFirebase = require('./cause.firestore');
const ImageStoreLocal = require('./image.map_local');
const ImageStoreFirebase = require('./image.storage');

function DataStoreFactory(env) {
    if (env === "local") {
        return {
            "causeStore": new CauseStoreLocal(),
            "imageStore": new ImageStoreLocal()
        }
    } else if (env === "firebase") {
        return {
            "causeStore": new CauseStoreFirebase(),
            "imageStore": new ImageStoreFirebase()
        }
    }
}

module.exports = DataStoreFactory;