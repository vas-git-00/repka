import { db } from '../config/database.js'

export const createGroup = (req, res) => {
    const { name } = req.body
    const companyId = req.companyId
                    
        const q = 'INSERT INTO `groups` (`company_id`, `name`) VALUES (?)'
        const values = [companyId, name]
            db.query(q, [values], (err, data) => {
                if (err) {
                    return res.status(500).send({message: err})
                }
                    return res.status(200).json({message: "Группа создана!"})
            })
}

export const getGroups = (req, res) => {
    const companyId = req.companyId

    const q = 'SELECT * FROM `groups` WHERE `company_id` = ?'
    const values = [companyId]
    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (!data.length) { 
            return res.status(403).json({message: "Групп у компании не существует!"})
        }
        
        return res.status(200).json({
            groupData: data,
            message: "Список групп успешно получен!"
        })        
            
    })
}

export const getGroupById = (req, res) => {
    const companyId = req.companyId
    const groupId = req.params.id
    
    const q = 'SELECT * FROM `groups` WHERE id = ? AND company_id = ?'
    const values = [groupId, companyId]

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }
        if (!data.length) { 
            return res.status(403).json({message: "Группы у компании не существует!"})
        }
        
        return res.status(200).json({
            groupData: data[0],
            message: "Данные группы успешно получены!"
        })        
            
    })
}

export const updateGroupById = (req, res) => {}

export const deleteGroupById = (req, res) => {}

export const addUserToGroup = (req, res) => {
    const { userId, groupId } = req.body
    const companyId = req.companyId

    const q = 'INSERT INTO `users_groups` (`company_id`, `user_id`, `group_id`) VALUES (?)'
    const values = [companyId, userId, groupId]

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }

        return res.status(200).json({ 
            //userGroupData: data,
            message: "Пользователь успешно добавлен в группу!" 
        })

    })   
}

//'SELECT * FROM `users_groups` WHERE company_id = ?'

export const getUsersInGroup = (req, res) => {
    const companyId = req.companyId
    const groupId = req.params.id

    //const q = `SELECT * FROM users_groups ug JOIN users u ON ug.user_id = u.id WHERE ug.company_id = ? AND ug.group_id = ?`
    const q = `SELECT * 
                FROM users_groups ug 
                JOIN users u ON ug.user_id = u.id 
                WHERE ug.company_id = ? AND ug.group_id = ?`

    db.query(q, [companyId, groupId], (err, data) => {
        if (err) {
            return res.status(500).json({message: err})
        }

        return res.status(200).json({ 
            usersGroupData: data,
            message: "Данные со списком пользователей, добавленных в группу, успешно получены!" 
        })

    })   
}
