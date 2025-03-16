import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button.jsx'
import logo from '../../../assets/logo/temprora.jpg'
import './Try.css'

export default function Try() {
  return (
    <>
      <div className="home_about list_y d_f_ce">
        <img className="try_img" src={logo} alt="Temprora logo" />
        <Link className="try_btn" to={'/join-or-create'}>
          <Button>
            Go to <b>Chat</b>
          </Button>
        </Link>
      </div>
    </>
  )
}
