import express from "express";
import messagesController from "../controllers/messagesControllers.js";

const router = express.Router();

router
    .get('/messages', messagesController.buscarTodasAsMensagens)
    .get('/messages/id/:id', messagesController.buscarMensagensPorID)
    .get('/messages/date/:date', messagesController.buscarMensagensPorData)
    .post('/messages', messagesController.criarMensagem)


export default router;