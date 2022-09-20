import readline from 'readline'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language) {
        DraftLog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTables(database)
    }

    initializeTables(database) {
        const data = database
        const table = chalkTable(this.getTableOptions(), data)

        this.print = console.draft(table)
        this.data = data
    }

    updateTable(database) {
        this.data = database
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    question(msg = 'Digite as informações separados por espaço: ') {
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal() {
        this.terminal.close()
        console.log("process finished")
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID")},
                { field: "vehicles", name: chalk.cyan("Vehicles")},
                { field: "kmTraveled", name: chalk.cyan("kmTraveled")},
                { field: "from", name: chalk.cyan("from")},
                { field: "to", name: chalk.cyan("to")},
            ]
        }
    }
}
