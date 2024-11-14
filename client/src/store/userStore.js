import { create } from "zustand"
import axios from 'axios'
import { URI_BACKEND } from "../utils/config"

const useUserStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataUsers: [],
      dataUser: [],

      //Получение списка пользователей
      getUsers: async (token) => {
        const { data } = await axios.get(`${URI_BACKEND}/api/users`, {
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
        const { data } = await axios.get(`${URI_BACKEND}/api/user/${id}`, {
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
      createUser: async (name, lastName, email, password, selectedRoleId, token) => {
        const { data } = await axios.post(`${URI_BACKEND}/api/user`, {name, lastName, email, password, selectedRoleId}, {
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