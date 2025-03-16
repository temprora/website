import { Link } from 'react-router-dom'
import './JoinOrCreateItem.css'

export default function JoinOrCreateItem({ link, title }) {
  return (
    <>
      <Link to={link} className="join_or_create_item d_f_ce">
        <div>{title}</div>
      </Link>
    </>
  )
}
