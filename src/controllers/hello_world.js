const hello_service = require('../services/hello_world');

const hello = async (req, res) => {
    try {
        const greeting = hello_service();
        res.send(greeting);
    } catch (e) {
        res.sendStatus(500);
    }
}

module.exports = hello;