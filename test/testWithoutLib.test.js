import Person from '../src/person.js'

const generateInstanceFromStringTest = () => {
    const person = Person.generateInstanceFromString(
        '1 Bike,Moto 30000 2000-01-01 2002-01-01'
    )

    const expected = {
        id: '1',
        vehicles: ['Bike', 'Moto'],
        kmTraveled: '30000',
        from: '2000-01-01',
        to: '2002-01-01'
    }

    return isEquals(person, expected) ? console.log("passing: 😁 generateInstanceFromStringTest") : console.log("failing: 🤬 generateInstanceFromStringTest")
}

const personFormattedTest = () => {
    const person = new Person({
        id: '1',
        vehicles: ['Bike', 'Moto'],
        kmTraveled: '30000',
        from: '2000-01-01',
        to: '2002-01-01'
    })

    const result = person.formatted("pt-br")

    const expected = {
        id: 1,
        vehicles: 'Bike e Moto',
        kmTraveled: '30.000 km',
        from: '01 de janeiro de 2000',
        to: '01 de janeiro de 2002'
    }

    return isEquals(result, expected) ? console.log("passing: 😁 personFormattedTest") : console.log("failing: 🤬 personFormattedTest")
}

const isEquals = (resultObject, expectedObject) => {

    const result = Object.keys(resultObject)
    const expected = Object.keys(expectedObject)
    const wrongValue = expected.filter(item => {
        // propriedade
        if (!result.includes(item)) return item
        // objeto
        if (resultObject[item].toString() !== expectedObject[item].toString()) return item
    })

    return wrongValue.length > 0 ? false : true

}

;
(() => {
    generateInstanceFromStringTest()
    personFormattedTest()
})();