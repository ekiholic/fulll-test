const Vehicle = require('./Vehicle');

class Fleet {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.vehicles = new Map();
    }
}

module.exports = Fleet;