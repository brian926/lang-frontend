// src/store/index.ts
import { defineStore } from 'pinia'

// Auth store
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
        logs: [] as { language: string; activity: string; minutes: number; date: string }[],
    }),
    actions: {
        addLog(log: { language: string; activity: string; minutes: number; date: string }) {
            this.logs.push(log)
        },
    },
    getters: {
        totalMinutes: (state) => state.logs.reduce((sum, l) => sum + l.minutes, 0),
        totalHours: (state) => state.logs.reduce((sum, l) => sum + l.minutes, 0) / 60,
    },
})
