import messagesDAO from "../DAO/messagesDAO.js";
import { criaObjetoMessage } from "../services/messagesLogic.js";

const messagesModel = {
    buscarTodasAsMensagens: async ()=> {
        try {
            const dados = await messagesDAO.buscarMensagens()
            return {
                data: dados,
                status: 200
            }
        } catch (error) {
            return {
                errorMessage: error.message,
                status: 400
            }
        }
    },

    buscarMensagensPorID: async (id)=> {
        try {
            const dados = await messagesDAO.buscarMensagensPorID(id)
            if (dados) {
                return {
                    data: dados,
                    status: 200
                }
            }
        } catch (error) {
            return {
                errorMessage: error.message,
                status: 400
            }
        }
    },

    buscarMensagensPorData: async (date)=> {
        try {
            const dados = await messagesDAO.buscarMensagensPorData(date)
            if (dados) {
                return {
                    data: dados,
                    status: 200
                }
            }
        } catch (error) {
            return {
                errorMessage: error.message,
                status: 400
            }
        }
    },

    criarMensagens: async (mensagem)=> {
        try {
            const newMessageObj = await criaObjetoMessage(mensagem)
            if (newMessageObj[1].erro == false) {
                const dados = await messagesDAO.criarMensagens(newMessageObj[0])
                return {
                    feedback: 'message successfully created',
                    data: dados,
                    status: 201
                }
            } else {
                console.log(newMessageObj[1]);
                return {
                    feedback: newMessageObj[1].feedback,
                    data: newMessageObj[0],
                    status: 409
                }
            }
        } catch (error) {
            return {
                errorMessage: error.message,
                status: 400
            }
        }
    },

    deletarMensagens: async (id)=> {
        try {
            const answer = await messagesDAO.deletarMensagens(id)
            return {
                feedback: answer,
                status: 200
            }
        } catch (error) {
            return {
                errorMessage: error.message,
                status: 400
            }
        }
    }
}

export default messagesModel