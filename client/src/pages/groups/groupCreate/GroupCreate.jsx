import './groupCreate.scss'
import { jwtDecode } from 'jwt-decode'
import useGroupStore from '../../../store/groupStore'
import useAuthStore from '../../../store/authStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GroupCreate() {
  const { token } = useAuthStore()
  const { createGroup } = useGroupStore()

  const [name, setName] = useState('')

  const navigate = useNavigate()
  
  const decoded = jwtDecode(token)
  const company_id = decoded.company_id


  const handleSubmit = (e) => {
    e.preventDefault();
    createGroup(company_id, name, token)
    setName('')
    navigate('/groups')
  }

 
  return (
    <div className="groupCreate">
      <div className="groupsInfo">
        <h1>Создание новой группы</h1>
      </div>
      <div className='groupsTableContainer'>
        <form className='form' onSubmit={handleSubmit}>
          <label>Название группы</label>
          <input type='text' placeholder='Введите название группы' value={name} onChange={(e) => (setName(e.target.value))}/>
          <button>Создать</button>
        </form>
      </div>
  
    </div>
  )
}



