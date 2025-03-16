import { useContext } from 'react'
import { ChatContext } from '../../ChatContext'
import ChatDialogMessageText from './Text/ChatDialogMessageText'
import ChatDialogMessageAlert from './Alert/ChatDialogMessageAlert'

export default function ChatDialogMessages() {
  const { chat } = useContext(ChatContext)

  return (
    <>
      {chat?.messages.map((message, i) => {
        if (message.type === 'text')
          return (
            <ChatDialogMessageText key={message.id || i} message={message} />
          )
        if (message.type === 'alert')
          return (
            <ChatDialogMessageAlert key={message.id || i} message={message} />
          )
      })}
    </>
  )
}
