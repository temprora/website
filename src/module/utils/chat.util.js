import {
  deleteFromSessionStorage,
  getFromSessionStorage,
} from '../../script/sessionStorage'

export function getRoomId() {
  return getFromSessionStorage('chatId')
}

export function deleteRoomId() {
  return deleteFromSessionStorage('chatId')
}

export function getUserName() {
  return getFromSessionStorage('name') || 'Anonymous'
}

export function getLeftChatMessage(name) {
  return { type: 'alert', message: `${name} left the chat` }
}

export function getJoinedChatMessage(name) {
  return { type: 'alert', message: `${name} joined the chat` }
}
