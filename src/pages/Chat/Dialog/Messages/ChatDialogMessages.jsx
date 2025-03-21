import { useContext, useEffect } from 'react'
import { ChatContext } from '../../ChatContext'
import ChatDialogMessageAlert from './Alert/ChatDialogMessageAlert'
import ChatDialogMessageText from './Text/ChatDialogMessageText'
import ChatDialogMessageFile from './File/ChatDialogMessageFile'
import { socket } from '../../../../module/chat'

export default function ChatDialogMessages() {
  const { chat, setChat } = useContext(ChatContext)

  useEffect(() => {
    socket.on('message-receive', (message) => {
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }))
    })

    return () => socket.off('message-receive')
  }, [])

  return (
    <>
      {chat?.messages.map((message, i) => {
        if (message.type === 'alert')
          return (
            <ChatDialogMessageAlert key={message.id || i} message={message} />
          )

        if (message?.file?.data)
          return (
            <ChatDialogMessageFile key={message.id || i} message={message} />
          )
        return <ChatDialogMessageText key={message.id || i} message={message} />
      })}
    </>
  )
}
