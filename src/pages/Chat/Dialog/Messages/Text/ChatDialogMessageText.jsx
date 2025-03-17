import { timeToTime } from '../../../../../script/convert/time'
import './ChatDialogMessageText.css'

export default function ChatDialogMessageText({ message }) {
  return (
    <>
      <div className="message_con" mine={message?.mine ? 'true' : 'false'}>
        <div className="message list_y" mine={message?.mine ? 'true' : 'false'}>
          <div>
            <div className="chat_message_header list_x d_f_jc_sb">
              <b className="chat_message_author">{message?.author}</b>
              <div className="chat_message_date">
                {timeToTime(message?.date)}
              </div>
            </div>
            <hr className="x" />
          </div>
          <pre className="chat_message_pre">{message?.message}</pre>
        </div>
      </div>
    </>
  )
}
