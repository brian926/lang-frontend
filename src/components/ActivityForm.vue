<template>
  <form @submit.prevent="submitForm" class="space-y-4 max-w-md bg-white p-6 rounded-2xl shadow">
    <!-- Language -->
    <div>
      <label class="block mb-1 text-gray-700">Language</label>
      <input v-model="language" type="text" placeholder="e.g. Spanish"
             class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300" required />
    </div>

    <!-- Activity -->
    <div>
      <label class="block mb-1 text-gray-700">Activity</label>
      <select v-model="activityType" class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300">
        <option disabled value="">Select activity</option>
        <option>Watching</option>
        <option>Listening</option>
        <option>Talking</option>
        <option>Reading</option>
        <option>Speaking</option>
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
      <input v-model.number="mins" type="number" min="0" max="59" class="w-full border rounded-lg p-2" />
    </div>

    <!-- Error -->
    <p v-if="store.submitError" class="text-sm text-red-600">{{ store.submitError }}</p>
    <!-- Success -->
    <p v-if="successMsg" class="text-sm text-green-600">{{ successMsg }}</p>

    <!-- Submit -->
    <div class="flex justify-end">
      <button
        type="submit"
        :disabled="store.submitLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {{ store.submitLoading ? 'Saving…' : 'Add Log' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useActivityStore } from '@/store'

const store = useActivityStore()

const language = ref('')
const activityType = ref('')
const hours = ref(0)
const mins = ref(0)
const successMsg = ref('')

async function submitForm() {
  const totalMinutes = hours.value * 60 + mins.value
  if (totalMinutes <= 0) return

  successMsg.value = ''
  try {
    await store.submitLog({
      language: language.value,
      activityType: activityType.value,
      minutes: totalMinutes,
      date: new Date().toISOString().split('T')[0],
    })
    successMsg.value = 'Log saved!'
    language.value = ''
    activityType.value = ''
    hours.value = 0
    mins.value = 0
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch {
    // error already set in store.submitError
  }
}
</script>
