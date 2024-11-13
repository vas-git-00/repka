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
        <form onSubmit={handleSubmit}>
            <div className='group-details-create'>
                <div className='input-box-create'>
                    <span className='details-create'>Название группы</span>
                    <input 
                        type='text' 
                        placeholder='Введите название группы' 
                        value={name}
                        onChange={(e)=>(setName(e.target.value))}
                    />
                </div>
            </div>

            <div className='button-create'>
                <button>Создать</button>
            </div>
        </form>
        
      </div>
    </div>
  )
}



