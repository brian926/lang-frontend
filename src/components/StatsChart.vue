<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

// Apply dark-mode defaults globally once
ChartJS.defaults.color = '#8b92a9'

const props = defineProps<{
  percentages: Record<string, number>
}>()

const COLORS = [
  '#6c63ff', '#22c55e', '#f59e0b', '#ef4444',
  '#3b82f6', '#a855f7', '#14b8a6', '#f97316',
]

const isEmpty = computed(() => Object.keys(props.percentages).length === 0)

const chartData = computed(() => {
  const labels = Object.keys(props.percentages)
  const values = Object.values(props.percentages)
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
        borderColor: '#1a1d27',
        borderWidth: 2,
        hoverBorderColor: '#22263a',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        color: '#8b92a9',
        padding: 16,
        font: { size: 12 },
        usePointStyle: true,
        pointStyleWidth: 10,
      },
    },
    tooltip: {
      backgroundColor: '#22263a',
      titleColor: '#e8eaf0',
      bodyColor: '#8b92a9',
      borderColor: '#2d3148',
      borderWidth: 1,
      callbacks: {
        label: (ctx: { label: string; raw: unknown }) =>
          ` ${ctx.label}: ${Number(ctx.raw).toFixed(1)}%`,
      },
    },
  },
}
</script>

<template>
  <div>
    <!-- Empty state -->
    <div
      v-if="isEmpty"
      class="flex flex-col items-center justify-center py-12 text-sm"
      style="color: var(--color-text-muted);"
    >
      <svg class="w-10 h-10 mb-3 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4m0 4h.01"/>
      </svg>
      No activity data yet
    </div>

    <!-- Chart -->
    <div v-else class="w-full" style="height: 280px;">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
