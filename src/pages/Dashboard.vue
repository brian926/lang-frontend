<script setup lang="ts">
import { ref, computed } from "vue"
import LogForm from "../components/LogForm.vue"
import StatsChart from "../components/StatsChart.vue"

const logs = ref<any[]>([])

function addLog(entry: any) {
  logs.value.push(entry)
}

const stats = computed(() => [
  { name: "Watching", value: logs.value.filter(l => l.activity === "Watching").reduce((a, b) => a + b.minutes, 0) },
  { name: "Listening", value: logs.value.filter(l => l.activity === "Listening").reduce((a, b) => a + b.minutes, 0) },
  { name: "Talking", value: logs.value.filter(l => l.activity === "Talking").reduce((a, b) => a + b.minutes, 0) },
])
</script>

<template>
  <div class="p-6 flex flex-col gap-6">
    <LogForm @submit="addLog" />
    <StatsChart :data="stats" />
  </div>
</template>
