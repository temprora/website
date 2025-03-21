import './LoadingSpinner.css'

export default function LoadingSpinner({ size = 30, text = '' }) {
  return (
    <>
      <div
        className="loading_spinner_con d_f_ce list_y"
        style={{ '--loading-spinner-size': `${size}px` }}
      >
        <div className="loading_spinner"></div>
        {text && <span className="loading_spinner_text">{text}</span>}
      </div>
    </>
  )
}
