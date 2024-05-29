import { supabase } from '@/supabase'
import type { User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUser = defineStore('user', () => {
  const user = ref<User | null>(null)

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    console.log(data)
    user.value = data.user
  }

  const isAuth = computed(() => !!user.value)

  return {
    user,
    isAuth,
    fetchUser
  }
})
