import { useEffect } from 'react'
import './groupCreate.scss'
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'

export default function GroupCreate() {
  //const { token } = useAuthStore()
  //const {  } = useGroupStore()
  

  useEffect(()=>{
    

  },[])

 
  return (
    <div className="groupSingle">
      <div className="groupsInfo">
        <h1>Создание новой группы</h1>
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
            <tr >
              <td></td>
              <td></td>
              <td>пусто</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
  
    </div>
  )
}



