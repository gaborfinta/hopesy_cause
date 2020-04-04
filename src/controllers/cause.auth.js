const Cause = require('../models/cause');

const getAll = (datastore) => async (req, res) => {
    const { causeStore } = datastore;
    let causes = await causeStore.getAll();
    res.json(causes);
}

const getById = (datastore) => async (req, res) => {
    const { causeStore } = datastore;
    const { id } = req.params;
    let cause = await causeStore.getById(id);
    res.json(cause);
}

const save = (datastore) => async (req, res) => {
    const { causeStore, imageStore } = datastore;
    const causeAttributes = Cause.getKeys();
    let newCause = {};
    causeAttributes.forEach(attribute => newCause[attribute] = req.body[attribute]);
    const { images } = newCause;
    let imageURLs = [];
    if (images && images.length) {
        for (const image_data in images) {
            let url = await imageStore.save(image_data);
            imageURLs.push(url);
        };
    } else {
        let defaultURL = await imageStore.getDefault();
        imageURLs.push(defaultURL);
    }
    newCause.images = imageURLs;
    let newId = await causeStore.save(new Cause(newCause));
    res.json({newId});
}

const addRoutes = (router, datastore) => {
    router.get('/', getAll(datastore));
    router.post('/', save(datastore));
    router.get('/:id/', getById(datastore));
}

module.exports = addRoutes;