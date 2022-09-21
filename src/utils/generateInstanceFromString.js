import CustomerRentReport from "../controller/customerRentReport.js"

export default function generateInstanceFromString(text) {
    const EMPTY_SPACE = ' '
    const [vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
    
    const report = new CustomerRentReport({
        kmTraveled,
        from,
        to,
        vehicles: vehicles.split(',')
    })

    return report
}