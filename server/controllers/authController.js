import { db } from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const registration = (req, res) => {
    const { company_name, name, last_name, email, password } = req.body


    const q = 'SELECT * FROM `users` WHERE `email` = ?' 
    const values = [email]
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (data.length) { 
            return res.status(403).json({message: "Такой пользователь уже существует!"})
        }
    
            const q = 'INSERT INTO `companys` (`name`) VALUES (?)'
            const values = [company_name]
            db.query(q, values, (err, data) => {
                if (err) {
                    return res.status(500).json({message: err})
                }
                
                    const salt = bcrypt.genSaltSync(10)
                    const hashPassword = bcrypt.hashSync(password, salt)

                    const q = 'INSERT INTO `users` (`company_id`, `name`, `last_name`, `email`, `password`, `role_id`) VALUES (?, ?, ?, ?, ?, ?)'
                    const values = [data.insertId, name, last_name, email, hashPassword, 1]
                   
                    db.query(q, values, (err, data) => {
                        if (err) {
                            return res.status(500).send({message: err})
                        }
                            return res.status(200).json({message: "Пользователь зарегистрирован!"})
                    })
                    
            }) 
    })
}

export const login = (req, res) => {
    const { email, password } = req.body

    //const q = "SELECT * FROM users WHERE email = ?"
    const q = `SELECT 
                        u.id,
                        u.name,
                        u.last_name,
                        u.email,
                        u.password,
                        u.company_id,
                        u.role_id,
                        u.is_active, 
                        c.name AS comany_name,
                        r.role_name
                    FROM 
                        users u
                    JOIN 
                        companys c ON u.company_id = c.id
                    JOIN    
                        roles r ON u.role_id = r.id
                    WHERE 
                        u.email = ?  AND u.is_active = 1`
    const values = [email]
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (data.length === 0) { 
            return res.status(404).json({message: "Пользователь не найден или отключен!"})
        }

        const isCorrectPassword = bcrypt.compareSync(password, data[0].password)

        if (!isCorrectPassword) {
            return res.status(400).json({message: "Введен неверный email или пароль!"})
        }

        const token = jwt.sign({user_id: data[0].id, company_id: data[0].company_id, role_id: data[0].role_id}, "secretkey", {expiresIn: '30d'})

        return res.status(200).json({
            userData: data[0],
            token: token,
            message: "Успешная авторизация!"
        })  
        
    })
}

export const authMe = (req, res) => {
        const id = req.userId
        const q = `SELECT 
                        u.id,
                        u.name,
                        u.last_name,
                        u.email,
                        u.company_id, 
                        c.name
                    FROM 
                        users u
                    JOIN 
                        companys c ON u.company_id = c.id
                    WHERE 
                        u.id = ?`
        const values = [id]
        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            if (!data.length) {
                return res.status(404).json("Пользователь не существует. Доступ запрещен! Yes?")
            }
            
            const token = jwt.sign({user_id: data[0].id, company_id: data[0].company_id}, "secretkey", {expiresIn: '30d'})
//, company_id: data[0].company_id
            return res.status(200).json({
                userData: data[0],
                token: token,
                message: "Авторизация проверена успешно!"
            })

        })

}