import { create } from "zustand"
import axios from 'axios'

const useGroupStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataGroups: [],
      dataGroup: [],

      //Получение списка групп
      getGroups: async (token) => {
        const { data } = await axios.get('http://localhost:8800/api/groups', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataGroups: data.groupData
            })
          } else {
              console.error('Ошибка ', data.message)
          }
      },

      //Получение группы по ID
      getGroup: async (id, token) => {
        const { data } = await axios.get(`http://localhost:8800/api/group/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataGroup: data.groupData
            })
          } else {
              console.error('Ошибка ', data.message)
          }
      },

      //Создание новой группы
      createGroup: async (company_id, name, token) => {
        const { data } = await axios.post('http://localhost:8800/api/group', {company_id, name}, {
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

export default useGroupStore