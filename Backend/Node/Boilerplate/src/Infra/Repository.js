const Database = require('better-sqlite3');

const db = new Database('sqlite3.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS fleets (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS vehicles (
      plateNumber TEXT PRIMARY KEY,
      fleetId TEXT NOT NULL,
      lat FLOAT,
      lng FLOAT,
      alt FLOAT,
      FOREIGN KEY (fleetId) REFERENCES fleets(id)
    );
  `);