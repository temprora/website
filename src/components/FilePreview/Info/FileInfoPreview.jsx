import { useState } from 'react'
import { byteToHuman } from '../../../script/convert/size'
import FileIframePreview from '../Iframe/FileIframePreview'
import FileIcon from '../../../assets/icons/file.svg?react'
import './FileInfoPreview.css'

export default function FileInfoPreview({ file, preview = true }) {
  const [isPreview, setPreview] = useState(false)
  const isImage = file?.type.includes('image')

  return (
    <>
      <div
        className="file_info_preview list_x"
        onClick={() => setPreview(true)}
      >
        <div className="file_info_preview_icon d_f_ce">
          {isImage && <img src={file?.data} />}
          {!isImage && <FileIcon className="icon" />}
        </div>
        <div className="file_info_preview_info">
          <b className="file_info_preview_name">{file?.name}</b>
          <div className="file_info_preview_size">
            {byteToHuman(file?.size)}
          </div>
        </div>
      </div>
      {preview && isPreview && !isImage && (
        <FileIframePreview file={file} onClose={() => setPreview(false)} />
      )}
    </>
  )
}
