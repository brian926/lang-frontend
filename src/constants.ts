// Temporary: hardcoded until auth is implemented.
// Replace with the value from useAuthStore once login is wired up.
export const USER_ID = 'user1'

export const ACTIVITY_TYPES = [
  'Watching',
  'Reading',
  'Listening',
  'Speaking',
  'Writing',
] as const

export type ActivityType = (typeof ACTIVITY_TYPES)[number]

export const LANGUAGES = [
  'Spanish',
  'Japanese',
  'French',
  'Korean',
  'German',
  'Mandarin',
  'Italian',
  'Portuguese',
  'Arabic',
  'Russian',
] as const

export type Language = (typeof LANGUAGES)[number] | 'other'
