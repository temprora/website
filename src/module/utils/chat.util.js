import { getFromSessionStorage } from '../../script/sessionStorage'

export function getRoomId() {
  return getFromSessionStorage('chatId')
}

export function getUserId() {
  return getFromSessionStorage('userId')
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

export function isAuthor(userId) {
  return getUserId() === userId
}
