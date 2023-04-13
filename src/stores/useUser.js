import { defineStore } from 'pinia'
import UserServices from '@/services/UserServices.js'
import CharacterService from '@/services/CharacterService.js'


export const useUser = defineStore('useUser', {
  state: () => ({
    token: null,
    selectedCharacter: null
  }),
  persist: true,
  actions: {
    selectCharacter(char) {
      this.selectedCharacter = char
    },
    async login(email, password) {
      try {
        const response = await UserServices.login(email, password)
        this.token = response.token
      } catch (error) {
        this.token = null
        throw error;
      }
    },
    logout() {
      this.token = null
      this.selectedCharacter = null
    },
    async getFavs() {
      try {
        const response = await UserServices.getFavs(this.token)
        return response
      } catch (error) {
        throw error;
      }
    },
    async addFavs(id) {
      try {
        const response = await UserServices.addFavs(id, this.token)
        return response
      } catch (error) {
        throw error;
      }
    },
    async rmFavs(id) {
      try {
        const response = await UserServices.rmFavs(id, this.token)
        return response
      } catch (error) {
        throw error;
      }
    },
    async getCharacters(page) {
      try {
        const response = await CharacterService.getCharacters(page, this.token)
        return response
      } catch (error) {
        throw error;
      }
    },
    async getCharacter(id) {
      try {
        const response = await CharacterService.getCharacter(id, this.token)
        return response
      } catch (error) {
        throw error;
      }
    },
  },
})
