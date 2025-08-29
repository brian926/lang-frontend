<script setup lang="ts">
import { ref } from "vue"

interface LogEntry {
  language: string
  activity: "Watching" | "Listening" | "Talking"
  minutes: number
  date: string
}

const emit = defineEmits<{ (e: "submit", entry: LogEntry): void }>()

const form = ref<LogEntry>({
  language: "",
  activity: "Watching",
  minutes: 0,
  date: new Date().toISOString().split("T")[0],
})

function handleSubmit() {
  emit("submit", { ...form.value })
  form.value.language = ""
  form.value.minutes = 0
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-md">
    <input v-model="form.language" type="text" placeholder="Language" class="border p-2 rounded" />
    <select v-model="form.activity" class="border p-2 rounded">
      <option>Watching</option>
      <option>Listening</option>
      <option>Talking</option>
    </select>
    <input v-model.number="form.minutes" type="number" placeholder="Minutes" class="border p-2 rounded" />
    <input v-model="form.date" type="date" class="border p-2 rounded" />
    <button type="submit" class="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">
      Log Activity
    </button>
  </form>
</template>
