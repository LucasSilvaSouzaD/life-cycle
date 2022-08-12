import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'


describe("Person", () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Moto 30000 2000-01-01 2002-01-01'
        )

        const expected = {
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Moto'],
            kmTraveled: '30000',
            id: '1'
        }

        expect(person).to.be.deep.equal(expected)
    })

    it('should return value', () => {
        const person = new Person({
            from: '2000-01-01',
            to: '2002-01-01',
            vehicles: ['Bike', 'Moto'],
            kmTraveled: '30000',
            id: '1'
        })

        const result = person.formatted("pt-br")

        const expected = {
            id: 1,
            vehicles: 'Bike e Moto',
            kmTraveled: '30.000 km',
            from: '01 de janeiro de 2000',
            to: '01 de janeiro de 2002'
        }
        
        expect(result).to.be.deep.equal(expected)
    })
})