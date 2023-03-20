import sqlite from "sqlite3";
import { dirname } from "path"
import { fileURLToPath } from "url";
sqlite.verbose()

const dbname = 'love-messages.db'
const filepath = dirname(fileURLToPath(import.meta.url)) + `/${dbname}`

let db = new sqlite.Database(filepath, (error)=> {
    if (error) {
        console.log(`Erro: ${error.message}`)
    } else {
        console.log(`Banco de dados ${dbname} conectado`);
    }
})

process.on('SIGINT', ()=> {
    db.close(()=> {
        console.log(`Banco de dados ${dbname} encerrado`);
        process.exit(0)
    })
})

export default db