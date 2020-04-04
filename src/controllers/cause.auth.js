const Cause = require('../models/cause');

const getAll = (datastore) => async (req, res) => {
    let causes = await datastore.getAll();
    res.json(causes);
}

const getById = (datastore) => async (req, res) => {
    const { id } = req.params;
    let cause = await datastore.getById(id);
    res.json(cause);
}

const save = (datastore) => async (req, res) => {
    const causeAttributes = Cause.getKeys();
    let newCause = {};
    causeAttributes.forEach(attribute => newCause[attribute] = req.body[attribute]);
    let newId = await datastore.save(new Cause(newCause));
    res.json({newId});
}

const patch = (datastore) => async (req, res) => {
    const { id } = req.params;
    let cause = await datastore.getById(id);
    if (cause === undefined) {
        // throw error
    }
    let causeAttributes = Cause.getKeys();
    causeAttributes.forEach(attribute => {
        if (req.body[attribute] !== undefined) {
            cause[attribute] = req.body[attribute];
        }
    });

    let causeId = await datastore.patch(cause);
    res.json({ id: causeId });
}

const addRoutes = (router, datastore) => {
    router.get('/', getAll(datastore));
    router.post('/', save(datastore));
    router.get('/:id/', getById(datastore));
    router.patch('/:id/', patch(datastore));
}

module.exports = addRoutes;