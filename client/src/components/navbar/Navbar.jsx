import { Link } from 'react-router-dom'
import './navbar.scss'
import useAuthStore from '../../store/authStore'


export default function Navbar() {

  
  const { logout, userName, userLastName } = useAuthStore() 

  const handleClick = () => {
    logout()
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to='/'><span>ChatsHub</span></Link>
        <img src="logo_nav_blue.png" alt="" />
      </div>
      <div className="icons">
        {/*<img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />*/}
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{`${userName} ${userLastName}`}</span>
        </div>
        <img src="/logout2.png" alt="" className="icon" onClick={handleClick}/>
      </div>
    </div>
  )
}

