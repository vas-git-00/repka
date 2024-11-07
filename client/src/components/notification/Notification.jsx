import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Notification() {
  return (
    <div>
        <ToastContainer position='top-right' autoClose={1500}/>
    </div>
  )
}
