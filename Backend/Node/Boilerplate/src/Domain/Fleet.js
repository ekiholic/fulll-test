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

    isVehicleRegistered(plateNumber) {
        return this.vehicles.has(plateNumber)
    }

    registerVehicle(vehicle) {
        if (this.isVehicleRegistered(vehicle.plateNumber)) {
            throw new Error('Vehicle is already registered');
        }
        this.vehicles.set(vehicle.plateNumber, vehicle);
    }

    parkVehicle(plateNumber, location) {
        if (!this.isVehicleRegistered(plateNumber)) {
            throw new Error('Vehicle is not registered');
        }

        const vehicle = this.vehicles.get(plateNumber);
        if (vehicle.location && vehicle.location.sameLocation(location)) {
            throw new Error('Vehicle already parked at this location');
        }
        vehicle.setLocation(location);
    }

    getVehicleLocation(plateNumber) {
        if (!this.isVehicleRegistered(plateNumber)) {
            throw new Error('Vehicle is not registered');
        }

        
    }
}

module.exports = Fleet;