import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatBackground from './Background/ChatBackground'
import ChatHeader from './Header/ChatHeader'
import ChatDialog from './Dialog/ChatDialog'
import ChatInput from './Input/ChatInput'
import { ChatContext } from './ChatContext'
import { getUsersQuantity, leaveChat } from '../../module/chat'
import { getRoomId } from '../../module/utils/chat.util'
import { getFromSessionStorage } from '../../script/sessionStorage'
import './Chat.css'

export default function Chat() {
  const [chat, setChat] = useState({
    id: '',
    user: { name: '' },
    users: { quantity: null },
    title: 'Temp chat',
    messages: [],
    myMessagesQuantity: 0,
    scrollBottom: 0,
  })
  const navigator = useNavigate()
  const chatWindowRef = useRef()

  useEffect(() => {
    const chatId = getRoomId()
    if (!chatId) return navigator('/')

    const name = getFromSessionStorage('name') || 'Anonymous'
    setChat((prev) => ({
      ...prev,
      id: chatId,
      user: { ...prev.user, name },
    }))
  }, [])

  useEffect(() => {
    if (!chat?.id) return

    async function usersQuantity() {
      const quantity = await getUsersQuantity(chat?.id)
      setChat({ ...chat, users: { ...chat.users, quantity: quantity } })
    }
    usersQuantity()
  }, [chat?.id])

  useEffect(() => {
    function handleBeforeUnload(e) {
      e.preventDefault()
      e.returnValue = ''
    }

    async function handlePageHide() {
      await leaveChat()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)

    return function cleanup() {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

  useEffect(() => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
  }, [chat.myMessagesQuantity])

  function handleScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target

    setChat((prev) => ({
      ...prev,
      scrollBottom: scrollHeight - (scrollTop + clientHeight),
    }))
  }

  return (
    <ChatContext.Provider value={{ chat, setChat, chatWindowRef }}>
      <div
        className="chat_window d_f_jc_ce"
        ref={chatWindowRef}
        onScroll={handleScroll}
      >
        <ChatBackground />
        <ChatHeader />
        <div className="chat_window_con">
          <ChatDialog />
          <ChatInput />
        </div>
      </div>
    </ChatContext.Provider>
  )
}
