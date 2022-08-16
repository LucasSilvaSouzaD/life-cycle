
import database from '../database.json'
import UserReport from './userReport.js'
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

        const report = UserReport.generateInstanceFromString(answer)
        terminalController.updateTable(report.formatted(DEFAULT_LANG))

        await save(report)
       return mainLoop()
    } catch (error) {
        console.error('dados inseridos incorretos, tente novamente...', error)
        return mainLoop()
    }
}

await mainLoop()



