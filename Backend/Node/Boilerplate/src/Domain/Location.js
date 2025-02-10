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
         return this.location.lat === location.lat && this.location.lng === location.lng && this.location.lat === location.lat;
    }
}

module.exports = Location;