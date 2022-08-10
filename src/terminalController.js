import readline from 'readline'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import Person from './person.js'


export default class terminalController {
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

        this.initializeTables(database, language)
    }

    initializeTables(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data)

        this.print = console.draft(table)
        this.data = data
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    question(msg = '') {
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
