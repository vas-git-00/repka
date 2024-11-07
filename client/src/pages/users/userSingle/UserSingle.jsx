import { useState, useEffect } from 'react'
import './userSingle.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useAuthStore from '../../../store/authStore'

export default function UserSingle() {
    const { token } = useAuthStore()
    const { id } = useParams()
    const [user, setUser] = useState([])

    
    const fetch = async () => {
      try {
          //const res = await axios.get(`https://erp.proprint.pro/test.php?id=${id}`)
          const { data } = await axios.get(`http://localhost:8800/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(data.userData)

      } catch (error) {
          console.log(error)
      }    
    }
  
  useEffect(() => {
    fetch()
    
  }, [])


  return (
    <div className="userSingle">
        <div className="usersInfo">
            <h1>Страница профиля {id}</h1>
        </div>
        <div className='usersTableContainer'>
        <table className="rtable">
          <thead>
            <tr>
              <th>id</th>
              <th>id Компании</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.company_id}</td>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                </tr>
          </tbody>
        </table>
      </div>

        {/* <button onClick={()=>setOpenModal(true)}>Добавить</button> */}
      </div>
  )
}
