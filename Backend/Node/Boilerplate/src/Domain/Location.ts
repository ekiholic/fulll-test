class Location {
    lat: number;
    lng: number;
    alt: number;

    constructor(lat: number, lng:number, alt: number = 0) {
        if (isNaN(lat) || isNaN(lng) || isNaN(alt)) {
            throw new Error("Location values invalid");
        }
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
    }

    isSameLocation(location: Location): boolean {
        return this.lat === location.lat && this.lng === location.lng && this.alt === location.alt;
    }
}

export { Location };