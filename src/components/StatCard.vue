<template>
  <div
    class="rounded-xl p-5 border"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <p class="text-xs font-medium uppercase tracking-wider mb-3" style="color: var(--color-text-muted);">
      {{ label }}
    </p>

    <!-- Skeleton -->
    <div v-if="loading" class="animate-pulse">
      <div
        class="h-8 w-24 rounded-md"
        style="background-color: var(--color-surface-el);"
      ></div>
    </div>

    <!-- Value -->
    <div v-else class="flex items-baseline gap-1.5">
      <span class="text-3xl font-bold" style="color: var(--color-text);">
        {{ displayValue }}
      </span>
      <span class="text-sm font-medium" style="color: var(--color-text-muted);">
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: number
    unit?: string
    loading?: boolean
  }>(),
  {
    unit: 'min',
    loading: false,
  }
)

const displayValue = computed(() => {
  if (props.unit === 'h') {
    return props.value % 1 === 0 ? props.value.toString() : props.value.toFixed(1)
  }
  return props.value.toString()
})
</script>
