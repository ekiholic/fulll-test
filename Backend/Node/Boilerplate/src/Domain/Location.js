class Location {
    constructor(lat, lng, alt = 0) {
        if (typeof lat !== "number" || typeof lng !== "number" || typeof alt !== "number") {
            throw new Error("Location values invalid");
        }
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
    }

    sameLocation(location) {
         return this.location.lat === location.lat && this.location.lng === location.lng && this.location.lat === location.lat;
    }
}

module.exports = Location;