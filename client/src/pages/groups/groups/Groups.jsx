import { useEffect, useState } from 'react'
import './groups.scss'
import AddGroup from '../../../components/addModal/AddGroup'
import { MdOutlineEditNote, MdDeleteOutline } from "react-icons/md"
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { NavLink } from 'react-router-dom'

export default function Groups() {
  const { token } = useAuthStore()
  const { getGroups, dataGroups } = useGroupStore()

  const [openModal, setOpenModal] = useState(false)

  useEffect(()=>{
    getGroups(token)

  },[])
  
  handleClick = () =>{
    <NavLink to={'/groups/new'}/>
  }
 
  return (
    <div className="groups">
      <div className="groupsInfo">
        <h1>Группы</h1>
        <button onClick={handleClick}>Добавить</button>
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
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {dataGroups.map((groups) => {
              return (
                <tr key={groups.id}>
                <td>{groups.id}</td>
                <td>{groups.name}</td>
                <td>пусто</td>
                <td>{groups.createAt}</td>
                <td>{groups.updateAt}</td>
                <td>
                  <div className='groupsActions'>
                    <div className='groupsActionsItem'>
                      <NavLink to={`/groups/${groups.id}`}>
                        <MdOutlineEditNote size='20px'/>
                      </NavLink>
                    </div>
                    <div className='groupsActionsItem'>
                      <span className='groupsActionsDelete'><MdDeleteOutline size='18px'/></span>
                    </div>
                  </div>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {openModal && <AddGroup slug="новой группы" setOpenModal={setOpenModal} />}
  
    </div>
  )
}



