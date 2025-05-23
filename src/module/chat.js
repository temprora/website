import { io } from 'socket.io-client'
import { getRoomId, getUserId, getUserName } from './utils/chat.util'

export const socket = io(import.meta.env.VITE_TEMPRORA_SOCKET)

export function createChat() {
  return new Promise((res) => {
    socket.emit('create-room')
    socket.on('room-created', (roomId) => res(roomId))
  })
}

export async function joinChat(roomId) {
  const userName = getUserName()
  if (!userName) return { ok: false, error: 'User not found' }

  return new Promise((res) => {
    socket.emit('join-room', roomId, userName)

    socket.once('empty-room', (roomId) =>
      res({ roomId, ok: false, error: 'Room is empty' })
    )
    socket.once('you-joined', ({ roomId, userId }) =>
      res({ roomId, userId, ok: true })
    )
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

export function getUsersQuantity(roomId) {
  if (!roomId) return { ok: false, error: 'Chat not found' }

  return new Promise((res) => {
    socket.emit('users-quantity', roomId)
    socket.on('users-quantity', (quantity) => res(quantity))
  })
}

export function sendMessage(message) {
  const roomId = getRoomId()
  if (!roomId) return { ok: false, error: 'Chat not found' }

  const userId = getUserId()
  if (!userId) return { ok: false, error: 'User not found' }

  message.author.id = userId
  return new Promise(() => {
    socket.emit('message-send', message, roomId)
  })
}
