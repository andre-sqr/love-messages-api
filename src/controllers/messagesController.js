import messagesModel from "../models/messagesModel.js";

const messagesController = {
    buscarTodasAsMensagens: async (req, res)=> {
        try {
            const answer = await messagesModel.buscarTodasAsMensagens()

            if (answer.status == 200) {
                res.status(answer.status).json({
                    "mensagens": answer.data,
                    "erro": false
                })
            } else {
                res.status(answer.status).json({
                    "mensagem": answer.errorMessage,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "mensagem": error.message,
                "erro": true
            })
        }
    },

    buscarMensagensPorID: async (req, res)=> {
        const msgId = req.params.id
        try {
            const answer = await messagesModel.buscarMensagensPorID(msgId)
            if (answer.status == 200) {
                if (answer.data.length !== 0) {
                    res.status(answer.status).json({
                        "mensagem": answer.data,
                        "erro": false
                    })
                } else {
                    res.status(404).json({
                        "feedback": 'message not found',
                        "erro": true
                    })
                }
            } else {
                res.status(answer.status).json({
                    "feedback": answer.errorMessage,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "feedback": error.message,
                "erro": true
            })
        }
    },

    buscarMensagensPorData: async (req, res)=> {
        const msgDate = req.params.date
        try {
            const answer = await messagesModel.buscarMensagensPorData(msgDate)
            if (answer.status == 200) {
                if (answer.data.length !== 0) {
                    res.status(answer.status).json({
                        "mensagem": answer.data,
                        "erro": false
                    })
                } else {
                    res.status(404).json({
                        "feedback": 'message not found',
                        "erro": true
                    })
                }
            } else {
                res.status(answer.status).json({
                    "feedback": answer.errorMessage,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "feedback": error.message,
                "erro": true
            })
        }
    },

    criarMensagem: async (req, res)=> {
        const body = req.body
        const id = req.body.id
        try {
            const searchPreviousId = await messagesModel.buscarMensagensPorID(id)
            if (searchPreviousId.data.length == 0) {
                const answer = await messagesModel.criarMensagens(body)

                if (answer.status == 200) {
                    res.status(answer.status).json({
                        "feedback": answer.feedback,
                        "mensagem": answer.data,
                        "erro": false
                    })
                } else {
                    res.status(answer.status).json({
                        "feedback": answer.feedback,
                        "mensagem": answer.data,
                        "erro": true
                    })
                }
            } else {
                res.status(409).json({
                    "feedback": `the request's ID is already taken`,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "feedback": error.message,
                "erro": true
            })
        }
    },

    deletarMensagem: async (req, res)=> {
        const id = req.params.id
        try {
            const searchPreviousId = await messagesModel.buscarMensagensPorID(id)
            if (searchPreviousId.data.length != 0) {
                const answer = await messagesModel.deletarMensagens(id)

                if (answer.status == 200) {
                    res.status(answer.status).json({
                        "feedback": answer.feedback,
                        "erro": false
                    })
                } else {
                    res.status(answer.status).json({
                        "feedback": answer.errorMessage,
                        "erro": true
                    })
                }
            } else {
                res.status(404).json({
                    "feedback": `request's ID does not exist`,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "feedback": error.message,
                "erro": true
            })
        }
    },

    atualizarMensagens: async (req, res)=> {
        const id = req.params.id
        const body = await req.body
        try {
            const searchPreviousId = await messagesModel.buscarMensagensPorID(id)
            if (searchPreviousId.data.length != 0) {
                const answer = await messagesModel.atualizarMensagens(id, body)
                if (answer.status == 201) {
                    res.status(answer.status).json({
                        "feedback": answer.feedback,
                        "erro": false
                    })
                }
            } else {
                res.status(404).json({
                    "feedback": `request's ID does not exist`,
                    "erro": true
                })
            }
        } catch (error) {
            res.status(500).json({
                "feedback": error.message,
                "erro": true
            })
        }
    }
}

export default messagesController