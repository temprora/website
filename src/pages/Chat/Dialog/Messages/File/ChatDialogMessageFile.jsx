import { timeToTime } from '../../../../../script/convert/time'
import FileInfoPreview from '../../../../../components/FilePreview/Info/FileInfoPreview'
import './ChatDialogMessageFile.css'

export default function ChatDialogMessageFile({ message }) {
  const isImage = message.file?.type.includes('image')

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
          {isImage && <img src={message?.file?.data} />}
          {!isImage && <FileInfoPreview file={message.file} preview={true} />}
          {message?.message && (
            <pre className="chat_message_pre">{message?.message}</pre>
          )}
        </div>
      </div>
    </>
  )
}
