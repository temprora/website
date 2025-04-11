import { useContext, useMemo } from 'react'
import { ChatContext } from '../../ChatContext'
import ChatDialogMessage from './Message/ChatDialogMessage'
import ChatDialogMessageAlert from './Alert/ChatDialogMessageAlert'
import { isAuthor } from '../../../../module/utils/chat.util'
import './ChatDialogMessages.css'

export default function ChatDialogMessages() {
  const { chat } = useContext(ChatContext)
  const groups = useMemo(() => {
    const messages = chat?.messages || []
    const grouped = []
    let current = []

    messages.forEach((msg) => {
      if (msg.type === 'alert') {
        if (current.length) grouped.push(current)

        grouped.push([msg])
        current = []
        return
      }

      if (
        current.length === 0 ||
        current[current.length - 1]?.author?.id === msg?.author?.id
      ) {
        current.push(msg)
      } else {
        grouped.push(current)
        current = [msg]
      }
    })

    if (current.length) grouped.push(current)

    return grouped
  }, [chat?.messages])

  return (
    <>
      {groups.map((group, i) => {
        if (group[0].type === 'alert') {
          return (
            <ChatDialogMessageAlert key={group[0].id || i} message={group[0]} />
          )
        }

        const isMine = isAuthor(group[0]?.author?.id)

        return (
          <div
            key={i}
            className="chat_message_group"
            mine={isMine ? 'true' : 'false'}
          >
            <div className="chat_message_group_messages">
              {group.map((message, j) => {
                const key = message.id || `${i}-${j}`

                const showAuthor = j === 0

                return (
                  <ChatDialogMessage
                    key={key}
                    message={message}
                    showAuthor={showAuthor}
                  />
                )
              })}
            </div>
            <div className="chat_message_group_side">
              <div className="chat_message_group_side_circle d_f_ce">
                <span>{group[0]?.author?.name[0]}</span>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
