<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from '@/router';
import { useUser } from '@/stores/useUser'

const store = useUser()
const logout = () => {
    store.logout()
    router.push({ name: 'login' })
}

</script>

<template>
  <v-toolbar app  v-if="store.token !== null" color="#1F7087" theme="dark">
    <v-toolbar-title>
      <router-link :to="{name: 'home'}" style="cursor: pointer; text-decoration: none; color: inherit;">
        Rick&Morty
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout">
      logout
    </v-btn>
  </v-toolbar>
  <router-view></router-view>
</template>
<style>

</style>