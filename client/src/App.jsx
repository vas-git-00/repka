import './styles/global.scss'
import { Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Menu from './components/menu/Menu'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'

import Users from './pages/users/users/Users'
import UserSingle from './pages/users/userSingle/UserSingle'
import UserCreate from './pages/users/userCreate/UserCreate'

import Groups from './pages/groups/groups/Groups'
import GroupSingle from './pages/groups/groupSingle/GroupSingle'
import GroupCreate from './pages/groups/groupCreate/GroupCreate'

import PageNotFound from './pages/pageNotFound/PageNotFound'
import Chats from './pages/chats/Chats'
import Channels from './pages/channels/Channels'
import Payment from './pages/payment/Payment'
import Documents from './pages/documents/Documents'
import RequireAuth from './hok/RequireAuth'




function App() {
  
  
  const Layout = () => {
    return (
      <div className='main'>
        <Navbar />
          <div className='container'>
            <div className='menuContainer'>
              <Menu />
            </div>
            <div className='contentContainer'>
              <Outlet />
            </div>
          </div>
        {/*<Footer /> */}
      </div>
    )
  }
   

  return (
      <Routes>
        
        <Route path='/auth' element={ <Auth /> } />

        <Route path='/' element={ <RequireAuth> <Layout /> </RequireAuth>} > 

          <Route index element={ <RequireAuth> <Home /> </RequireAuth>} />
          
          <Route path='chats' element={ <RequireAuth> <Chats /> </RequireAuth>} />

          <Route path='users' element={ <RequireAuth> <Users /> </RequireAuth>} />
          <Route path='users/:id' element={ <RequireAuth> <UserSingle /> </RequireAuth> } />
          <Route path='users/new' element={ <RequireAuth> <UserCreate /> </RequireAuth>} />

          <Route path='groups' element={ <RequireAuth> <Groups /> </RequireAuth>} /> 
          <Route path='groups/:id' element={ <RequireAuth> <GroupSingle /> </RequireAuth> } />
          <Route path='groups/new' element={ <RequireAuth> <GroupCreate /> </RequireAuth>} />

          <Route path='channels' element={ <RequireAuth> <Channels /> </RequireAuth>} />

          <Route path='payment' element={ <RequireAuth> <Payment /> </RequireAuth>} />

          <Route path='documents' element={ <RequireAuth> <Documents /> </RequireAuth>} />

          <Route path="*" element={ <RequireAuth> <PageNotFound/> </RequireAuth> } />

        </Route>
       
      </Routes>

  );

}

export default App
