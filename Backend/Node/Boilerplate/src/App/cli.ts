const { Command } = require('commander');
import * as repository from '../Infra/Repository';
import { Fleet } from '../Domain/Fleet';
import { Vehicle } from '../Domain/Vehicle';
import { Location } from '../Domain/Location';

const app = new Command()

app
    .command("create <userId>")
    .description("Create a fleet for a user")
    .action((userId: string) => {
        try {
            const fleet = new Fleet(userId);
            repository.createFleet(fleet);
        } catch (error: any) {
            console.log(error.message);
        }
    });

app
    .command("register-vehicle <fleetId> <vehiclePlateNumber>")
    .description("Register a vehicle in a fleet")
    .action((fleetId: string, vehiclePlateNumber: string) => {
        try {
            const vehicle = new Vehicle(vehiclePlateNumber);
            repository.registerVehicle(fleetId, vehicle);
        } catch (error: any) {
            console.log(error.message);
        }
    });

app
    .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
    .description("Localize a vehicle to a location")
    .action((fleetId: string, vehiclePlateNumber: string, lat: number, lng: number, alt: number = 0) => {
        //alt = alt || 0;
        try {
            const location = new Location(lat, lng, alt);
            repository.localizeVehicle(fleetId, vehiclePlateNumber, location);
        } catch (error: any) {
            console.log(error.message);
        }
    });

app.parse(process.argv);