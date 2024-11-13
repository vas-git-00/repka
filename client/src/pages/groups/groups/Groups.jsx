import { useEffect, useState } from 'react'
import './groups.scss'
import { jwtDecode } from 'jwt-decode'
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md"
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { NavLink } from 'react-router-dom'
import dateFormat from 'dateformat'

export default function Groups() {
  const { token } = useAuthStore()
  const { getGroups, dataGroups, deleteGroup } = useGroupStore()
  const [refreshkey, setRefreshKey] = useState(false)

  const { role_id } = jwtDecode(token) 


  useEffect(()=>{
    getGroups(token)

  },[refreshkey])
  
  const handleClickDelete = async (e) => {
    e.preventDefault();
    const groupId = e.currentTarget.dataset.value
      try {
        await deleteGroup(groupId, token)
        setRefreshKey(!refreshkey)
      } catch (err) {
        console.error('Ошибка при удалении пользователя из группы:', err)
      }
  } 

  return (
    <div className="groups">
      <div className="groupsInfo">
        <h1>Группы</h1>
          {role_id === 1 
            ? 
              <button>
                <NavLink to={'/groups/new'}>Добавить</NavLink>
              </button>
            :
              ''
          }
      </div>
      <div className='groupsTableContainer'>
        <table className="rtable">
          <thead>
            <tr>
              <th>id</th>
              <th>Название группы</th>
              <th>Кол-во участников</th>
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
            {dataGroups.map((groups) => {
              return (
                <tr key={groups.id}>
                  <td>{groups.id}</td>
                  <td>{groups.name}</td>
                  <td>пусто</td>
                  <td>{dateFormat(groups.createAt, 'dd.mm.yyyy HH:MM')}</td>
                  <td>{dateFormat(groups.updateAt, 'dd.mm.yyyy HH:MM')}</td>
                  {role_id === 1
                    ?
                      <td>
                        <div className='groupsActions'>
                          <div className='groupsActionsItem'>
                            <NavLink to={`/groups/${groups.id}`}>
                              <MdOutlineEditNote size='20px'/>
                            </NavLink>
                          </div>
                          <div className='groupsActionsItem'>
                            <span className='groupsActionsDelete' onClick={handleClickDelete} data-value={groups.id}>
                              <MdDeleteOutline size='18px'/>
                            </span>
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



