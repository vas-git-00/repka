import { useEffect } from 'react'
import './userSingle.scss'
import { useParams } from 'react-router-dom'
import useAuthStore from '../../../store/authStore'
import useUserStore from '../../../store/userStore'

export default function UserSingle() {
  const { token } = useAuthStore()
  const { getUser, dataUser } = useUserStore()
  const { id } = useParams()
  
  useEffect(() => {
    getUser(id, token)
    
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
              <th>Роль</th>
              <th>Активный</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{dataUser.id}</td>
                <td>{dataUser.company_id}</td>
                <td>{dataUser.name}</td>
                <td>{dataUser.last_name}</td>
                <td>{dataUser.email}</td>
                <td>{dataUser.role_name}</td>
                <td>{dataUser.is_active ? 'Да' : 'Нет'}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
