const app = require('commander');
const repository = require('../Infra/Repository');

app
    .command("create <userId>")
    .description("Create a fleet for a user")
    .action((userId) => {
        try {
            repository.createFleet(userId);
        } catch (error) {
            console.log(error.message)
        }
    });

app
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Create a fleet for a user")
    .action((fleetId, vehiclePlateNumber) => {
        try {
            repository.registerVehicle(fleetId, vehiclePlateNumber);
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
            repository.localizeVehicle(fleetId, vehiclePlateNumber, lat, lng, alt);
        } catch (error) {
            console.log(error.message);
        }
    });

app.parse(process.argv);