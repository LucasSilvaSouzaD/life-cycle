
import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

const DEFAULT_LANG = "pt-br"
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question()
        if (answer === STOP_TERM) return terminalController.closeTerminal()

        const person = Person.generateInstanceFromSring(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))

        await save(person)
       return mainLoop()
    } catch (error) {
        console.error('DEU RUIM', error)
        return mainLoop()
    }
}

await mainLoop()



