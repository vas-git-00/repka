import { useEffect, useState } from 'react'
import './groupSingle.scss'
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { useParams } from 'react-router-dom'
import useUserStore from '../../../store/userStore'

export default function GroupSingle() {
  const { token } = useAuthStore()
  const { id } = useParams()
  const { getGroup, dataGroup, addUserToGroup, getUsersInGroup, dataUsersGroup } = useGroupStore()
  const { getUsers, dataUsers} = useUserStore()

  const [selectedUserId, setSelectedUserId] = useState('')
  

  useEffect(()=>{
    getGroup(id, token)
    getUsers(token)
    getUsersInGroup(id, token)

  },[])


  const handleClick = (e) => {
    e.preventDefault();
    addUserToGroup(selectedUserId, dataGroup.id, token)
    getUsersInGroup(id, token)
    setSelectedUserId('')
  }
  
 
  return (
    <div className="groupSingle">
      <div className="groupsInfo">
        <h1>Группа: {dataGroup.name}</h1>
      </div>

      <div className='groupsAddUserToGroup'>
        <p>Добавить пользователя в группу</p>
        <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
          <option value="">Выберите пользователя</option>
          {dataUsers.map((user) => (
            <option key={user.id} value={user.id}>{user.name} {user.last_name}</option>
          ))}
        </select>
        <button onClick={handleClick}>Добавить в группу</button>
      </div>

      <div className='groupsTableContainer'>
        <table className="rtable">
          <thead>
            <tr>
              <th>#</th>
              <th>Участники группы</th>
            </tr>
          </thead>
          <tbody>
            {dataUsersGroup.map((usersGroup, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td> 
                  <td>{usersGroup.name} {usersGroup.last_name}</td>
                </tr>
              )
            })}
            
          </tbody>
        </table>
      </div>
  
    </div>
  )
}



