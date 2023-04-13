const baseURL = 'http://localhost:9000'

export default {
  async login(email, password) {
    const url = `${baseURL}/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      const json = await response.json()
      if (json.err) {
        throw new Error(json.err);
      }

      return await json
    } catch (error) {
      throw error;
    }
  },
  async getFavs(jwt) {
    try {
      const response = await fetch(`${baseURL}/favs`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      const json = await response.json();
      return await json.data

    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async addFavs(id, jwt) {
    try {
      const response = await fetch(`${baseURL}/favs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          id
        })
      });
      const json = await response.json();
      return await json.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async rmFavs(id, jwt) {
    try {
      const response = await fetch(`${baseURL}/favs`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          id
        })
      });
      const json = await response.json();
      return await json.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}