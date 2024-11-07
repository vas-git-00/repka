import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './users.scss'
import AddUser from '../../../components/addModal/AddUser'
import axios from 'axios'
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md"
import  useAuthStore  from '../../../store/authStore'

export default function Users() {
  const { token } = useAuthStore()
  const [openModal, setOpenModal] = useState(false)
  const [users, setUsers] = useState([])

  const fetch = async () => {
    try {
        //const res = await axios.get("https://erp.proprint.pro/test.php")
        const { data } = await axios.get('http://localhost:8800/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUsers(data.userData)
    } catch (error) {
        console.log(error)
    }    
}

useEffect(() => {
  fetch()
  
}, [])
 
  return (
    <div className="users">
      <div className="usersInfo">
        <h1>Пользователи</h1>
        <button onClick={()=>setOpenModal(true)}>Добавить</button>
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
            {users.map((user) => {
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

      {openModal && <AddUser slug="нового пользователя" setOpenModal={setOpenModal} />}
  
    </div>
  )
}



