import db from "../database/connect.js";

const messagesDAO = {
    buscarMensagens: ()=> {
        const PEGA_TODAS_MENSAGENS = `
        SELECT * FROM MESSAGES
        `

        return new Promise((resolve, reject)=> {
            db.all(PEGA_TODAS_MENSAGENS, (error, row)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(row)
                }
            })
        })
    },

    buscarMensagensPorID: (id)=> {
        const PEGA_MENSAGEM_POR_ID = `
        SELECT * FROM MESSAGES
        WHERE id = ?
        `

        return new Promise((resolve, reject)=> {
            db.all(PEGA_MENSAGEM_POR_ID, id, (error, row)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(row)
                }
            })
        })
    },

    buscarMensagensPorData: (date)=> {
        const PEGA_MENSAGEM_POR_DATA = `
        SELECT * FROM MESSAGES
        WHERE date = ?
        `

        return new Promise((resolve, reject)=> {
            db.all(PEGA_MENSAGEM_POR_DATA, date, (error, row)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(row)
                }
            })
        })
    },

    criarMensagens: (mensagem)=> {
        const CRIA_MENSAGEM = `
        INSERT INTO MESSAGES (id, date, message)
        VALUES (?, ?, ?)
        `

        return new Promise((resolve, reject)=> {
            db.all(CRIA_MENSAGEM, mensagem.id, mensagem.date, mensagem.message, (error)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(mensagem)
                }
            })
        })
    },

    deletarMensagens: (id)=> {
        const DELETA_MENSAGEM = `
        DELETE FROM MESSAGES WHERE id = ?
        `

        return new Promise((resolve, reject)=> {
            db.all(DELETA_MENSAGEM, id, (error)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(`mensagem de id ${id} deletada com sucesso`)
                }
            })
        })
    },

    atualizarMensagens: (id, newMessage)=> {
        const ATUALIZA_MENSAGEM = `
        UPDATE MESSAGES
        SET date = ?, message = ?
        WHERE id = ?
        `

        return new Promise((resolve, reject)=> {
            db.run(ATUALIZA_MENSAGEM, newMessage.date, newMessage.message, id, (error)=> {
                if (error) {
                    reject(error)
                } else {
                    resolve(newMessage)
                }
            })
        })
    }
}

export default messagesDAO