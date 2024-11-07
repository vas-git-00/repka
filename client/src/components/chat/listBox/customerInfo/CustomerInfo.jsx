import './customerInfo.scss'

export default function CustomerInfo() {
  return (
    <div className='customerInfo'>
        <div className='customer'>
            <img src='./avatar.png' alt=''/>  
            <h2>Anton Vasyukov</h2>  
        </div>
        <div className='iconsInfo'>
            <img src='./more.png' alt=''/>
            {/* <img src='./video.png' alt=''/> 
            <img src='./edit.png' alt=''/> */}
        </div>
    </div>
  )
}
