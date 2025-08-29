<template>
  <form @submit.prevent="submitForm" class="space-y-4 max-w-md bg-white p-6 rounded-2xl shadow">
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
        <option disabled value="">Select activity</option>
        <option>Watching</option>
        <option>Listening</option>
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
    <div class="flex justify-end">
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Add Log
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useActivityStore } from '../store'

const store = useActivityStore()

const language = ref('')
const activity = ref('')
const hours = ref(0)
const minutes = ref(0)

function submitForm() {
  // Add log to store
  store.logs.push({
    language: language.value,
    activity: activity.value,
    minutes: hours.value * 60 + minutes.value,
    date: new Date().toISOString().split('T')[0],
  })

  // Reset form
  language.value = ''
  activity.value = ''
  hours.value = 0
  minutes.value = 0
}
</script>
