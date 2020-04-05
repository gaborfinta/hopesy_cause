const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createApp = require('./app');
const DataStoreFactory = require('./src/datastore/datastorefactory');
const onDonationCreated = require('./src/events/new_donation');

admin.initializeApp(functions.config().firebase);

const app = createApp(DataStoreFactory('firebase'));

exports.cause = functions.https.onRequest(app);
exports.onDonationCreated = functions.firestore
    .document('donations/{id}')
    .onCreate(onDonationCreated);