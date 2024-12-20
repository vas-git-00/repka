import { db } from '../config/database.js'
import bcrypt from 'bcryptjs'

export const createUser = (req, res) => {
    const { name, lastName, email, password, selectedRoleId } = req.body
    const companyId = req.companyId

    const q = 'SELECT * FROM `users` WHERE `email` = ?'
    const values = [email]
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (data.length) { 
            return res.status(403).json({message: "Такой пользователь уже существует!"})
        }
   
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(password, salt)
                    
            const q = 'INSERT INTO `users` (`company_id`, `name`, `last_name`, `email`, `password`, `role_id`) VALUES (?)'
            const values = [companyId, name, lastName, email, hashPassword, selectedRoleId]
                db.query(q, [values], (err, data) => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                        return res.status(200).json({message: "Пользователь создан!"})
                })
    })
}

export const getUsers = (req, res) => {
    const companyId = req.companyId
    //const userRole = req.roleId

    const q = 'SELECT users.*, roles.role_name FROM `users` JOIN roles ON users.role_id = roles.id WHERE users.company_id = ?'
    const values = [companyId]
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (!data.length) { 
            return res.status(403).json({message: "Пользователей у компании не существует!"})
        }
        
        return res.status(200).json({
            userData: data,
            message: "Список пользователей успешно получен!"
        })        
            
    })
}

export const getUserById = (req, res) => {
    const companyId = req.companyId
    const userId = req.params.id
    
    const q = 'SELECT users.*, roles.role_name FROM `users` JOIN roles ON users.role_id = roles.id WHERE users.id = ? AND users.company_id = ?'
    const values = [userId, companyId]

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (!data.length) { 
            return res.status(403).json({message: "Пользователя у компании не существует!"})
        }
        
        return res.status(200).json({
            userData: data[0],
            message: "Данные пользователя успешно получены!"
        })        
            
    })
}

export const updateUserById = (req, res) => {}

export const deleteUserById = (req, res) => {}






