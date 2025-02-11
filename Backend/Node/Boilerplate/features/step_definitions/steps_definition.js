const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const Fleet = require("../../src/Domain/Fleet");
const Vehicle = require("../../src/Domain/Vehicle");
const Location = require("../../src/Domain/Location");

Given('my fleet', function () {
    this.fleet = new Fleet("user1");
});

Given('a vehicle', function () {
    this.vehicle = new Vehicle("123FR");
});

When('I register this vehicle into my fleet', function () {
    try {
        this.fleet.registerVehicle(this.vehicle);
        this.result = "Vehicle registered";
    } catch (error) {
        this.result = "Vehicle already registered";
    }
});

Then('this vehicle should be part of my vehicle fleet', function () {
    assert.strictEqual(this.result, "Vehicle registered");
});

Given('I have registered this vehicle into my fleet', function () {
    this.fleet.registerVehicle(this.vehicle);
});

When('I try to register this vehicle into my fleet', function () {
    try {
        this.fleet.registerVehicle(this.vehicle);
        this.result = "Vehicle registered";
    } catch (error) {
        this.result = "Vehicle already registered";
    }
});

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.strictEqual(this.result, "Vehicle already registered");
});

Given('the fleet of another user', function () {
    this.otherFleet = new Fleet("user2");
})

Given("this vehicle has been registered into the other user's fleet", function () {
    this.otherFleet.registerVehicle(this.vehicle);
});

Given('a location', function () {
    this.location = new Location(4, 4);
});

When('I park my vehicle at this location', function () {
    try {
        this.fleet.parkVehicle(this.vehicle.plateNumber, this.location);
        this.result = "Vehicle parked";
    } catch (error) {
        this.result = "Vehicle already parked at this location";
    }
});

Then('the known location of my vehicle should verify this location', function () {
    this.myVehicle = this.fleet.vehicles.get(this.vehicle.plateNumber);
    assert.strictEqual(this.location, this.myVehicle.location);
});

Given('my vehicle has been parked into this location', function () {
    this.fleet.parkVehicle(this.vehicle.plateNumber, this.location);
});

When('I try to park my vehicle at this location', function () {
    try {
        this.fleet.parkVehicle(this.vehicle.plateNumber, this.location);
        this.result = "Vehicle parked";
    } catch (error) {
        this.result = "Vehicle already parked at this location";
    }
});

Then('I should be informed that my vehicle is already parked at this location', function () {
    assert.strictEqual(this.result, "Vehicle already parked at this location");
});