const DataStore = require('./datastore');

class CauseStoreLocal extends DataStore {
    constructor() {
        super();
        this.causeCount = 0;
        this.causes = {};
    }

    async save(cause) {
        cause.id = this.causeCount++;
        this.causes[cause.id] = cause;
        return cause.id;
    }

    async getById(id) {
        return this.causes[id];
    }

    async getAll() {
        let causeList = [];
        Object.keys(this.causes).forEach(id => {
            causeList.push(this.causes[id])
        });
        return causeList;
    }

    async patch(cause) {
        this.causes[cause.id] = cause;
        return cause.id;
    }
}

module.exports = CauseStoreLocal;