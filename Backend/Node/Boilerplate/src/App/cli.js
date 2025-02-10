const { Command } = require('commander');
const repository = require('../Infra/Repository');
const Fleet = require('../Domain/Fleet');
const Vehicle = require('../Domain/Vehicle');
const Location = require('../Domain/Location');

app = new Command()

app
    .command("create <userId>")
    .description("Create a fleet for a user")
    .action((userId) => {
        try {
            const fleet = new Fleet(userId);
            repository.createFleet(fleet);
        } catch (error) {
            console.log(error.message);
        }
    });

app
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Create a fleet for a user")
    .action((fleetId, vehiclePlateNumber) => {
        try {
            const vehicle = new Vehicle(vehiclePlateNumber);
            repository.registerVehicle(fleetId, vehicle);
        } catch (error) {
            console.log(error.message);
        }
    });

app
    .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
    .description("Create a fleet for a user")
    .action((fleetId, vehiclePlateNumber, lat, lng, alt) => {
        alt = alt || 0;
        try {
            const location = new Location(lat, lng, alt);
            repository.localizeVehicle(fleetId, vehiclePlateNumber, location);
        } catch (error) {
            console.log(error.message);
        }
    });

app.parse(process.argv);