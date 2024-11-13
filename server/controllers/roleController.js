import { db } from '../config/database.js'

export const getRoles = (req, res) => {
  //const companyId = req.companyId

  const q = 'SELECT * FROM roles'
  //const values = [companyId]
  db.query(q, (err, data) => {
      if (err) {
          return res.status(500).json(err)
      }
      if (!data.length) { 
          return res.status(403).json({message: "Ролей у компании не существует!"})
      }
      
      return res.status(200).json({
          roleData: data,
          message: "Список ролей успешно получен!"
      })        
          
  })
}