const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createApp = require('./app');
const DataStoreFactory = require('./src/datastore/datastorefactory');

admin.initializeApp(functions.config().firebase);

const app = createApp(DataStoreFactory('firebase'));

exports.user = functions.https.onRequest(app);