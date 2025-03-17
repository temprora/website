import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../ChatContext'
import { sendMessage, socket } from '../../../module/chat'
import SendIcon from '../../../assets/icons/send.svg?react'
import DownArrowIcon from '../../../assets/icons/down_arrow.svg?react'
import './ChatInput.css'

export default function ChatInput() {
  const { chat, setChat, chatWindowRef } = useContext(ChatContext)
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

  function scrollDown() {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
  }

  return (
    <>
      <div className="chat_input list_x">
        <div className="chat_input_con">
          <textarea
            autoFocus
            placeholder="Message"
            className="chat_input_con_textarea"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
        <div className="chat_input_btn_con list_y">
          <div
            className="chat_input_btn chat_down_btn d_f_ce"
            hidden={chat.scrollBottom < 300}
            onClick={scrollDown}
          >
            <DownArrowIcon className="icon" />
          </div>
          <div
            className="chat_input_btn chat_send_btn d_f_ce"
            hidden={!inputMessage}
            onClick={send}
          >
            <SendIcon className="icon" />
          </div>
        </div>
      </div>
    </>
  )
}
