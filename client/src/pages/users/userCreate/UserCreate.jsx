import './userCreate.scss'
import useAuthStore from '../../../store/authStore'
import useUserStore from '../../../store/userStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRoleStore from '../../../store/roleStore'

export default function UserCreate() {
  const { token } = useAuthStore()
  const { createUser, getUsers } = useUserStore()
  const { dataRoles, getRoles } = useRoleStore()

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    getRoles(token)
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != rPassword) {
      console.log('Пароли не совпадают')
      return
    }
    createUser(name, lastName, email, password, selectedRoleId, token)
      setName('')
      setLastName('')
      setEmail('')
      setSelectedRoleId('')
      setPassword('')
      setRPassword('')
    
    navigate('/users')
  }


  return (
    <div className="userCreate">
      <div className="usersInfo">
          <h1>Создание нового пользователя</h1>
      </div>
      <div className='usersTableContainer'>

        <form onSubmit={handleSubmit}>
            <div className='user-details-create'>
                <div className='input-box-create'>
                    <span className='details-create'>Имя</span>
                    <input 
                        type='text' 
                        placeholder='Введите имя' 
                        value={name}
                        onChange={(e)=>(setName(e.target.value))}
                    />
                </div>
                <div className='input-box-create'>
                    <span className='details-create'>Фамилия</span>
                    <input 
                        type='text' 
                        placeholder='Введите фамилию' 
                        value={lastName}
                        onChange={(e)=>(setLastName(e.target.value))}
                    />
                </div>
                <div className='input-box-create'>
                    <span className='details-create'>Почта</span>
                    <input 
                        type='text' 
                        placeholder='Введите почту' 
                        value={email}
                        onChange={(e)=>(setEmail(e.target.value))}
                    />
                </div>
                <div className='input-box-create'>
                    <span className='details-create'>Роль</span>
                    <select onChange={(e) => setSelectedRoleId(e.target.value)} value={selectedRoleId}>
                      <option value="">Выберите роль</option>
                        {dataRoles.map((roles) => (
                          <option key={roles.id} value={roles.id}>{roles.role_name}</option>
                        ))}
                    </select>
                </div>
                <div className='input-box-create'>
                    <span className='details-create'>Пароль</span>
                    <input 
                        type='password' 
                        placeholder='Введите пароль' 
                        value={password}
                        onChange={(e)=>(setPassword(e.target.value))}
                    />
                </div>
                <div className='input-box-create'>
                    <span className='details-create'>Пароль повторно</span>
                    <input 
                        type='password' 
                        placeholder='Введите пароль повторно' 
                        value={rPassword}
                        onChange={(e)=>(setRPassword(e.target.value))}
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
