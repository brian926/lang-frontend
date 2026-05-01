<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <!-- Success message -->
    <div
      v-if="successMessage"
      class="mb-5 px-4 py-3 rounded-lg text-sm font-medium"
      style="background-color: color-mix(in srgb, var(--color-success) 15%, transparent); color: var(--color-success); border: 1px solid color-mix(in srgb, var(--color-success) 30%, transparent);"
    >
      {{ successMessage }}
    </div>

    <!-- Form-level error -->
    <div
      v-if="store.submitError"
      class="mb-5 px-4 py-3 rounded-lg text-sm font-medium"
      style="background-color: color-mix(in srgb, var(--color-error) 15%, transparent); color: var(--color-error); border: 1px solid color-mix(in srgb, var(--color-error) 30%, transparent);"
    >
      {{ store.submitError }}
    </div>

    <div class="flex flex-col gap-5">
      <!-- Language -->
      <div>
        <label for="language" class="block text-sm font-medium mb-1.5" style="color: var(--color-text);">
          Language
        </label>
        <select
          id="language"
          v-model="form.language"
          class="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text);"
          :class="errors.language ? 'border-[var(--color-error)]' : ''"
        >
          <option value="" disabled>Select a language</option>
          <option v-for="lang in LANGUAGES" :key="lang" :value="lang">{{ lang }}</option>
          <option value="other">Other / Custom</option>
        </select>
        <p v-if="errors.language" class="mt-1 text-xs" style="color: var(--color-error);">{{ errors.language }}</p>
      </div>

      <!-- Custom language input -->
      <div v-if="form.language === 'other'">
        <label for="customLanguage" class="block text-sm font-medium mb-1.5" style="color: var(--color-text);">
          Custom Language
        </label>
        <input
          id="customLanguage"
          v-model="form.customLanguage"
          type="text"
          placeholder="e.g. Swahili"
          class="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text);"
          :class="errors.language ? 'border-[var(--color-error)]' : ''"
        />
        <p v-if="errors.language" class="mt-1 text-xs" style="color: var(--color-error);">{{ errors.language }}</p>
      </div>

      <!-- Activity Type -->
      <div>
        <label for="activityType" class="block text-sm font-medium mb-1.5" style="color: var(--color-text);">
          Activity Type
        </label>
        <select
          id="activityType"
          v-model="form.activityType"
          class="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text);"
          :class="errors.activityType ? 'border-[var(--color-error)]' : ''"
        >
          <option value="" disabled>Select activity type</option>
          <option v-for="type in ACTIVITY_TYPES" :key="type" :value="type">{{ type }}</option>
        </select>
        <p v-if="errors.activityType" class="mt-1 text-xs" style="color: var(--color-error);">{{ errors.activityType }}</p>
      </div>

      <!-- Minutes -->
      <div>
        <label for="minutes" class="block text-sm font-medium mb-1.5" style="color: var(--color-text);">
          Minutes
        </label>
        <input
          id="minutes"
          v-model.number="form.minutes"
          type="number"
          min="1"
          max="1440"
          placeholder="e.g. 30"
          class="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text);"
          :class="errors.minutes ? 'border-[var(--color-error)]' : ''"
        />
        <p v-if="errors.minutes" class="mt-1 text-xs" style="color: var(--color-error);">{{ errors.minutes }}</p>
      </div>

      <!-- Date -->
      <div>
        <label for="date" class="block text-sm font-medium mb-1.5" style="color: var(--color-text);">
          Date
        </label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          class="w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors focus:ring-2 focus:ring-[var(--color-primary)]"
          style="background-color: var(--color-surface-el); border-color: var(--color-border); color: var(--color-text); color-scheme: dark;"
          :class="errors.date ? 'border-[var(--color-error)]' : ''"
        />
        <p v-if="errors.date" class="mt-1 text-xs" style="color: var(--color-error);">{{ errors.date }}</p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="store.submitLoading"
        class="w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        style="background-color: var(--color-primary); color: #fff;"
        @mouseenter="(e) => { if (!store.submitLoading) (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary-hover)' }"
        @mouseleave="(e) => { (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)' }"
      >
        <span v-if="store.submitLoading" class="flex items-center justify-center gap-2">
          <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Saving…
        </span>
        <span v-else>Save Activity</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useActivityStore } from '@/store/index'
import { LANGUAGES, ACTIVITY_TYPES } from '@/constants'

const emit = defineEmits<{
  (e: 'log-success', payload: { language: string }): void
}>()

const store = useActivityStore()

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

interface FormState {
  language: string
  customLanguage: string
  activityType: string
  minutes: number | null
  date: string
}

interface FormErrors {
  language: string | null
  activityType: string | null
  minutes: string | null
  date: string | null
}

const form = reactive<FormState>({
  language: '',
  customLanguage: '',
  activityType: '',
  minutes: null,
  date: today(),
})

const errors = reactive<FormErrors>({
  language: null,
  activityType: null,
  minutes: null,
  date: null,
})

const successMessage = ref<string | null>(null)

function validateForm(): boolean {
  errors.language = null
  errors.activityType = null
  errors.minutes = null
  errors.date = null

  let valid = true

  const resolvedLanguage = form.language === 'other' ? form.customLanguage.trim() : form.language
  if (!resolvedLanguage) {
    errors.language = form.language === 'other' ? 'Please enter a custom language.' : 'Please select a language.'
    valid = false
  }

  if (!form.activityType) {
    errors.activityType = 'Please select an activity type.'
    valid = false
  }

  if (form.minutes === null || form.minutes === undefined || isNaN(form.minutes)) {
    errors.minutes = 'Please enter the number of minutes.'
    valid = false
  } else if (!Number.isInteger(form.minutes) || form.minutes < 1 || form.minutes > 1440) {
    errors.minutes = 'Minutes must be a whole number between 1 and 1440.'
    valid = false
  }

  if (!form.date) {
    errors.date = 'Please select a date.'
    valid = false
  }

  return valid
}

function resetForm(): void {
  form.language = ''
  form.customLanguage = ''
  form.activityType = ''
  form.minutes = null
  form.date = today()
}

async function handleSubmit(): Promise<void> {
  successMessage.value = null

  if (!validateForm()) return

  const resolvedLanguage = form.language === 'other' ? form.customLanguage.trim() : form.language

  try {
    await store.submitLog({
      language: resolvedLanguage,
      activityType: form.activityType,
      minutes: form.minutes as number,
      date: form.date,
    })
    successMessage.value = 'Activity saved successfully!'
    emit('log-success', { language: resolvedLanguage })
    resetForm()
  } catch {
    // error is surfaced via store.submitError
  }
}
</script>

<style scoped>
select option {
  background-color: var(--color-surface-el);
  color: var(--color-text);
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 0.5;
}
</style>
