import { Location } from './Location';

class Vehicle {
    plateNumber: string;
    type: string;
    location: Location | null;

    constructor(plateNumber: string, type = "car") {
        if (plateNumber === "") {
            throw new Error("Plate number invalid")
        }
        this.plateNumber = plateNumber;
        this.type = type;
        this.location = null;
    }

    setLocation(location: Location): void {
        this.location = location;
    }
}

export { Vehicle };