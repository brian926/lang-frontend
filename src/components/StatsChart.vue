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

const props = defineProps<{
  percentages: Record<string, number>
}>()

const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444',
  '#3b82f6', '#a855f7', '#14b8a6', '#f97316',
]

const chartData = computed(() => {
  const labels = Object.keys(props.percentages)
  const values = Object.values(props.percentages)
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
        borderWidth: 1,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { label: string; raw: unknown }) =>
          `${ctx.label}: ${Number(ctx.raw).toFixed(1)}%`,
      },
    },
  },
}
</script>

<template>
  <div class="w-36 h-36">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
