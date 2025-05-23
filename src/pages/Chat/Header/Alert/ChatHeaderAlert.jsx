import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import Alert from '../../../../components/Alert/Alert'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import ChatHeaderAlertAreYouSure from './AreYouSure/ChatHeaderAlertAreYouSure'
import { ChatContext } from '../../ChatContext'
import { copyText } from '../../../../script/copy'
import { shareData } from '../../../../script/share'
import { socket } from '../../../../module/chat'
import { deleteFromSessionStorage } from '../../../../script/sessionStorage'
import CopyIcon from '../../../../assets/icons/copy.svg?react'
import ShareIcon from '../../../../assets/icons/share.svg?react'
import './ChatHeaderAlert.css'

export default function ChatHeaderAlert({ setShowAlert }) {
  const { chat } = useContext(ChatContext)
  const shareUrl = useRef(
    `${window.location.origin}/join?room=${chat?.id}`
  ).current
  const navigate = useNavigate()
  const [wantsToLeave, setWantsToLeave] = useState(false)

  useEffect(() => {
    function handleUserLeft(roomId) {
      const curRoomId = chat?.id
      if (curRoomId !== roomId) return

      deleteFromSessionStorage('chatId')
      deleteFromSessionStorage('userId')
      navigate('/')
    }

    socket.on('you-left', handleUserLeft)
    return () => socket.off('you-left', handleUserLeft)
  }, [])

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
                onClick={() => copyText(shareUrl)}
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
          <div className="d_f_ce">
            <div className="chat_header_alert_qr_code">
              <QRCodeSVG
                value={shareUrl}
                size={260}
                bgColor={'transparent'}
                fgColor={'#7f75e2'}
                level={'H'}
                imageSettings={{
                  src: 'https://temprora.web.app/assets/temprora-XusK7Al3.jpg',
                  height: 50,
                  width: 50,
                  opacity: 1,
                  excavate: true,
                }}
              />
            </div>
          </div>
          <hr className="x" />
          <Button onClick={() => setWantsToLeave(true)}>Leave</Button>
        </div>
      </Alert>
      {wantsToLeave && (
        <ChatHeaderAlertAreYouSure onClose={() => setWantsToLeave(false)} />
      )}
    </>
  )
}
