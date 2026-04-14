import { createClient } from '@supabase/supabase-js'
import { mockLeaderboard } from './mockLeaderboard.js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

/**
 * Fetch top leaderboard rows for a given difficulty.
 * @param {import('../types/shapes').Difficulty} difficulty
 * @param {number} [limit=10]
 * @returns {Promise<import('../types/shapes').LeaderboardRow[]>}
 */
export async function fetchLeaderboard(difficulty, limit = 10) {
  if (DEMO_MODE) {
    return mockLeaderboard
      .filter(row => row.difficulty === difficulty)
      .sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds)
      .slice(0, limit)
  }

  if (!supabase) return []

  const { data, error } = await supabase
    .from('leaderboards')
    .select('*')
    .eq('difficulty', difficulty)
    .order('score', { ascending: false })
    .order('time_seconds', { ascending: true })
    .limit(limit)

  if (error) {
    console.warn('[fetchLeaderboard] Supabase error:', error.message)
    return []
  }
  return data ?? []
}

/**
 * Submit a player score to the leaderboard.
 * Resolves with the inserted row, or null on timeout / error — never throws.
 * @param {{ initials: string, difficulty: string, caseId: string, score: number, timeSeconds: number, verdictCorrect: boolean }} params
 * @returns {Promise<import('../types/shapes').LeaderboardRow|null>}
 */
export async function submitScore({ initials, difficulty, caseId, score, timeSeconds, verdictCorrect }) {
  if (DEMO_MODE) {
    const fakeRow = { id: 'demo-' + Date.now(), initials, difficulty, caseId, score, timeSeconds, verdictCorrect, createdAt: new Date().toISOString() }
    console.log('[submitScore] DEMO_MODE — fake row:', fakeRow)
    return fakeRow
  }

  if (!supabase) return null

  const insertPromise = supabase
    .from('leaderboards')
    .insert({ initials, difficulty, case_id: caseId, score, time_seconds: timeSeconds, verdict_correct: verdictCorrect })
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) { console.warn('[submitScore] insert error:', error.message); return null }
      return data
    })
    .catch(() => null)

  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(null), 5000))

  return Promise.race([insertPromise, timeoutPromise])
}

/**
 * Fire-and-forget telemetry event. DO NOT await at call sites.
 * @param {{ event: string, [key: string]: unknown }} payload
 */
export function logTelemetry(payload) {
  if (DEMO_MODE) return
  if (!supabase) return

  ;(async () => {
    try {
      await supabase.from('telemetry').insert({ event: payload.event, payload })
    } catch (_) {}
  })()
}
