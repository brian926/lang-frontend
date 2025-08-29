<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-blue-600">Language Tracker</h1>
      <p class="text-gray-600">Track your study hours by activity and language</p>
    </header>

    <!-- Stats Section -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="p-4 bg-white rounded-2xl shadow">
        <h2 class="text-lg font-semibold">Today</h2>
        <p class="text-2xl font-bold text-green-600">1h 20m</p>
      </div>
      <div class="p-4 bg-white rounded-2xl shadow">
        <h2 class="text-lg font-semibold">This Week</h2>
        <p class="text-2xl font-bold text-indigo-600">6h 40m</p>
      </div>
      <div class="p-4 bg-white rounded-2xl shadow">
        <h2 class="text-lg font-semibold">This Month</h2>
        <p class="text-2xl font-bold text-purple-600">24h 10m</p>
      </div>
    </section>

    <!-- Add Log Form -->
    <section class="p-6 bg-white rounded-2xl shadow">
      <h2 class="text-xl font-semibold mb-4">Log New Activity</h2>
      <form @submit.prevent="logActivity" class="grid gap-4 md:grid-cols-2">
        <!-- Language -->
        <div>
          <label class="block mb-1 text-gray-700">Language</label>
          <input v-model="language" type="text" placeholder="e.g. Spanish"
                 class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" />
        </div>

        <!-- Activity -->
        <div>
          <label class="block mb-1 text-gray-700">Activity</label>
          <select v-model="activity" class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300">
            <option>Listening</option>
            <option>Watching</option>
            <option>Talking</option>
          </select>
        </div>

        <!-- Hours -->
        <div>
          <label class="block mb-1 text-gray-700">Hours</label>
          <input v-model.number="hours" type="number" min="0" class="w-full border rounded-lg p-2" />
        </div>

        <!-- Minutes -->
        <div>
          <label class="block mb-1 text-gray-700">Minutes</label>
          <input v-model.number="minutes" type="number" min="0" max="59" class="w-full border rounded-lg p-2" />
        </div>

        <!-- Submit -->
        <div class="md:col-span-2 flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Log
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const language = ref('')
const activity = ref('Listening')
const hours = ref(0)
const minutes = ref(0)

function logActivity() {
  console.log("Log saved:", {
    language: language.value,
    activity: activity.value,
    hours: hours.value,
    minutes: minutes.value
  })

  // reset form
  language.value = ''
  activity.value = 'Listening'
  hours.value = 0
  minutes.value = 0
}
</script>
