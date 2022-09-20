import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import CustomerRentReport from '../src/controller/customerRentReport.js'
import formatted from '../src/utils/formatted.js'

describe("Person", () => {
    it('should return a person instance from a string', () => {

        const person = CustomerRentReport.generateInstanceFromString(
            'Bike,Moto 30000 2000-01-01 2002-01-01'
        )
        delete person.id

        const expected = {
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Moto'],
            kmTraveled: '30000',
        }

        expect(person).to.be.deep.equal(expected)
    })

    it('should return value', () => {
        const person = new CustomerRentReport({
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Moto'],
            kmTraveled: '30000',
        })

        const result = formatted("pt-br", person)
        delete result.id

        const expected = {
            vehicles: 'Bike e Moto',
            kmTraveled: '30.000 km',
            from: '01 de janeiro de 2000',
            to: '01 de janeiro de 2002'
        }
        
        expect(result).to.be.deep.equal(expected)
    })
})