const Vehicle = require('./Vehicle');
const Location = require('./Location');

class Fleet {
    constructor(userId) {
        if (userId === "" || typeof userId !== "string") {
            throw new Error("userId invalid")
        }
        this.userId = userId;
        this.vehicles = new Map();
        this.id = `${userId}-fleet`;
    }

    isVehicleRegistered(plateNumber) {
        return this.vehicles.has(plateNumber);
    }

    registerVehicle(vehicle) {
        if (!(vehicle instanceof Vehicle)) {
            throw new Error("Expected an instance of Vehicle");
        }
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
        if (vehicle.location && vehicle.location.isSameLocation(location)) {
            throw new Error('Vehicle already parked at this location');
        }
        vehicle.setLocation(location);
    }
}

module.exports = Fleet;