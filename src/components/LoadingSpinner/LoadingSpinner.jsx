import './LoadingSpinner.css'

export default function LoadingSpinner({ size = 30, text = '' }) {
  return (
    <>
      <div className="d_f_ce list_y">
        <div
          className="loading_spinner"
          style={{ '--loading-spinner-size': `${size}px` }}
        ></div>
        {text && <span className="loading_spinner_text">{text}</span>}
      </div>
    </>
  )
}
