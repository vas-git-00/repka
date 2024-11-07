import './chats.scss'

import ListBox from '../../components/chat/listBox/ListBox'
import MessageBox from '../../components/chat/messageBox/MessageBox'
import DetailBox from '../../components/chat/detailBox/DetailBox'

export default function Chats() {
  return (
    <div className='chat-container'>
      <ListBox />
      <MessageBox />
      <DetailBox />
    </div>
  )
}
