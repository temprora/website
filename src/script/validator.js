export function validChatId(chatId) {
  const base62 =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  if (!chatId) return false
  if (chatId.length !== 11) return false

  for (let i = 0; i < chatId.length; i++) {
    if (!base62.includes(chatId[i])) return false
  }
  return true
}
