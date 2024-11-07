import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function RequireAuth({children}) {
    
  const { isAuthenticated } = useAuthStore() 

    if (!isAuthenticated) {
      return <Navigate to="/auth" />  // Перенаправляем на страницу авторизации, если токен отсутствует
    }
  
    return children;
    
}
