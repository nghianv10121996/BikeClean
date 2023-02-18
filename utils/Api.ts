import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 3000,
});

class RequestAPI {
  headers() {
    let headers = {
      "Content-Type": "application/json"
    }
    return headers;
  }

  async get(url: string) {
    try {
      const response = await instance.get(url, {
        headers: this.headers()
      });
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async post(url: string, params: any) {
    try {
      const response = await instance.post(url, params);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async put(url: string, params: any) {
    try {
      const response = await instance.put(url, params, {
        headers: this.headers()
      });
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(url: string) {
    console.log(url)
    try {
      const response = await instance.delete(url);
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new RequestAPI()