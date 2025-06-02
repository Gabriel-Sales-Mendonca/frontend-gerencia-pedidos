export interface IUserLocation {
    userId: string
    locationId: string
}

export interface IUserLocationRequest {
    user: {
        id: number,
        name: string
    },
    location: {
        id: number,
        name: string
    }
}