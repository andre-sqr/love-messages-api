import express from "express";
import messagesController from "../controllers/messagesController.js";

const router = express.Router();

router
    .get('/messages', messagesController.buscarTodasAsMensagens)
    .get('/messages/id/:id', messagesController.buscarMensagensPorID)
    .get('/messages/date/:date', messagesController.buscarMensagensPorData)
    .post('/messages', messagesController.criarMensagem)
    .delete('/messages/id/:id', messagesController.deletarMensagem)
    .put('/messages/id/:id', messagesController.atualizarMensagens)

export default router;