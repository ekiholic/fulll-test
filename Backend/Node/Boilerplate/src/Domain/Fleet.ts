import { Vehicle } from './Vehicle'
import { Location } from './Location'

class Fleet {
    userId: string;
    vehicles: Map<string, Vehicle>;
    id: string;

    constructor(userId: string) {
        if (userId === "") {
            throw new Error("userId invalid")
        }
        this.userId = userId;
        this.vehicles = new Map();
        this.id = `${userId}-fleet`;
    }

    isVehicleRegistered(plateNumber: string): boolean {
        return this.vehicles.has(plateNumber);
    }

    registerVehicle(vehicle: Vehicle): void {
        if (this.isVehicleRegistered(vehicle.plateNumber)) {
            throw new Error('Vehicle is already registered');
        }
        this.vehicles.set(vehicle.plateNumber, vehicle);
    }

    parkVehicle(plateNumber: string, location: Location): void {
        if (!this.isVehicleRegistered(plateNumber)) {
            throw new Error('Vehicle is not registered');
        }

        const vehicle: Vehicle = this.vehicles.get(plateNumber)!;
        if (vehicle.location && vehicle.location.isSameLocation(location)) {
            throw new Error('Vehicle already parked at this location');
        }
        vehicle.setLocation(location);
    }
}

export { Fleet };