<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-blue-600">Dashboard</h1>
      <p class="text-gray-600">Your language learning stats</p>
    </header>

    <!-- Language selector -->
    <section class="mb-6 flex items-center gap-3">
      <label class="text-gray-700 font-medium">Language:</label>
      <input
        v-model="language"
        type="text"
        placeholder="e.g. Spanish"
        class="border rounded-lg p-2 focus:ring focus:ring-blue-300 w-48"
      />
      <button
        @click="load"
        :disabled="!language || store.statsLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ store.statsLoading ? 'Loading…' : 'Load Stats' }}
      </button>
    </section>

    <!-- Error -->
    <p v-if="store.statsError" class="mb-4 text-sm text-red-600">{{ store.statsError }}</p>

    <!-- Stats cards -->
    <section v-if="store.stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="p-4 bg-white rounded-2xl shadow text-center">
        <p class="text-sm text-gray-500 mb-1">Total</p>
        <p class="text-2xl font-bold text-blue-600">{{ store.stats.totalHours.toFixed(1) }}h</p>
      </div>
      <div class="p-4 bg-white rounded-2xl shadow text-center">
        <p class="text-sm text-gray-500 mb-1">Today</p>
        <p class="text-2xl font-bold text-green-600">{{ store.stats.today.toFixed(1) }}h</p>
      </div>
      <div class="p-4 bg-white rounded-2xl shadow text-center">
        <p class="text-sm text-gray-500 mb-1">This Week</p>
        <p class="text-2xl font-bold text-indigo-600">{{ store.stats.thisWeek.toFixed(1) }}h</p>
      </div>
      <div class="p-4 bg-white rounded-2xl shadow text-center">
        <p class="text-sm text-gray-500 mb-1">This Month</p>
        <p class="text-2xl font-bold text-purple-600">{{ store.stats.thisMonth.toFixed(1) }}h</p>
      </div>
    </section>

    <!-- Activity breakdown: chart + table -->
    <section
      v-if="store.stats && Object.keys(store.stats.percentages).length > 0"
      class="bg-white rounded-2xl shadow p-6"
    >
      <h2 class="text-lg font-semibold mb-4">Activity Breakdown</h2>
      <div class="flex items-center gap-8">
        <!-- Small doughnut -->
        <StatsChart :percentages="store.stats.percentages" />

        <!-- Per-category table -->
        <table class="flex-1 text-sm">
          <thead>
            <tr class="text-left text-gray-400 border-b">
              <th class="pb-2 font-medium">Activity</th>
              <th class="pb-2 font-medium text-right">Hours</th>
              <th class="pb-2 font-medium text-right">Share</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pct, activity) in store.stats.percentages"
              :key="activity"
              class="border-b last:border-0"
            >
              <td class="py-2 flex items-center gap-2">
                <span
                  class="inline-block w-2.5 h-2.5 rounded-full"
                  :style="{ backgroundColor: colorFor(activity as string) }"
                />
                {{ activity }}
              </td>
              <td class="py-2 text-right text-gray-700">
                {{ ((pct / 100) * store.stats!.totalHours).toFixed(1) }}h
              </td>
              <td class="py-2 text-right font-medium text-gray-800">
                {{ pct.toFixed(1) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <p v-else-if="store.stats" class="text-gray-500 text-sm">
      No activity logs yet for {{ language }}.
    </p>

    <!-- Empty state -->
    <p v-else-if="!store.statsLoading && !store.statsError" class="text-gray-400 text-sm">
      Enter a language and click "Load Stats" to view your progress.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useActivityStore } from '@/store'
import StatsChart from '@/components/StatsChart.vue'

const store = useActivityStore()
const language = ref(store.lastLanguage)

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444',
  '#3b82f6', '#a855f7', '#14b8a6', '#f97316',
]

function colorFor(activity: string): string {
  const keys = store.stats ? Object.keys(store.stats.percentages) : []
  const i = keys.indexOf(activity)
  return COLORS[i >= 0 ? i % COLORS.length : 0]
}

function load() {
  if (language.value) {
    store.loadStats(language.value)
  }
}

// Auto-load if we already know the language (e.g. after logging an activity)
onMounted(() => {
  if (language.value) load()
})
</script>
