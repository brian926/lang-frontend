// All requests go to a single POST /api endpoint proxied to the Go backend.

export interface LogRequest {
  userId: string
  language: string
  activityType: string
  minutes: number
  date: string
}

export interface StatsResponse {
  totalHours: number
  today: number
  thisWeek: number
  thisMonth: number
  percentages: Record<string, number>
}

async function post<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error((json as { error?: string }).error ?? `HTTP ${res.status}`)
  }

  return json as T
}

export function logActivity(req: LogRequest): Promise<{ message: string }> {
  return post({ action: 'log', ...req })
}

export function fetchStats(userId: string, language: string): Promise<StatsResponse> {
  return post({ action: 'stats', userId, language })
}
