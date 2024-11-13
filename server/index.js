import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//Роуты
import { authRouter } from './routes/authRoute.js'
import { userRouter } from './routes/userRoute.js'
import { groupRouter } from './routes/groupRoute.js'
import { roleRouter } from './routes/roleRoute.js'

const app = express()

//Мидлваре для app
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//Маршруты
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', roleRouter)

//Запуск сервера
app.listen(8800, () => {
    console.log('Сервер успешно запущен!')
}) 