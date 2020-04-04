const Cause = require('../models/cause');

const getImageURLsForCause = async (imageStore, cause) => {
    const { images } = cause;
    if (!images) {
        return [];
    }
    let imageURLs = [];
    for (let i = 0; i < images.length; i++) {
        let url = await imageStore.getById(images[i]);
        imageURLs.push(url);
    }
    return imageURLs;
}

const getAll = (datastore) => async (req, res) => {
    const { causeStore, imageStore } = datastore;
    let causes = await causeStore.getAll();
    for (let i = 0; i < causes.length; i++) {
        let imageURLs = await getImageURLsForCause(imageStore, causes[i]);
        causes[i].images = imageURLs;

    }
    res.json(causes);
}

const getById = (datastore) => async (req, res) => {
    const { causeStore, imageStore } = datastore;
    const { id } = req.params;
    let cause = await causeStore.getById(id);
    let imageURLs = await getImageURLsForCause(imageStore, cause);
    cause.images = imageURLs;
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
        for (let i = 0; i < images.length; i++) {
            let url = await imageStore.save(images[i]);
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