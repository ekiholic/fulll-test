const app = require('commander');

app
    .command("create <userId>")
    .description("Create a fleet for a user")
    .action((userId) => {
        console.log("Create fleet for user");
    });

app
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Create a fleet for a user")
    .action((fleetId, vehiclePlateNumber) => {
        console.log("Register vehicle");
    });

app
    .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
    .description("Create a fleet for a user")
    .action((fleetId, vehiclePlateNumber, lat, lng, alt) => {
        console.log("Localize vehicle");
    });

app.parse(process.argv);