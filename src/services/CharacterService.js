const baseURL = 'http://localhost:9000'
export default {
  async getCharacters(page, jwt) {
    try {
      const response = await fetch(`${baseURL}/characters/?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      const json = await response.json()
      return json.data
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  },
  async getCharacter(id, jwt) {
    try {
      const response = await fetch(`${baseURL}/character/${id}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      const json = await response.json()
      return await json
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }
}