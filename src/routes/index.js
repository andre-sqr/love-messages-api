import messages from "./messagesRouter.js"

const routes = (app)=> {
    app.route('/').get((req, res)=> {
        res.status(200).send({
            titulo: "Love Messages API",
            versao: "1.0.0",
            autor: "André Siqueira"
        })
    })

    app.use(messages)
}

export default routes;