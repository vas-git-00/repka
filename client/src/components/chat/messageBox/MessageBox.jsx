import { useState } from 'react'
import './messageBox.scss'
import EmojiPicker from 'emoji-picker-react'

export default function MessageBox() {

  const [openEmoji, setOpenEmoji] = useState(false)
  const [text, setText] = useState('')

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpenEmoji(false)
  }

  return (
    <div className='messageBox'>
      <div className='topArea'>
        <div className='user'>
          <img src='./avatar.png' alt=''/>
          <div className='texts'>
            <span>Anton Vasyukov</span>
            <p>Какое-то последнее сообщение</p>
          </div>
        </div>
        <div className='icons'>
          {/* <img src='./phone.png' alt=''/>
          <img src='./video.png' alt=''/> */}
          <img src='./info.png' alt=''/>
        </div>
      </div>
      <div className='centerArea'>
        <div className="message">
          <img src='./avatar.png' alt=''/>
          <div className="texts">
            <p>Всем привет!
              Когда сможем автоматические отметки оплат настроить, 
              пока нет понимания?</p>
            <span>1 мин назад</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src='https://avatars.mds.yandex.net/i?id=1cf04a6f38f0be15415a0c35010d27a3eb59c5c5-7942200-images-thumbs&n=13' alt=''/> 
            <p>Всем привет!
              Когда сможем автоматические отметки оплат настроить, 
              пока нет понимания?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src='./avatar.png' alt=''/>
          <div className="texts">
            <p>Всем привет!
              Когда сможем автоматические отметки оплат настроить, 
              пока нет понимания?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Всем привет!
              Когда сможем автоматические отметки оплат настроить, 
              пока нет понимания?</p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className='bottomArea'>
        <div className="icons">
          <img src='./img.png' alt=''/>
          {/* <img src='./camera.png' alt=''/>
          <img src='./mic.png' alt=''/> */}
        </div>
        <input type='text' placeholder='Сообщение...' value={text} onChange={(e)=>setText(e.target.value)}/>
          <div className="emoji">
            <img src='./emoji.png' alt='' onClick={()=>setOpenEmoji(!openEmoji)}/>
            <div className="emojiPicker">
              <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji}/>
            </div>
          </div>
          <button className="sendButton">Отправить</button>
      </div>
    </div>
  )
}
