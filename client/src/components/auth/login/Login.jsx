import './login.scss'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../../../store/authStore';

export default function Login() {

  const { login, isAuthenticated } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <>
    {isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <form onSubmit={handleLogin}>
            <div className='user-details-registration'>
                <div className='input-box-registration'>
                    <span className='details-registration'>Почта</span>
                    <input 
                        type='text' 
                        placeholder='Почта' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='input-box-registration'>
                    <span className='details-registration'>Пароль</span>
                    <input 
                        type='password' 
                        placeholder='Пароль' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className='button-registration'>
                <button type='submit'>Авторизоваться</button>
            </div>
        </form>
    )}
</>
  )
}
