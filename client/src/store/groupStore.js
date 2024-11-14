import { create } from "zustand"
import axios from 'axios'
import { URI_BACKEND } from "../utils/config"

const useGroupStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataGroups: [],
      dataGroup: [],
      dataUsersGroup: [],
      dataUsersFreeForGroup: [],

      //Получение списка групп
      getGroups: async (token) => {
        const { data } = await axios.get(`${URI_BACKEND}/api/groups`, {
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
        const { data } = await axios.get(`${URI_BACKEND}/api/group/${id}`, {
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
      createGroup: async (name, token) => {
        const { data } = await axios.post(`${URI_BACKEND}/api/group`, {name}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( !data ) {
            console.error('Ошибка ', data.message)
          } 
      },

      //Удаление группы 
      deleteGroup: async (groupId, token) => {
        await axios.delete(`${URI_BACKEND}/api/group`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            groupId
          }
        })
      },

      //Добавление в группу пользователя
      addUserToGroup: async (userId, groupId, token) => {
        const { data } = await axios.post(`${URI_BACKEND}/api/users-group`, {userId, groupId}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( !data ) {
            console.error('Ошибка ', data.message)
          } 
      },

      //Получение всех пользователей, которые находяться в группе
      getUsersInGroup: async (id, token) => {
        const { data } = await axios.get(`${URI_BACKEND}/api/users-group/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataUsersGroup: data.usersGroupData
            })
          } else {
              console.error('Ошибка ', data.message)
          } 
      },

      //Удаление пользователя из группы
      deleteUserFromGroup: async (userId, groupId, token) => {
        await axios.delete(`${URI_BACKEND}/api/users-group`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            userId,
            groupId
          }
        })
      },


      //Получение всех пользователей, которые еще не находятся в группе deleteUserFromGroup
      getUsersFreeForGroup: async (id, token) => {
        const { data } = await axios.get(`${URI_BACKEND}/api/users-group/${id}/available-users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( data ) {
            set({
              dataUsersFreeForGroup: data.usersFreeForGroupData
            })
          } else {
              console.error('Ошибка ', data.message)
          } 
      },

    })
)

export default useGroupStore