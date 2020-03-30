const admin = require('firebase-admin');
const functions = require('firebase-functions');
const app = require('./app');

exports.cause = functions.https.onRequest(app);