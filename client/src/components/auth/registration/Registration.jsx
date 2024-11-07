import { Link, useNavigate } from 'react-router-dom'
import './registration.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../../../utils/axios'
import useAuthStore from '../../../store/store'

export default function Registration() {

  const { setLogReg } = useAuthStore() //Вынести в отдельный стор!

  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')

  const handelRegistration = async (e) => {
    e.preventDefault()
    if (company === '') {
        toast.warn('Введите название проекта.')
        return
    }
    if (email === '') {
        toast.warn('Введите email.')
        return
    }
    if (name === '') {
        toast.warn('Введите Ваше имя.')
        return
    }
    if (lastName === '') {
        toast.warn('Введите Вашу фамилию.')
        return
    }
    if (password === '') {
        toast.warn('Введите пароль.')
        return
    }
    if (repPassword === '') {
        toast.warn('Введите повтор пароля.')
        return
    }
    if (password !== repPassword) {
        toast.warn('Пароли не совпадают!')
        setPassword('')
        setRepPassword('')
        return
    }
    
    try {
        const { data } = await axios.post('api/registration', {company, email, name, lastName, password})
            setCompany('')
            setEmail('')
            setName('')
            setLastName('')
            setPassword('')
            setRepPassword('')
    
            setLogReg(false)

    } catch (error) {
        console.log('Ошибка регистрации: ', error)
        toast.error('Такой пользователь уже зарегистрирован!')
    }
  }

  return (
    <>
        <form onSubmit={handelRegistration}>
            <div className='user-details-registration'>
                <div className='input-box-registration'>
                    <span className='details-registration'>Название проекта</span>
                    <input 
                        type='text' 
                        placeholder='Название проекта' 
                        value={company}
                        onChange={(e)=>setCompany(e.target.value)}
                    />
                </div>
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
                    <span className='details-registration'>Имя</span>
                    <input 
                        type='text' 
                        placeholder='Имя'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className='input-box-registration'>
                    <span className='details-registration'>Фамилия</span>
                    <input 
                        type='text' 
                        placeholder='Фамилия'
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                    />
                </div>
                <div className='input-box-registration'>
                    <span className='details-registration'>Пароль</span>
                    <input 
                        type='text' 
                        placeholder='Пароль'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className='input-box-registration'>
                    <span className='details-registration'>Пароль еще раз</span>
                    <input 
                        type='text' 
                        placeholder='Пароль еще раз'
                        value={repPassword}
                        onChange={(e)=>setRepPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className='button-registration'>
                <button>Зарегистрироваться</button>
            </div>
        </form>
    </>
  )
}
