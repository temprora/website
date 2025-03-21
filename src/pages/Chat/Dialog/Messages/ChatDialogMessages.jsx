import { useContext } from 'react'
import { ChatContext } from '../../ChatContext'
import ChatDialogMessageAlert from './Alert/ChatDialogMessageAlert'
import ChatDialogMessageText from './Text/ChatDialogMessageText'
import ChatDialogMessageFile from './File/ChatDialogMessageFile'

export default function ChatDialogMessages() {
  const { chat } = useContext(ChatContext)

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
