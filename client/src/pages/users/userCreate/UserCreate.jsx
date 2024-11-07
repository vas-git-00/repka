import './userCreate.scss'
import useAuthStore from '../../../store/authStore'
import useUserStore from '../../../store/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserCreate() {
  const { token } = useAuthStore()
  const { createUser } = useUserStore()

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rPassword, setRPassword] = useState('')
  
  const navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password != rPassword) {
      console.log('Пароли не совпадают')
      return
    }
    createUser(name, lastName, email, password, token)
    setName('')
    setLastName('')
    setEmail('')
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
        <form className='form' onSubmit={handleSubmit}>
          <label>Имя</label>
          <input type='text' placeholder='Введите имя' value={name} onChange={(e) => (setName(e.target.value))}/>
          <label>Фамилия</label>
          <input type='text' placeholder='Введите фамилию' value={lastName} onChange={(e) => (setLastName(e.target.value))}/>
          <label>Почта</label>
          <input type='text' placeholder='Введите email' value={email} onChange={(e) => (setEmail(e.target.value))}/>
          <label>Пароль</label>
          <input type='password' placeholder='Введите пароль' value={password} onChange={(e) => (setPassword(e.target.value))}/>
          <label>Пароль повторно</label>
          <input type='password' placeholder='Введите пароль повторно' value={rPassword} onChange={(e) => (setRPassword(e.target.value))}/>
          <button>Создать</button>
        </form>
      </div>
    </div>
  )
}
