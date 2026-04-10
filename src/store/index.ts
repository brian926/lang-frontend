import { defineStore } from 'pinia'
import { logActivity, fetchStats } from '@/api/tracker'
import type { StatsResponse } from '@/api/tracker'
import { USER_ID } from '@/constants'

// Auth store — dormant until backend adds authentication
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { id: string; name: string; email: string },
    isAuthenticated: false,
  }),
  actions: {
    login(user: { id: string; name: string; email: string }) {
      this.user = user
      this.isAuthenticated = true
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})

// Activity store
export const useActivityStore = defineStore('activity', {
  state: () => ({
    stats: null as StatsResponse | null,
    statsLoading: false,
    statsError: null as string | null,
    submitLoading: false,
    submitError: null as string | null,
    lastLanguage: '',
  }),

  actions: {
    async submitLog(payload: {
      language: string
      activityType: string
      minutes: number
      date: string
    }) {
      this.submitLoading = true
      this.submitError = null
      try {
        await logActivity({ userId: USER_ID, ...payload })
        this.lastLanguage = payload.language
      } catch (err) {
        this.submitError = err instanceof Error ? err.message : 'Failed to save log'
        throw err
      } finally {
        this.submitLoading = false
      }
    },

    async loadStats(language: string) {
      this.statsLoading = true
      this.statsError = null
      try {
        this.stats = await fetchStats(USER_ID, language)
        this.lastLanguage = language
      } catch (err) {
        this.statsError = err instanceof Error ? err.message : 'Failed to load stats'
      } finally {
        this.statsLoading = false
      }
    },
  },
})
