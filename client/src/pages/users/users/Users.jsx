import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './users.scss'
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md"
import  useAuthStore  from '../../../store/authStore'
import useUserStore from '../../../store/userStore'

export default function Users() {
  const { token } = useAuthStore()
  const { getUsers, dataUsers } = useUserStore()


  useEffect(() => {
    getUsers(token)
    
  }, [])
 
  return (
    <div className="users">
      <div className="usersInfo">
        <h1>Пользователи</h1>
        <button>
          <NavLink to={'/users/new'}>Добавить</NavLink>
        </button>
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
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td><NavLink to={`/users/${user.id}`}>{user.id}</NavLink></td>
                  <td>{user.company_id}</td>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>Пусто</td>
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
                        <span className='usersActionsDelete'><MdDeleteOutline size='18px'/></span>
                      </div>
                    </div>
                  </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  )
}



