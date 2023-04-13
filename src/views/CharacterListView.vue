<script setup>
import { ref, onMounted } from 'vue';
import { useUser } from '@/stores/useUser'

const store = useUser()

const characters = ref([])
const favs = ref([])

onMounted(async () => {
  characters.value = await store.getCharacters(1)
  favs.value = await store.getFavs()
})

const isFav = (id) => {
  return favs.value.includes(id)
}

const selectChar = (item) => {
  store.selectCharacter(item)
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
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12" lg="6" v-for="item in characters" :key="item.id">
        <v-card color="#1F7087" theme="dark">
          <v-row no-gutters class="d-flex flex-column text-center flex-sm-row">
            <v-col md="4" lg="4" class="d-flex align-content-center">
              <v-img :src="item.image" width="100%" height="220" class="align-self-center" cover></v-img>
            </v-col>
            <v-col md="8" lg="8">
              <router-link :to="{ name: 'detail' }" @click="selectChar(item)"
                style="text-decoration: none; color: inherit;">
                <v-card-text class="text-left">
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-subtitle>{{ item.status }} - {{ item.species }}</v-card-subtitle>
                  <v-card-text>
                    <p>Last known location: {{ item.location.name }}</p>
                  </v-card-text>
                </v-card-text>
              </router-link>
              <v-card-actions>
                <v-btn @click="manageFav(item.id)" class="ma-2" icon="mdi-heart"
                  :color="isFav(item.id) ? 'red' : 'grey'"></v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>