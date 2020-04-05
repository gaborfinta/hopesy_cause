const admin = require('firebase-admin');

async function onDonationCreated(snap, context) {
    console.log(snap.data());
    const { id, amount, cause_id } = snap.data();
    let causeReference = await admin.firestore().collection('causes').doc(cause_id);
    let causeRecord = await causeReference.get();
    let causeData = causeRecord.data();
    console.log(causeData);
    causeData.donations.push(id);
    causeData.sum_collected += amount;
    if (sum_collected >= causeData.sum_target) {
        causeData.closed = true;
    }
    await causeReference.set(causeData);
}

module.exports = onDonationCreated;