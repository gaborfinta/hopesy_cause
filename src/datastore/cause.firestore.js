const admin = require('firebase-admin');
const DataStore = require('./datastore');
const Cause = require('../models/cause');

class CauseStoreFirebase extends DataStore {
    constructor() {
        super();
    }

    async save(cause) {
        let causeReference = await admin.firestore().collection('causes').add(cause.serialize());
        const { id } = causeReference;
        await causeReference.update({ id });
        return id;
    }

    async getById(id) {
        let causeRef = await admin.firestore().collection('causes').doc(id);
        let causeRecord = await causeRef.get();
        let cause = { id };
        Cause.keys.forEach(key => { cause[key] = causeRecord.get(key); });
        return new Cause(cause);    
    }

    async getAll() {
        let causeList = [];
        const causes = await admin.firestore().collection('causes').get();
        causes.forEach(causeSnapshot => {
            let cause = { "id": causeSnapshot.id };
            Cause.keys.forEach(key => { cause[key] = causeSnapshot.get(key); });
            causeList.push(new Cause(cause));
        });

        return causeList;
    }

    async patch(cause) {
        const { id } = cause;
        await admin.firestore().collection('causes').doc(id).set(cause.serialize());
        return id;
    }
}

module.exports = CauseStoreFirebase;