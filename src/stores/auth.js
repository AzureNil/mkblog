import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  // Future backend integration will populate { id, username, type } after
  // verifying a server session. There is deliberately no mock login or persistence.
  const status = ref('anonymous')
  const user = ref(null)
  const isAuthenticated = computed(() => status.value === 'authenticated' && user.value !== null)

  function clearSession() {
    user.value = null
    status.value = 'anonymous'
  }

  return { status, user, isAuthenticated, clearSession }
})
