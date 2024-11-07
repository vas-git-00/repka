import './login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../../utils/axios'
import useAuthStore from '../../../store/store';

export default function Login() {

  const { setUserData } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const { data } = await axios.post('api/login', {email, password})

            localStorage.setItem('token', data.token);
            
            setUserData(data.userData.name, data.userData.last_name, data.userData.email, data.userData.company)

            setEmail('')
            setPassword('')

            navigate('/');

    } catch (error) {
        console.log('Ошибка авторизации: ', error)
    }
    
  }

  return (
    <>
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
</>
  )
}
