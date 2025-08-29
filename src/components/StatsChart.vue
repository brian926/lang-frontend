<script setup lang="ts">
import { PieChart, Pie, Cell, Tooltip } from "recharts"

defineProps<{ data: { name: string; value: number }[] }>()

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]
</script>

<template>
  <PieChart width="300" height="300">
    <Pie
      :data="data"
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      :outerRadius="100"
      fill="#8884d8"
      label
    >
      <Cell
        v-for="(entry, index) in data"
        :key="entry.name"
        :fill="COLORS[index % COLORS.length]"
      />
    </Pie>
    <Tooltip />
  </PieChart>
</template>
