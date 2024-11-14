import { create } from "zustand"
import axios from 'axios'
import { URI_BACKEND } from "../utils/config"

const useRoleStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataRoles: [],

      //Получение списка ролей
      getRoles: async (token) => {
        const { data } = await axios.get(`${URI_BACKEND}/api/roles`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataRoles: data.roleData
            })
          } else {
              console.error('Ошибка ', data.message)
          }
      },

    })
)

export default useRoleStore