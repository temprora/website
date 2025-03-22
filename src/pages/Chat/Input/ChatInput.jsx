import { useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FileInfoPreview from '../../../components/FilePreview/Info/FileInfoPreview'
import { ChatContext } from '../ChatContext'
import { encrypt } from '../../../script/hash'
import { sendMessage } from '../../../module/chat'
import DownArrowIcon from '../../../assets/icons/down_arrow.svg?react'
import XIcon from '../../../assets/icons/x.svg?react'
import AttachIcon from '../../../assets/icons/attach.svg?react'
import SendIcon from '../../../assets/icons/send.svg?react'
import './ChatInput.css'

export default function ChatInput() {
  const { chat, setChat, chatWindowRef } = useContext(ChatContext)
  const [userMessage, setUserMessage] = useState({
    message: '',
    file: {},
  })
  const fileInput = useRef()
  const navigate = useNavigate()

  function attach(e) {
    const file = e.target.files[0]
    if (!file) return

    const blobUrl = URL.createObjectURL(file)
    const attachFile = {
      data: blobUrl,
      name: file.name,
      type: file.type,
      size: file.size,
    }

    setUserMessage({ ...userMessage, file: attachFile })
    e.target.value = ''
  }

  async function send() {
    if (!chat.id) navigate('/')
    if (!(userMessage.message || userMessage.file?.data)) return

    userMessage.message = encrypt(userMessage.message)

    const newMessage = {
      author: chat.user.name,
      date: new Date().getTime(),
      ...userMessage,
    }

    setChat({
      ...chat,
      messages: [...chat.messages, { ...newMessage, mine: true }],
      myMessagesQuantity: chat.myMessagesQuantity + 1,
    })

    setUserMessage({ message: '', file: {} })
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
      <div className="chat_input">
        <div className="chat_input_con list_y">
          {userMessage.file?.data && (
            <div className="chat_input_con_file_con list_x d_f_ce">
              <FileInfoPreview file={userMessage.file} preview={true} />
              <div
                className="chat_input_btn chat_file_x_btn d_f_ce"
                onClick={() => setUserMessage({ ...userMessage, file: {} })}
              >
                <XIcon className="icon" />
              </div>
            </div>
          )}
          <textarea
            autoFocus
            placeholder="Message"
            className="chat_input_con_textarea"
            value={userMessage.message}
            files={userMessage.file?.data ? 'true' : 'false'}
            onChange={(e) =>
              setUserMessage({ ...userMessage, message: e.target.value })
            }
            onKeyDown={handleKeyDown}
          ></textarea>
          <div className="chat_input_con_footer d_f_ce d_f_jc_sb">
            <div
              className="chat_input_btn chat_attach_btn d_f_ce"
              onClick={() => fileInput.current.click()}
            >
              <AttachIcon className="icon" />
              <input
                ref={fileInput}
                type="file"
                name="file"
                onChange={attach}
              />
            </div>
            <div
              className="chat_input_btn chat_send_btn d_f_ce"
              hidden={!(userMessage.message || userMessage.file?.data)}
              onClick={send}
            >
              <SendIcon className="icon" />
            </div>
          </div>
        </div>
        <div
          className="chat_input_btn chat_down_btn d_f_ce"
          hidden={chat.scrollBottom < 300}
          onClick={scrollDown}
        >
          <DownArrowIcon className="icon" />
        </div>
      </div>
    </>
  )
}
