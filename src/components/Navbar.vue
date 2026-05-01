<template>
  <header
    class="flex items-center px-6 py-4 border-b"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <h1 class="text-base font-semibold" style="color: var(--color-text);">
      {{ pageTitle }}
    </h1>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const meta = route.meta
  if (meta && typeof meta.title === 'string') return meta.title
  return 'Lang Tracker'
})
</script>
