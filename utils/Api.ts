import axios from 'axios';
import { get } from "./LocalStorage/LocalStorage";
import { convertObjectToParams } from './helper';

const BASE_URL = "http://192.168.1.237:3000/";
const instance = axios.create({
  timeout: 3000,
});

class RequestAPI {
  baseUrl = null;

  constructor(baseUrl: any = BASE_URL) {
    this.baseUrl = baseUrl;
  }

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

  getUrl(path: string, params?: any) {
    let url = this.baseUrl + path;

    if (params) {
      url += `?${convertObjectToParams(params)}`;
    }

    return url;
  }

  async get(path: string, params: any, isAuthor?: boolean) {
    const url = this.getUrl(path, params);
    try {
      const response = await instance.get(url, {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      const errorMsg = error?.response.data.message;
      throw new Error(errorMsg);
    }
  }

  async post(path: string, params: any, isAuthor?: boolean) {
    const url = this.getUrl(path);
    try {
      const { data } = await instance.post(url, params, {
        headers: await this.headers(isAuthor)
      });
      return data;
    } catch (error: any) {
      const errorMsg = error?.response.data.message;
      throw new Error(errorMsg);
    }
  }

  async put(path: string, params: any, isAuthor?: boolean) {
    const url = this.getUrl(path);
    try {
      const response = await instance.put(url, JSON.stringify(params), {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      const errorMsg = error?.response.data.message;
      throw new Error(errorMsg);
    }
  }

  async delete(path: string, params: any, isAuthor?: boolean) {
    const url = this.getUrl(path, params);
    try {
      const response = await instance.delete(url, {
        headers: await this.headers(isAuthor)
      });
      return response;
    } catch (error: any) {
      const errorMsg = error?.response.data.message;
      throw new Error(errorMsg);
    }
  }
}

export default new RequestAPI()