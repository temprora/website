import { io } from 'socket.io-client'
import { getRoomId, getUserName } from './utils/chat.util'

export const socket = io(import.meta.env.VITE_TEMPRORA_SOCKET)

export function createChat() {
  return new Promise((res) => {
    socket.emit('create-room')
    socket.on('room-created', (roomId) => res(roomId))
  })
}

export function joinChat(chatId) {
  const userName = getUserName()
  if (!userName) return { ok: false, error: 'User not found' }

  return new Promise((res) => {
    socket.emit('join-room', chatId, userName)
    socket.on('you-joined', (roomId) => res(roomId))
  })
}

export function leaveChat() {
  const roomId = getRoomId()
  if (!roomId) return { ok: false, error: 'Chat not found' }
  const userName = getUserName()
  if (!userName) return { ok: false, error: 'User not found' }

  return new Promise(() => {
    socket.emit('leave-room', userName, roomId)
  })
}

export function sendMessage(message) {
  const roomId = getRoomId()
  if (!roomId) return { ok: false, error: 'Chat not found' }

  return new Promise(() => {
    socket.emit('message-send', message, roomId)
  })
}
