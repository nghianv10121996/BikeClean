import axios from 'axios';
import { get } from "./LocalStorage/LocalStorage";

const instance = axios.create({
  baseURL: 'http://192.168.1.237:3000/',
  timeout: 3000,
});

class RequestAPI {
  async headers(isAuthor?: boolean) {
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (isAuthor) {
      const token = await get("token");
      headers = {
        ...headers,
        "Authorization": `Bearer ${token}`
      }
    }

    return headers;
  }

  async get(url: string, isAuthor?: boolean) {
    try {
      const response = await instance.get(url, {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async post(url: string, params: any, isAuthor?: boolean) {
    try {
      const { data } = await instance.post(url, params, {
        headers: await this.headers(isAuthor)
      });
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async put(url: string, params: any, isAuthor?: boolean) {
    try {
      const response = await instance.put(url, JSON.stringify(params), {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete(url: string, isAuthor?: boolean) {
    try {
      const response = await instance.delete(url, {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new RequestAPI()