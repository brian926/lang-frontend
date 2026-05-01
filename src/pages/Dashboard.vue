<template>
  <main class="flex-1 overflow-y-auto p-6 md:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Page header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-1" style="color: var(--color-text);">Your Progress</h2>
        <p class="text-sm" style="color: var(--color-text-muted);">Track your language learning activity over time.</p>
      </div>

      <!-- Language selector -->
      <div class="mb-8 flex items-center gap-3 flex-wrap">
        <label for="dash-language" class="text-sm font-medium" style="color: var(--color-text);">
          Language
        </label>
        <select
          id="dash-language"
          v-model="selectedLanguage"
          @change="onLanguageChange"
          class="px-3 py-2 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)] min-w-40"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text);"
        >
          <option value="" disabled>Select a language</option>
          <option v-for="lang in LANGUAGES" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>

      <!-- Error alert -->
      <div
        v-if="store.statsError"
        class="mb-6 px-4 py-3 rounded-lg text-sm font-medium"
        style="background-color: color-mix(in srgb, var(--color-error) 15%, transparent); color: var(--color-error); border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent);"
      >
        {{ store.statsError }}
      </div>

      <!-- Stat cards grid -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Hours"
          :value="store.stats?.totalHours ?? 0"
          unit="h"
          :loading="store.statsLoading"
        />
        <StatCard
          label="Today"
          :value="store.stats?.today ?? 0"
          :loading="store.statsLoading"
        />
        <StatCard
          label="This Week"
          :value="store.stats?.thisWeek ?? 0"
          :loading="store.statsLoading"
        />
        <StatCard
          label="This Month"
          :value="store.stats?.thisMonth ?? 0"
          :loading="store.statsLoading"
        />
      </section>

      <!-- Activity breakdown -->
      <section
        class="rounded-2xl border p-6"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <h3 class="text-base font-semibold mb-5" style="color: var(--color-text);">
          Activity Breakdown
        </h3>

        <!-- Loading skeleton for chart -->
        <div v-if="store.statsLoading" class="flex items-center justify-center py-12">
          <div class="animate-pulse flex flex-col items-center gap-3">
            <div class="w-40 h-40 rounded-full" style="background-color: var(--color-surface-el);"></div>
          </div>
        </div>

        <!-- Chart + table when data available -->
        <div v-else-if="store.stats" class="flex flex-col md:flex-row gap-8 items-start">
          <div class="w-full md:w-64 flex-shrink-0">
            <StatsChart :percentages="store.stats.percentages" />
          </div>

          <!-- Breakdown table (only when there are percentages) -->
          <table
            v-if="Object.keys(store.stats.percentages).length > 0"
            class="flex-1 text-sm w-full"
          >
            <thead>
              <tr class="text-left" style="color: var(--color-text-muted);">
                <th class="pb-3 font-medium border-b" style="border-color: var(--color-border);">Activity</th>
                <th class="pb-3 font-medium text-right border-b" style="border-color: var(--color-border);">Hours</th>
                <th class="pb-3 font-medium text-right border-b" style="border-color: var(--color-border);">Share</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pct, activity) in store.stats.percentages"
                :key="activity"
                class="border-b last:border-0"
                style="border-color: var(--color-border);"
              >
                <td class="py-3 flex items-center gap-2" style="color: var(--color-text);">
                  <span
                    class="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                    :style="{ backgroundColor: colorFor(activity as string) }"
                  />
                  {{ activity }}
                </td>
                <td class="py-3 text-right" style="color: var(--color-text-muted);">
                  {{ ((pct / 100) * (store.stats?.totalHours ?? 0)).toFixed(1) }}h
                </td>
                <td class="py-3 text-right font-semibold" style="color: var(--color-text);">
                  {{ pct.toFixed(1) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state (no language selected yet) -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-10 text-sm"
          style="color: var(--color-text-muted);"
        >
          <svg class="w-10 h-10 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"/>
            <path d="M15 13v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"/>
            <path d="M12 5v14"/>
          </svg>
          Select a language to view your activity breakdown.
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useActivityStore } from '@/store/index'
import { LANGUAGES } from '@/constants'
import StatsChart from '@/components/StatsChart.vue'
import StatCard from '@/components/StatCard.vue'

const store = useActivityStore()
const selectedLanguage = ref(store.lastLanguage)

const COLORS = [
  '#6c63ff', '#22c55e', '#f59e0b', '#ef4444',
  '#3b82f6', '#a855f7', '#14b8a6', '#f97316',
]

function colorFor(activity: string): string {
  const keys = store.stats ? Object.keys(store.stats.percentages) : []
  const i = keys.indexOf(activity)
  return COLORS[i >= 0 ? i % COLORS.length : 0]
}

function onLanguageChange(): void {
  if (selectedLanguage.value) {
    store.loadStats(selectedLanguage.value)
  }
}

onMounted(() => {
  if (selectedLanguage.value) {
    store.loadStats(selectedLanguage.value)
  }
})
</script>

<style scoped>
select option {
  background-color: var(--color-surface-el);
  color: var(--color-text);
}
</style>
