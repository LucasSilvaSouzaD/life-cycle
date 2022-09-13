export default class UserReport {
    constructor({ id, vehicles, kmTraveled, from, to}) {
        this.id = id
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled
        this.from = from
        this.to = to
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' '
        const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)

        const report = new UserReport({
            id,
            kmTraveled,
            from,
            to,
            vehicles: vehicles.split(',')
        })

        return report
    }
}