<template>
  <main class="flex-1 overflow-y-auto p-6 md:p-8">
    <div class="max-w-lg mx-auto">
      <!-- Page header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-1" style="color: var(--color-text);">Log Activity</h2>
        <p class="text-sm" style="color: var(--color-text-muted);">Record a new language study session.</p>
      </div>

      <!-- Form card -->
      <div
        class="rounded-2xl border p-6 md:p-8"
        style="background-color: var(--color-surface); border-color: var(--color-border);"
      >
        <ActivityForm @log-success="onLogSuccess" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ActivityForm from '@/components/ActivityForm.vue'

const router = useRouter()

function onLogSuccess(_payload: { language: string }): void {
  // Small delay so the user sees the success message before redirect
  setTimeout(() => {
    router.push('/dashboard')
  }, 1200)
}
</script>
