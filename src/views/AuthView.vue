<script setup>
import { ref } from 'vue'
import router from '@/router';
import { useUser } from '@/stores/useUser'

const store = useUser()

let email = ref('')
let password = ref('')
let loading = ref(false)
let valid = ref(false)
let error = ref(false)
const errorText = "Wrong email or password"

const emailRules = [
  value => {
    return /.+@.+\..+/.test(value) || 'Invalid e-mail.'
  },
]

const passwordRules = [
  value => {
    if (value) return true

    return 'Password requred.'
  },
]

const authUser = async () => {
  if (!valid.value) return

  loading.value = true
  try {
    await store.login(email.value, password.value)
    loading.value = false
    router.push({ name: 'home' })
  } catch (err) {
    error.value = true
    setTimeout(() => {
      error.value = false;
    }, 2000);
  }
  loading.value = false
}
</script>
<template>
  <div class="d-flex justify-center ma-4">
    <v-alert v-show="error" type="error" :text="errorText"></v-alert>
  </div>
  <v-card class="mx-auto px-6 py-8" color="#1F7087" theme="dark" max-width="344">
    <v-form v-model="valid" @submit.prevent="authUser">
      <v-text-field v-model="email" class="mb-2" clearable :readonly="loading" :rules="emailRules" label="Email"
        type="email"></v-text-field>

      <v-text-field v-model="password" class="mb-2" clearable :readonly="loading" :rules="passwordRules" label="Password"
        type="password" placeholder="Enter your password"></v-text-field>

      <v-btn :disabled="!valid" :loading="loading" block size="large" type="submit" variant="elevated">
        Sign In
      </v-btn>
    </v-form>
  </v-card>
</template>

<style></style>