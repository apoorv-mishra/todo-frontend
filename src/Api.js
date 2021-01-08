const axios = require('axios');

class Api {
  static API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

  static async getTodos() {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await axios({
        url: `${this.API_BASE_URL}/todos`,
        params: {
          userId: user.id,
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      });

      if (res.data.message === 'Todos!') {
        return res.data.todos;
      }

      return [];
    } catch(err) {
      throw err;
    }
  }

  static async updateTodo(id, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await axios({
        url: `${this.API_BASE_URL}/todo/${id}/update`,
        method: 'PATCH',
        params: {
          userId: user.id
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        data,
      });
    } catch(err) {
      throw err;
    }
  }

  static async login({ email, password }) {
    try {
      const res = await axios({
        url: `${this.API_BASE_URL}/login`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      });

      return res.data;
    } catch(err) {
      throw err;
    }
  }

  static async signup({ firstName, lastName, email, password }) {
    try {
      const res = await axios({
        url: `${this.API_BASE_URL}/signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      return res.data;
    } catch(err) {
      throw err;
    }
  }

  static async createTodo({ name }) {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await axios({
        url: `${this.API_BASE_URL}/todo/create`,
        method: 'POST',
        params: {
          userId: user.id,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        data: {
          name
        },
      });

      return res.data;
    } catch(err) {
    }
  }
}

export default Api;

