import './auth.scss'
import Registration from '../../components/auth/registration/Registration'
import Login from '../../components/auth/login/Login'
import Notification from '../../components/notification/Notification'
import useAuthStore from '../../store/store'


export default function Auth() {
  //const [logreg, setLogreg] = useState(false)
  const { logReg, setLogReg } = useAuthStore() //Вынести в отдельный стор!


  return (
    <div className="authContainer">
      <div className='form-container-auth'>
        <div className='title-auth'>
          ChatsHub | {logReg ? 'Регистрация' : 'Авторизация'}
        </div>
        {logReg ? <Registration /> : <Login /> }
        <div className='footer-auth'>
          {logReg ? ' Уже есть аккаунт в ChatsHub? ' : ' Нет аккаунта в ChatsHub?'}
            <span className='change-auth' onClick={() => setLogReg(!logReg)}>
              {logReg ? ' Авторизация' : ' Регистрация'}
            </span>
        </div>
      </div>
      <Notification />
    </div>  

  )
}
