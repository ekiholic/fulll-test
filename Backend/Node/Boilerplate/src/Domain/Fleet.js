const Vehicle = require('./Vehicle');
const Location = require('./Location');

class Fleet {
    constructor() { // id, userId
        /*
        this.id = id;
        this.userId = userId;
        */
        this.vehicles = new Map();
    }

    registerVehicle(vehicle) {
        if (this.vehicles.has(vehicle.plateNumber)) {
            throw new Error(`Vehicle ${vehicle.plateNumber} is already registered`);
        }
        this.vehicles.set(vehicle.plateNumber, vehicle);
    }

    parkVehicle(plateNumber, location) {
        if (!this.vehicles.has(vehicle.plateNumber)) {
            throw new Error(`Vehicle ${vehicle.plateNumber} is not registered`);
        }

        const vehicle = this.vehicles.get(plateNumber);

        if (vehicle.location && vehicle.location.sameLocation(location)) {
            throw new Error(`Vehicle ${plateNumber} already parked there`);
        }
        vehicle.sameLocation(location);
    }
}

module.exports = Fleet;