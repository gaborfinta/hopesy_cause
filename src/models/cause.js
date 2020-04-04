class Cause {
    constructor(causeAttributes) {
        Cause.keys.forEach(key => {
            this[key] = null;
        });

        Object.keys(causeAttributes).forEach(key => {
            if(causeAttributes[key] !== undefined) {
                this[key] = causeAttributes[key];
            }
        });
    }

    static getKeys () {
        return Cause.keys;
    }

    serialize() {
        let c = {};
        Cause.keys.forEach(key => {
            c[key] = this[key];
        });

        return c;
    }

    validate() {
        
    }
}

Cause.keys = ["id", "title", "images", "description", "sum_target", "sum_collected", "closed", "created_by", "donations"]

module.exports = Cause;