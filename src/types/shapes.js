/**
 * @typedef {Object} Applicant
 * @property {string} id
 * @property {string} name
 * @property {number} age
 * @property {string} address
 * @property {string} employer
 * @property {string} position
 * @property {number} tenureYears
 * @property {number} declaredIncome
 * @property {string} loanPurpose
 * @property {number} dependents
 */

/**
 * @typedef {'facebook'|'instagram'|'linkedin'|'twitter'} Platform
 */

/**
 * @typedef {'strong'|'moderate'|'weak'|'red_herring'|'neutral'} ClueStrength
 */

/**
 * @typedef {Object} FeedPost
 * @property {string} id
 * @property {Platform} platform
 * @property {string} username
 * @property {string} avatar
 * @property {string} timestamp
 * @property {string} content
 * @property {string|null} image
 * @property {number} likes
 * @property {number} comments
 * @property {ClueStrength|null} clueStrength  - null for non-clue posts
 * @property {string|null} clueField           - which applicant field it contradicts
 */

/**
 * @typedef {'no_match'|'misinformation'|'other_red_flag'} PinReason
 */

/**
 * @typedef {Object} PinnedPost
 * @property {string} postId
 * @property {PinReason} reason
 * @property {string} field                    - applicant field targeted
 * @property {string} note                     - player's free-text note (may be empty)
 * @property {string|null} voucherApplied
 */

/**
 * @typedef {'easy'|'medium'|'hard'|'extreme'} Difficulty
 */

/**
 * @typedef {'approve'|'reject'} Verdict
 */

/**
 * @typedef {Object} Case
 * @property {string} id
 * @property {Difficulty} difficulty
 * @property {Verdict} correctVerdict
 * @property {Applicant} applicant
 * @property {FeedPost[]} posts
 */

/**
 * @typedef {Object} ScoreBreakdown
 * @property {number} pinScore
 * @property {number} reasonScore
 * @property {number} fieldScore
 * @property {number} verdictScore
 * @property {number} explanationBonus
 * @property {number} missedCluesPenalty
 * @property {number} voucherModifier
 * @property {number} total
 */

/**
 * @typedef {Object} LeaderboardRow
 * @property {string} id
 * @property {string} initials
 * @property {Difficulty} difficulty
 * @property {string} caseId
 * @property {number} score
 * @property {number} timeSeconds
 * @property {boolean} verdictCorrect
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Session
 * @property {boolean} tutorialSeen
 * @property {string|null} [lastCaseId]
 * @property {Difficulty|null} [lastDifficulty]
 */
