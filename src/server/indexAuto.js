
import database from '../../database.json'

import TerminalController from '../controllers/terminalController.js'
import generateInstanceFromString from '../utils/generateInstanceFromString.js';

import { save } from '../utils/repository.js'
import { faker } from '@faker-js/faker';

import formatted from '../utils/formatted.js'

const DEFAULT_LANG = "pt-br"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const customerRent = {
            car: faker.vehicle.vehicle() + ',' + faker.vehicle.vehicle(),
            kmTraveled: Math.floor(Math.random() * 992183),
            from: "2003-03-03",
            to: "2002-02-02",
        }

        const {car, kmTraveled, from, to} = customerRent
  
        const answer = `${car.replace(/\s/g, '')} ${kmTraveled} ${from} ${to}`  

        const report = generateInstanceFromString(answer)
        
        const formattedData = formatted(DEFAULT_LANG, report)

        await save(formattedData).then(data => terminalController.updateTable(data))

       return setTimeout(() => mainLoop(), 7000)
    } catch (error) {
        console.error('dados inseridos incorretos, tente novamente...', error)
        return setTimeout(() => mainLoop(), 7000)
    }
}

await mainLoop()