import express from "express";
import cors from "cors";
import routes from "./routes/index.js"

const app = express()

app.use(express.json(),
cors())

routes(app)

export default app;