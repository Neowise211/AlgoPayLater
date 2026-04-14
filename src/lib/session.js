const STORAGE_KEY = 'algopay_session'

/** @returns {import('../types/shapes').Session} */
export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { tutorialSeen: false }
    return JSON.parse(raw)
  } catch (_) {
    return { tutorialSeen: false }
  }
}

/**
 * Shallow-merge `partial` into the current session and persist.
 * @param {Partial<import('../types/shapes').Session>} partial
 */
export function setSession(partial) {
  try {
    const current = getSession()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }))
  } catch (_) {}
}
