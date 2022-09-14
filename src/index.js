
import database from '../database.json'
import CustomerRentReport from './customerRentReport.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'
import formatted from './util/formatted.js'

const DEFAULT_LANG = "pt-br"
const STOP_TERM = ":q"

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question()
        if (answer === STOP_TERM) return terminalController.closeTerminal()

        const report = CustomerRentReport.generateInstanceFromString(answer)
        
        terminalController.updateTable(formatted(DEFAULT_LANG, report))

        await save(report)
        
       return mainLoop()
    } catch (error) {
        console.error('dados inseridos incorretos, tente novamente...', error)
        return mainLoop()
    }
}

await mainLoop()



