import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './users.scss'
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md"
import  useAuthStore  from '../../../store/authStore'
import useUserStore from '../../../store/userStore'
import dateFormat from 'dateformat'

export default function Users() {
  const { token } = useAuthStore()
  const { getUsers, dataUsers } = useUserStore()

  const { user_id, role_id } = jwtDecode(token) // получаем свой id из token

  useEffect(() => {
    getUsers(token)
    
  }, [])
 
  return (
    <div className="users">
      <div className="usersInfo">
        <h1>Пользователи</h1>
          {role_id === 1 
            ?
              <button>
                <NavLink to={'/users/new'}>Добавить</NavLink>
              </button>
            :
              ''
          }
      </div>
      <div className='usersTableContainer'>
        <table className="rtable">
          <thead>
            <tr>
              <th>id</th>
              { /*<th>id Компании</th> */ }
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Активный</th>
              <th>Дата создания</th>
              <th>Дата изменения</th>
              {role_id === 1 
                ?
                  <th>Действие</th>
                :
                ''
              }
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td><NavLink to={`/users/${user.id}`}>{user.id}</NavLink></td>
                  { /*<td>{user.company_id}</td> */}
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role_name}</td>
                  <td>{user.is_active ? 'Да' : 'Нет'}</td>
                  <td>{dateFormat(user.createdAt, 'dd.mm.yyyy HH:MM')}</td>
                  <td>{dateFormat(user.updateAt, 'dd.mm.yyyy HH:MM')}</td>
                  {role_id === 1
                    ?
                      <td>
                        <div className='usersActions'>
                          <div className='usersActionsItem'>
                            <span className='usersActionsEdit'>
                              <NavLink to={`/users/${user.id}`}>
                                <MdOutlineEditNote size='20px'/>
                              </NavLink>
                            </span>
                          </div>
                          <div className='usersActionsItem'>
                            {user_id != user.id
                              ?
                                <span className='usersActionsDelete'><MdDeleteOutline size='18px'/></span>
                              :
                                ''
                            }
                          </div>
                        </div>
                      </td>
                    :
                      ''
                  }
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}



