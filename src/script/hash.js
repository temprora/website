import CryptoJS from 'crypto-js'

export function encrypt(text) {
  return CryptoJS.AES.encrypt(
    text,
    import.meta.env.VITE_MESSAGE_SECRET_KEY
  ).toString()
}

export function decrypt(text) {
  return CryptoJS.AES.decrypt(
    text,
    import.meta.env.VITE_MESSAGE_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8)
}
