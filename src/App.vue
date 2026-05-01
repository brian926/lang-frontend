<template>
  <div
    class="flex min-h-screen"
    style="background-color: var(--color-bg); color: var(--color-text);"
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
</script>
