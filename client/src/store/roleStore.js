import { create } from "zustand"
import axios from 'axios'

const useRoleStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataRoles: [],

      //Получение списка ролей
      getRoles: async (token) => {
        const { data } = await axios.get('http://localhost:8800/api/roles', {
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