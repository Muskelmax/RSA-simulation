import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Chat = () => {
  const messages = useSelector(state => state.client_1.messages)
  const lastMessages = messages.slice(-10)
  return (
    <div>
      <p>Chat</p>
      <div className='border-black border-2 w-96'>
        {
          lastMessages.map(message => {
            if (message[0] == 1) {
              return  <p className='bg-indigo-400'>{message[1]}</p>
            }
            else if(message[0] == 2) {
              return  <p className='bg-amber-400'>{message[1]}</p>
            }
          })
        }
      </div>
    </div>
    
  )
}

export default Chat