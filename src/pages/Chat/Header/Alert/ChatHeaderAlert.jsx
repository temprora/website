import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../../components/Alert/Alert'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import { ChatContext } from '../../ChatContext'
import { copyText } from '../../../../script/copy'
import { shareData } from '../../../../script/share'
import { leaveChat, socket } from '../../../../module/chat'
import { deleteFromSessionStorage } from '../../../../script/sessionStorage'
import CopyIcon from '../../../../assets/icons/copy.svg?react'
import ShareIcon from '../../../../assets/icons/share.svg?react'
import './ChatHeaderAlert.css'

export default function ChatHeaderAlert({ setShowAlert }) {
  const { chat } = useContext(ChatContext)
  const shareUrl = useRef(
    `${window.location.host}/join?room=${chat?.id}`
  ).current
  const useNavigator = useNavigate()

  useEffect(() => {
    socket.on('you-left', (roomId) => {
      const curRoomId = chat?.id
      if (curRoomId !== roomId) return

      deleteFromSessionStorage('chatId')
      useNavigator('/')
    })

    return () => socket.off('you-left')
  }, [])

  async function leave() {
    await leaveChat()
  }

  async function share() {
    const chatToShare = {
      title: chat?.title,
      text: `Join our chat: ${chat?.title} - ${chat?.id}`,
    }

    await shareData(chatToShare, shareUrl)
  }

  return (
    <>
      <Alert onClose={() => setShowAlert(false)}>
        <div className="list_y">
          <div className="d_f_ce">
            <b>{chat?.title}</b>
          </div>
          <hr className="x" />
          <div className="list_x">
            <Input readOnly value={chat?.id} label="" />
            <div className="chat_header_alert_btns">
              <Button
                className="d_f_ce chat_header_alert_copy_btn"
                onClick={copyText(shareUrl)}
              >
                <CopyIcon className="icon" />
              </Button>
              <Button
                className="d_f_ce chat_header_alert_copy_btn"
                onClick={share}
              >
                <ShareIcon className="icon" />
              </Button>
            </div>
          </div>
          <hr className="x" />
          <Button onClick={leave}>Leave</Button>
        </div>
      </Alert>
    </>
  )
}
