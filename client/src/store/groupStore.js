import { create } from "zustand"
import axios from 'axios'

const useGroupStore = create(
    (set) => ({
      //Состояние по умолчанию
      dataGroups: [],
      dataGroup: [],
      dataUsersGroup: [],
      dataUsersFreeForGroup: [],

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
      createGroup: async (name, token) => {
        const { data } = await axios.post('http://localhost:8800/api/group', {name}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( !data ) {
            console.error('Ошибка ', data.message)
          } 
      },

      //Удаление группы DONT WORK!!!
      deleteGroup: async (id, token) => {
        const { data } = await axios.delete(`http://localhost:8800/api/group/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          if ( !data ) {
            console.error('Ошибка ', data.message)
          } 
      },

      //Добавление в группу пользователя
      addUserToGroup: async (userId, groupId, token) => {
        const { data } = await axios.post('http://localhost:8800/api/users-group', {userId, groupId}, {
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
        const { data } = await axios.get(`http://localhost:8800/api/users-group/${id}`, {
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

      //Получение всех пользователей, которые еще не находятся в группе
      getUsersFreeForGroup: async (id, token) => {
        const { data } = await axios.get(`http://localhost:8800/api/users-group/${id}/available-users`, {
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