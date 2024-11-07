import { useEffect } from 'react'
import './groupSingle.scss'
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { useParams } from 'react-router-dom'

export default function GroupSingle() {
  const { token } = useAuthStore()
  const { id } = useParams()
  const { getGroup, dataGroup } = useGroupStore()
  

  useEffect(()=>{
    getGroup(id, token)

  },[])
  console.log(dataGroup)
 
  return (
    <div className="groupSingle">
      <div className="groupsInfo">
        <h1>Страница группы {id}</h1>
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
            </tr>
          </thead>
          <tbody>
            <tr key={dataGroup.id}>
              <td>{dataGroup.id}</td>
              <td>{dataGroup.name}</td>
              <td>пусто</td>
              <td>{dataGroup.createAt}</td>
              <td>{dataGroup.updateAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
    </div>
  )
}



