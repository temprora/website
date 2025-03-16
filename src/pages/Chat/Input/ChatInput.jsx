import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../ChatContext'
import SendIcon from '../../../assets/icons/send.svg?react'
import { sendMessage, socket } from '../../../module/chat'
import './ChatInput.css'

export default function ChatInput() {
  const { chat, setChat } = useContext(ChatContext)
  const [inputMessage, setInputMessage] = useState('')
  const navigator = useNavigate()

  useEffect(() => {
    socket.on('message-receive', (message) => {
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }))
    })

    return () => socket.off('message-receive')
  }, [])

  async function send() {
    if (!inputMessage) return
    if (!chat.id) navigator('/')

    const newMessage = {
      author: chat.user.name,
      message: inputMessage,
      type: 'text',
      date: new Date().getTime(),
    }

    setChat({
      ...chat,
      messages: [...chat.messages, { ...newMessage, mine: true }],
      myMessagesQuantity: chat.myMessagesQuantity + 1,
    })

    setInputMessage('')
    await sendMessage(newMessage)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <div className="chat_input list_x">
        <textarea
          autoFocus
          placeholder="Message"
          className="chat_input_con_textarea"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="chat_input_btn_con" onClick={send}>
          <div className="chat_send_btn d_f_ce" hidden={!inputMessage}>
            <SendIcon className="icon" />
          </div>
        </div>
      </div>
    </>
  )
}
