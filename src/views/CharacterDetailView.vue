<script setup>
import { ref, onMounted } from 'vue';
import { useUser } from '@/stores/useUser'
import router from '@/router';

const store = useUser()

const character = ref({
  name: '',
  status: '',
  location: {},
  episode: ['']
})

const favs = ref([])

const isFav = (id) => {
  return favs.value.includes(id)
}

const manageFav = async (id) => {
  if (isFav(id)) {
    try {
      favs.value = await store.rmFavs(id)
    } catch (err) {
      console.log(err)
    }
  } else {
    try {
      favs.value = await store.addFavs(id)
    } catch (err) {
      console.log(err)
    }
  }
}
onMounted(async () => {
  if (store.selectedCharacter) {
    character.value = store.selectedCharacter
    favs.value = await store.getFavs()
  } else {
    router.push({ name: 'notFound' })
  }
})
</script>

<template>
  <v-container class="detail">
    <v-card color="#1F7087" theme="dark" max-width="800" width="90%">
      <v-row no-gutters class="child d-flex flex-column align-center">
        <v-col md="4" lg="4" class="d-flex align-center">
          <v-img :src="character.image" width="100%" height="220" class="align-center align-self-center" cover></v-img>
        </v-col>
        <v-col md="8" lg="8">
          <router-link :to="{ name: 'detail' }" @click="selectChar(character)"
            style="text-decoration: none; color: inherit;">
            <v-card-text class="text-left">
              <v-card-title>{{ character.name }}</v-card-title>
              <v-card-subtitle>{{ character.status }} - {{ character.species }}</v-card-subtitle>
              <v-card-text>
                <p>Last known location: {{ character.location.name }}</p>
              </v-card-text>
            </v-card-text>
          </router-link>
          <v-card-actions>
            <v-btn @click="manageFav(character.id)" class="ma-2" icon="mdi-heart"
              :color="isFav(character.id) ? 'red' : 'grey'"></v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<style scoped>
.detail {
  display: flex;
  justify-content: center;
  /* margin-top: 50px; */
  align-items: start;
  /* min-height: 100vh; */
}
</style>
