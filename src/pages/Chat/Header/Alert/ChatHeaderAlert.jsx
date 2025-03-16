import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../../components/Alert/Alert'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import { ChatContext } from '../../ChatContext'
import { leaveChat, socket } from '../../../../module/chat'
import { deleteFromSessionStorage } from '../../../../script/sessionStorage'
import CopyIcon from '../../../../assets/icons/copy.svg?react'

export default function ChatHeaderAlert({ setShowAlert }) {
  const { chat } = useContext(ChatContext)
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
            <Button
              className="d_f_ce chat_header_alert_copy_btn"
              onClick={() => navigator.clipboard.writeText(chat?.id)}
            >
              <CopyIcon className="icon" />
            </Button>
          </div>
          <Button onClick={leave}>Leave</Button>
        </div>
      </Alert>
    </>
  )
}
