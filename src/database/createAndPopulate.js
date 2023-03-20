import sqlite3 from "sqlite3";
import { dirname } from "path"
import { fileURLToPath } from "url";
sqlite3.verbose()

const filepath = dirname(fileURLToPath(import.meta.url)) + '/love-messages.db'
console.log(filepath);
const db = new sqlite3.Database(filepath);

const DATABASE_SCHEMA = [
    {
        table: "MESSAGES",
        message: "Tabela MESSAGES criada",
        query: `CREATE TABLE IF NOT EXISTS "MESSAGES" (
            "id" INTEGER PRIMARY KEY,
            "date" varchar(64), 
            "message" text
        )`,
    }
]

const POPULATION = [
    {
        table: "MESSAGES",
        message: "Tabela MESSAGES populada",
        query: `INSERT INTO MESSAGES (id, date, message)
        VALUES
        (1, "2023-04-04", "Teste de mensagem"),
        (2, "2023-04-05", "Tenho te amado tanto e de tal jeito como se a terra fosse um céu de brasa. Abrasa assim de amor todo meu peito como se a vida fosse voo e asa, iniciação e fim.\n— Hilda Hilst"),
        (3, "2023-04-06", "Teste de mensagem"),
        (4, "2023-04-07", "Teste de mensagem"),
        (5, "2023-04-08", "Teste de mensagem")`,
    }
]

const createAndPopulate = (...query)=> {
    query.forEach((query)=> {
        db.all(query.query, (err)=> {
            if (err) {
                console.log(err.message);
            } else {
                console.log(query.message);
            }
        })
    })
}

db.serialize(()=> {
    createAndPopulate(...DATABASE_SCHEMA)
    createAndPopulate(...POPULATION)
})