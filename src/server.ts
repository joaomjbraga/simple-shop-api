import express from 'express'
import { GeralRoutes } from '@/routes/index.js'
import { ErrorHandling } from './middlewares/Error-handling.js'

const PORT = 3000

const app = express()
app.use(express.json())
app.use(GeralRoutes)
app.use(ErrorHandling)

app.listen(PORT, () => console.log('Servidor ONLINE 🦸'))
