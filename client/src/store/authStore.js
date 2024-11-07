import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from 'axios'

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      email: null,
      userName: null,
      userLastName: null,
      setToken: (token) => set({ token, isAuthenticated: true }),

      // Функция входа в аккаунт
      login: async (email, password) => {
        try {
          const { data } = await axios.post('http://localhost:8800/api/login', {email, password})

            if ( data ) {
                set({ 
                    token: data.token, 
                    isAuthenticated: true, 
                    email: data.userData.email,
                    userName: data.userData.name,
                    userLastName: data.userData.last_name,
                })
                //console.log(data)
            } else {
                console.error('Ошибка ', data.message)
            }
        } catch (error) {
          console.error('Ошибка ', error)
        }
      },

      // Функция выхода из аккаунта
      logout: () => set({ token: null, isAuthenticated: false, email: null }),
    }),
    {
      name: "auth-storage", // для хранения токена в localStorage
    }
  )
);

export default useAuthStore;