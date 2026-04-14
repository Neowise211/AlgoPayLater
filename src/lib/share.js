/**
 * Copy text to the clipboard.
 * Tries the modern Clipboard API first; falls back to a hidden textarea + execCommand.
 * Always returns a boolean — never throws.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (_) {
    try {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
      document.body.appendChild(el)
      el.focus()
      el.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(el)
      return ok
    } catch (_) {
      return false
    }
  }
}
