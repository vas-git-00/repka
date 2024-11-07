import ChatList from './chatList/ChatList'
import CustomerInfo from './customerInfo/CustomerInfo'
import './listBox.scss'

export default function ListBox() {
  return (
    <div className='listBox'>
        <CustomerInfo />
        <ChatList />
    </div>
  )
}
