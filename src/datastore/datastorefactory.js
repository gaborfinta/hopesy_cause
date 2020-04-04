const CauseStoreLocal = require('./cause.array_local');
const CauseStoreFirebase = require('./cause.firestore');

function DataStoreFactory(env) {
    if (env === "local") {
        return {
            "causeStore": new CauseStoreLocal()
        }
    } else if (env === "firebase") {
        return {
            "causeStore": new CauseStoreFirebase()
        }
    }
}

module.exports = DataStoreFactory;