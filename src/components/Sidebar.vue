<template>
  <aside class="w-64 bg-gray-100 p-4">
    <nav>
      <ul class="space-y-1">
        <li>
          <router-link
            to="/"
            class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
            active-class="bg-blue-100 text-blue-700 font-medium"
          >
            Log Activity
          </router-link>
        </li>
        <li>
          <router-link
            to="/dashboard"
            class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
            active-class="bg-blue-100 text-blue-700 font-medium"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/login"
            class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
            active-class="bg-blue-100 text-blue-700 font-medium"
          >
            Login
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
