export async function shareData(data, url) {
  if (navigator.share) {
    try {
      await navigator.share({ ...data, url: url || window.location.href })
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  } else {
    return { ok: false, error: 'Web Share API not supported' }
  }
}
