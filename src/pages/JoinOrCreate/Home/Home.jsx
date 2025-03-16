import { useState } from 'react'
import Input from '../../../components/Input/Input'
import JoinOrCreateItem from '../JoinOrCreateItem/JoinOrCreateItem'
import {
  deleteFromSessionStorage,
  getFromSessionStorage,
  saveToSessionStorage,
} from '../../../script/sessionStorage'

export default function JoinOrCreateHome() {
  const [name, setName] = useState(getFromSessionStorage('name') || 'Anonymous')

  function saveName(e) {
    const input = e.target
    setName(input.value)

    if (!input.value) {
      deleteFromSessionStorage('name')
    } else {
      saveToSessionStorage('name', input.value)
    }
  }

  return (
    <>
      <div className="join_or_create_con list_y">
        <Input
          value={name}
          label="Your name"
          name="first-name"
          placeholder="Anonymous"
          onChange={saveName}
        />
        <div className="list_x">
          <JoinOrCreateItem link="join" title="Join" />
          <JoinOrCreateItem link="create" title="Create" />
        </div>
      </div>
    </>
  )
}
