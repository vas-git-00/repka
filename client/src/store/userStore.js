import { create } from "zustand"
import axios from 'axios'

const useUserStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataUsers: [],
      dataUser: [],

      //Получение списка пользователей
      getUsers: async (token) => {
        const { data } = await axios.get('http://localhost:8800/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataUsers: data.userData
            })
          } else {
              console.error('Ошибка ', data.message)
          }
      },

      //Получение пользователя по ID
      getUser: async (id, token) => {
        const { data } = await axios.get(`http://localhost:8800/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataUser: data.userData
            })
          } else {
              console.error('Ошибка ', data.message)
          }
      },

      //Создание нового пользователя
      createUser: async (name, lastName, email, password, token) => {
        const { data } = await axios.post('http://localhost:8800/api/user', {name, lastName, email, password}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( !data ) {
            console.error('Ошибка ', data.message)
          } 
      }

    })
)

export default useUserStore