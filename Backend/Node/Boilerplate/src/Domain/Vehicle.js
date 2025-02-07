class Vehicle {
    constructor(plateNumber, type = "car") {
        if (plateNumber === "" || typeof plateNumber !== "string") {
            throw new Error("Plate number invalid")
        }
        this.plateNumber = plateNumber;
        this.type = type;
        this.location = null;
    }

    setLocation(location) {
        this.location = location;
    }
}

module.exports = Vehicle;