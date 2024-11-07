import './groupCreate.scss'
import useAuthStore from '../../../store/authStore'
import useGroupStore from '../../../store/groupStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GroupCreate() {
  const { token } = useAuthStore()
  const { createGroup } = useGroupStore()

  const [name, setName] = useState('')

  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createGroup(name, token)
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



