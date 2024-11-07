import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuth: false, // начальное значение
  uName: '',
  uLastName: '',
  uEmail: '',
  cName: '',
  logReg: false,

  setAuth: (authState) => set({ isAuth: authState }), // функция для изменения состояния

  setUserData: (userName, userLastName, userEmail, companyName) =>
    set({ uName: userName, uLastName: userLastName, uEmail: userEmail, cName: companyName}),

  deleteUserData: () =>
    set({uName: '', uLastName: '', uEmail: '', cName: ''}),

  //Открытие компонентов Login и Registration. ВЫНЕСТИ в отдельный стор!
  setLogReg: (flag) => set ({logReg: flag})

}))

export default useAuthStore;