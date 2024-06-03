import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app: Application = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))


// apis 
app.use("/api/v1", router)
app.get('/', (req, res) => {
    res.json({ message: 'hello world' })
})


app.use(globalErrorHandler)
export default app

