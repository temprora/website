import { useContext, useEffect } from 'react'
import { ChatContext } from '../ChatContext'
import ChatDialogEmpty from './Empty/ChatDialogEmpty'
import ChatDialogMessages from './Messages/ChatDialogMessages'
import { socket } from '../../../module/chat'
import {
  getJoinedChatMessage,
  getLeftChatMessage,
} from '../../../module/utils/chat.util'
import './ChatDialog.css'

export default function ChatDialog() {
  const { chat, setChat } = useContext(ChatContext)

  function handleUserActivity(func, userName) {
    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, func(userName)],
    }))
  }

  useEffect(() => {
    function handleUserJoined({ userName }) {
      handleUserActivity(getJoinedChatMessage, userName)
    }

    socket.on('user-joined', handleUserJoined)
    return () => {
      socket.off('user-joined', handleUserJoined)
    }
  }, [])

  useEffect(() => {
    function handleUserLeft(userName) {
      handleUserActivity(getLeftChatMessage, userName)
    }

    socket.on('user-left', handleUserLeft)
    return () => socket.off('user-left', handleUserLeft)
  }, [])

  return (
    <>
      <div className="chat_dialog">
        {chat?.messages.length === 0 && <ChatDialogEmpty />}
        {chat?.messages.length > 0 && <ChatDialogMessages />}
      </div>
    </>
  )
}
