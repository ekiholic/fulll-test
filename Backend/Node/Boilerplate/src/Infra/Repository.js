const Database = require('better-sqlite3');
const { register } = require('module');

const db = new Database('sqlite3.db');

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
function fleetExists(fleetId) {
    const res = db.prepare(`SELECT COUNT(*) FROM fleets WHERE id = ?`).get(fleetId);
    if (res['COUNT(*)'] > 0) {
        return true;
    } else {
        return false;
    }
}

// Verify that the vehicle isn't already registered
function isVehicleRegistered(fleetId, vehiclePlateNumber) {
    const res = db.prepare(`SELECT COUNT(*) FROM vehicles WHERE plateNumber = ? and fleetId = ?`).get(vehiclePlateNumber, fleetId);
    if (res['COUNT(*)'] > 0) {
        return true;
    } else {
        return false;
    }
}

// Verify that the vehicle isn't localized to the same location
function isSameLocation(vehiclePlateNumber, lat, lng, alt) {
    const res = db.prepare(`SELECT * FROM vehicles WHERE plateNumber = ?`).get(vehiclePlateNumber);
    if (res.lat == lat && res.lng == lng && res.alt == alt) {
        return true;
    } else {
        return false;
    }
}

// Create fleet with userId
function createFleet(userId) {
    const fleetId = `${userId}-fleet`;
    if (fleetExists(fleetId)) {
        throw new Error(`Fleet already created : ${fleetId}`);
    }
    db.prepare(`INSERT INTO fleets (id, userId) VALUES (?, ?)`).run(fleetId, userId);
    console.log(`Fleet successfully created: ${fleetId}`);
}

// Register vehicle to a fleet
function registerVehicle(fleetId, vehiclePlateNumber) {
    if (!fleetExists(fleetId)) {
        throw new Error(`${fleetId} doesn't exist`)
    } else if (isVehicleRegistered(fleetId, vehiclePlateNumber)) {
        throw new Error(`Vehicle ${vehiclePlateNumber} already registered`);
    }
    db.prepare(`INSERT INTO vehicles (plateNumber, fleetId) VALUES (?, ?)`).run(vehiclePlateNumber, fleetId);
    console.log(`Vehicle ${vehiclePlateNumber} registered successfully`);
}

// Set the location of the given vehicle
function localizeVehicle(fleetId, vehiclePlateNumber, lat, lng, alt) {
    if (!isVehicleRegistered(fleetId, vehiclePlateNumber)) {
        throw new Error(`Vehicle ${vehiclePlateNumber} isn't registered in ${fleetId}`);
    } else if (isSameLocation(vehiclePlateNumber, lat, lng, alt)) {
        throw new Error(`Vehicle ${vehiclePlateNumber} already parked at this location`);
    }
    db.prepare(`UPDATE vehicles SET lat = ?, lng = ?, alt = ? WHERE plateNumber = ?`).run(lat, lng, alt, vehiclePlateNumber);
    console.log(`Vehicle ${vehiclePlateNumber} parked successfully`)
}

module.exports =  { createFleet, registerVehicle, localizeVehicle };