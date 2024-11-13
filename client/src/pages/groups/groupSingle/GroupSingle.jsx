import { useEffect, useState } from 'react'
import './groupSingle.scss'
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { useParams } from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md"

export default function GroupSingle() {
  const { token } = useAuthStore()
  const { id } = useParams()
  const { getGroup, dataGroup, addUserToGroup, getUsersInGroup, dataUsersGroup, getUsersFreeForGroup, dataUsersFreeForGroup, deleteUserFromGroup } = useGroupStore()

  const [selectedUserId, setSelectedUserId] = useState('')
  const [refreshKey, setRefreshKey] = useState(false)

  useEffect(()=>{
    getGroup(id, token)
    getUsersInGroup(id, token)
    getUsersFreeForGroup(id, token)
  },[refreshKey])
  

  const handleClickAddToGroup = async (e) => {
    e.preventDefault();
    const userId = selectedUserId
    const groupId = dataGroup.id  
      try {
        await addUserToGroup(userId, groupId, token)
        setSelectedUserId('')
        setRefreshKey(!refreshKey)
      } catch (err) {
        console.error('Ошибка при добавлении пользователя в группу:', err)
      } 
  }

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const userId = e.currentTarget.dataset.value
    const groupId = dataGroup.id
      try {
        await deleteUserFromGroup(userId, groupId, token)
        setRefreshKey(!refreshKey)
      } catch (err) {
        console.error('Ошибка при удалении пользователя из группы:', err)
      }
  }
  
 
  return (
    <div className="groupSingle">
      <div className="groupsInfo">
        <h1>Группа: {dataGroup.name}</h1>
      </div>
<div className='groupsCol'>
      <div className='groupsTableContainer'>
        <table className="rtable">
          <thead>
            <tr>
              <th>#</th>
              <th>Участники группы</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {dataUsersGroup.map((usersGroup, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td> 
                  <td>{usersGroup.name} {usersGroup.last_name}</td>
                  <td>                    
                    <div className='usersActionsItem'>
                      <span className='usersActionsDelete' onClick={handleClickDelete} data-value={usersGroup.id}>
                        <MdDeleteOutline size='18px'/>
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
            
          </tbody>
        </table>
      </div>
  
      <div className='groupsAddUserToGroup'>
        <p>Добавить пользователя в группу</p>
        <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
          <option value="">Выберите пользователя</option>
          {dataUsersFreeForGroup.map((user) => (
            <option key={user.id} value={user.id}>{user.name} {user.last_name}</option>
          ))}
        </select>
        {selectedUserId 
          ? 
          <button onClick={handleClickAddToGroup}>Добавить в группу</button>
          :
          <button disabled onClick={handleClickAddToGroup}>Добавить в группу</button>  
        }
      </div>
</div>

    </div>
  )
}



