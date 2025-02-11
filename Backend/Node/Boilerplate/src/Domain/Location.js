class Location {
    constructor(lat, lng, alt = 0) {
        if (Number.isNaN(Number(lat)) || Number.isNaN(Number(lng)) || Number.isNaN(Number(alt))) {
            throw new Error("Location values invalid");
        }
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
    }

    isSameLocation(location) {
        if (!(location instanceof Location)) {
            throw new Error("Expected an instance of Location");
        }
        return this.lat === location.lat && this.lng === location.lng && this.alt === location.alt;
    }
}

module.exports = Location;