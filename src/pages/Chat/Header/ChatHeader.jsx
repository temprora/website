import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../ChatContext'
import ChatHeaderAlert from './Alert/ChatHeaderAlert'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { socket } from '../../../module/chat'
import './ChatHeader.css'

export default function ChatHeader() {
  const { chat, setChat } = useContext(ChatContext)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    function handleQuantity(quantity) {
      setChat((prev) => ({
        ...prev,
        users: { ...prev.users, quantity: quantity },
      }))
    }

    socket.on('users-quantity', handleQuantity)
    return function () {
      socket.off('users-quantity', handleQuantity)
    }
  }, [chat?.id])

  return (
    <>
      <div className="chat_header d_f_ce" onClick={() => setShowAlert(true)}>
        <h1 className="chat_header_title">{chat?.title}</h1>
        {chat?.users?.quantity === null && <LoadingSpinner size={20} />}
        {chat?.users?.quantity === 0 && (
          <div className="chat_header_users_quantity">Chat is empty</div>
        )}
        {chat?.users?.quantity === 1 && (
          <div className="chat_header_users_quantity">
            {chat?.users?.quantity} person is in chat
          </div>
        )}
        {chat?.users?.quantity > 1 && (
          <div className="chat_header_users_quantity">
            {chat?.users?.quantity} people are in chat
          </div>
        )}
      </div>
      {showAlert && <ChatHeaderAlert setShowAlert={setShowAlert} />}
    </>
  )
}
