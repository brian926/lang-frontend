<template>
  <!-- Desktop sidebar -->
  <aside
    class="hidden md:flex flex-col w-56 min-h-screen border-r"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <!-- Logo -->
    <div
      class="flex items-center gap-3 px-5 py-5 border-b"
      style="border-color: var(--color-border);"
    >
      <div
        class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style="background-color: var(--color-primary);"
      >
        LT
      </div>
      <span class="font-semibold text-sm tracking-wide" style="color: var(--color-text);">
        Lang Tracker
      </span>
    </div>

    <!-- Nav links -->
    <nav class="flex flex-col gap-1 p-3 flex-1">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive('/') ? 'sidebar-link-active' : 'sidebar-link'"
      >
        <!-- Log icon -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Log Activity
      </RouterLink>

      <RouterLink
        to="/dashboard"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
        :class="isActive('/dashboard') ? 'sidebar-link-active' : 'sidebar-link'"
      >
        <!-- Dashboard icon -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        Dashboard
      </RouterLink>
    </nav>
  </aside>

  <!-- Mobile bottom tab bar -->
  <nav
    class="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
    style="background-color: var(--color-surface); border-color: var(--color-border);"
  >
    <RouterLink
      to="/"
      class="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors"
      :class="isActive('/') ? 'sidebar-link-active' : 'sidebar-link'"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      Log
    </RouterLink>
    <RouterLink
      to="/dashboard"
      class="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors"
      :class="isActive('/dashboard') ? 'sidebar-link-active' : 'sidebar-link'"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
      Dashboard
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<style scoped>
.sidebar-link {
  color: var(--color-text-muted);
}
.sidebar-link:hover {
  background-color: var(--color-surface-el);
  color: var(--color-text);
}
.sidebar-link-active {
  background-color: color-mix(in srgb, var(--color-primary) 15%, transparent);
  color: var(--color-primary);
}
</style>
