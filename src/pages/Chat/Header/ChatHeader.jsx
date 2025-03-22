import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../ChatContext'
import ChatHeaderAlert from './Alert/ChatHeaderAlert'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { socket } from '../../../module/chat'
import GroupIcon from '../../../assets/icons/group.svg?react'
import ChatIcon from '../../../assets/icons/chat.svg?react'
import InfoIcon from '../../../assets/icons/info.svg?react'
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
      <div className="chat_header d_f_ce d_f_jc_sb">
        {chat?.users?.quantity === null && <LoadingSpinner size={20} />}
        {chat?.users?.quantity !== null && (
          <div className="chat_header_users_quantity d_f_ce list_x">
            <GroupIcon className="icon" />
            <span>{chat?.users?.quantity}</span>
          </div>
        )}
        <div className="list_x">
          <ChatIcon className="icon" />
          <span>{chat?.id}</span>
        </div>
        <InfoIcon
          className="chat_header_info_icon icon"
          onClick={() => setShowAlert(true)}
        />
      </div>
      {showAlert && <ChatHeaderAlert setShowAlert={setShowAlert} />}
    </>
  )
}
