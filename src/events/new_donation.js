const admin = require('firebase-admin');

async function onNewDonation(snap, context) {
    console.log(context);
    const { id } = context.params;
    const { amount, cause_id } = snap.data();
    let causeReference = await admin.firestore().collection('causes').doc(cause_id);
    let causeRecord = await causeReference.get();
    let causeData = causeRecord.data();
    causeData["donations"].push(id);
    causeData["sum_collected"] += amount;
    if (causeData["sum_collected"] >= causeData["sum_target"]) {
        causeData["closed"] = true;
    }
    await causeReference.set(causeData);
}

module.exports = onNewDonation;