import { useContext, useState } from 'react'
import { ChatContext } from '../ChatContext'
import ChatHeaderAlert from './Alert/ChatHeaderAlert'
import './ChatHeader.css'

export default function ChatHeader() {
  const { chat } = useContext(ChatContext)
  const [showAlert, setShowAlert] = useState(false)

  return (
    <>
      <div className="chat_header d_f_ce" onClick={() => setShowAlert(true)}>
        <h1>{chat?.title}</h1>
      </div>
      {showAlert && <ChatHeaderAlert setShowAlert={setShowAlert} />}
    </>
  )
}
