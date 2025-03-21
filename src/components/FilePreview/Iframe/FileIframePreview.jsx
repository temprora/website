import XIcon from '../../../assets/icons/x.svg?react'
import './FileIframePreview.css'

export default function FileIframePreview({ file, onClose }) {
  return (
    <>
      <div className="file_iframe_preview_win alert_win d_f_ce">
        <div className="alert_bg" onClick={onClose}></div>
        <div className="file_iframe_preview_win_con">
          <div className="file_iframe_preview_win_con_item d_f_jc_sb d_f_ce">
            <div></div>
            <b>{file?.name}</b>
            <div
              className="file_iframe_preview_win_con_item_btn d_f_ce"
              onClick={onClose}
            >
              <XIcon className="icon" />
            </div>
          </div>
          <iframe
            className="file_iframe_preview_win_iframe"
            src={file.data}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </>
  )
}
