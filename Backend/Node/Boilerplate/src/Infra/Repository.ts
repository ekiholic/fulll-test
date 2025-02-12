import Database from 'better-sqlite3';
import { Fleet } from '../Domain/Fleet';
import { Location } from '../Domain/Location';
import { Vehicle } from '../Domain/Vehicle';

const db = new Database('sqlite3.db');

// Initialize tables
db.exec(`
    CREATE TABLE IF NOT EXISTS fleets (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plateNumber TEXT NOT NULL,
      fleetId TEXT NOT NULL,
      lat FLOAT,
      lng FLOAT,
      alt FLOAT,
      FOREIGN KEY (fleetId) REFERENCES fleets(id)
    );
  `);

// Verify that the fleet doesn't already exists
function isFleetExist(fleetId: string): boolean {
    const res = db.prepare(`SELECT * FROM fleets WHERE id = ?`).get(fleetId);
    return !!res;
}

// Verify that the vehicle isn't already registered
function isVehicleRegistered(fleetId: string, vehiclePlateNumber: string): boolean {
    const res = db.prepare(`SELECT * FROM vehicles WHERE plateNumber = ? and fleetId = ?`).get(vehiclePlateNumber, fleetId);
    return !!res;
}

// Verify that the vehicle isn't localized to the same location
function isSameLocation(vehiclePlateNumber: string, location: Location): boolean {
    const res = db.prepare(`SELECT * FROM vehicles WHERE plateNumber = ?`).get(vehiclePlateNumber) as { lat: number; lng: number; alt: number } | undefined;
    return res !== undefined && res.lat == location.lat && res.lng == location.lng && res.alt == location.alt;
}

// Create fleet with userId
function createFleet(fleet: Fleet): void {
    if (isFleetExist(fleet.id)) {
        throw new Error(`Fleet already created : ${fleet.id}`);
    }
    db.prepare(`INSERT INTO fleets (id, userId) VALUES (?, ?)`).run(fleet.id, fleet.userId);
    console.log(`Fleet successfully created: ${fleet.id}`);
}

// Register vehicle to a fleet
function registerVehicle(fleetId: string, vehicle: Vehicle): void {
    if (!isFleetExist(fleetId)) {
        throw new Error(`${fleetId} doesn't exist`);
    } else if (isVehicleRegistered(fleetId, vehicle.plateNumber)) {
        throw new Error(`Vehicle ${vehicle.plateNumber} already registered`);
    }
    db.prepare(`INSERT INTO vehicles (plateNumber, fleetId) VALUES (?, ?)`).run(vehicle.plateNumber, fleetId);
    console.log(`Vehicle ${vehicle.plateNumber} registered successfully`);
}

// Set the location of the given vehicle
function localizeVehicle(fleetId: string, vehiclePlateNumber: string, location: Location): void {
    if (!isVehicleRegistered(fleetId, vehiclePlateNumber)) {
        throw new Error(`Vehicle ${vehiclePlateNumber} isn't registered in ${fleetId}`);
    } else if (isSameLocation(vehiclePlateNumber, location)) {
        throw new Error(`Vehicle ${vehiclePlateNumber} already parked at this location`);
    }
    db.prepare(`UPDATE vehicles SET lat = ?, lng = ?, alt = ? WHERE plateNumber = ?`).run(location.lat, location.lng, location.alt, vehiclePlateNumber);
    console.log(`Vehicle ${vehiclePlateNumber} parked successfully`);
}

export { createFleet, registerVehicle, localizeVehicle };