"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha

const { expect } = chai



describe("Person", () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromSring(
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