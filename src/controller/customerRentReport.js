export default class CustomerRentReport {
    constructor({ id, vehicles, kmTraveled, from, to }) {
        this.id = id ? id : Math.ceil(Math.random() * 989)
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled
        this.from = from
        this.to = to
    }
}