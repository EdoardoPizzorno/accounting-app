import { Injectable } from '@angular/core';
import _axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private REST_API_SERVER: string = 'http://localhost:3000/api/';

  constructor() {
    _axios.interceptors.response.use((response: any) => {
      let token: any = response.headers["authorization"];
      if (token) {
        localStorage.setItem("accounting-app-token", JSON.stringify({ token }));
        if (response.data.user)
          localStorage.setItem("accounting-app-user", JSON.stringify(response.data.user));
      }
      return response;
    });

    _axios.interceptors.request.use((config: any) => {
      let cache: any = localStorage.getItem("accounting-app-token");
      if (cache) {
        cache = JSON.parse(cache);
        if (cache.token === undefined) {
          localStorage.removeItem("accounting-app-token");
        } else {
          config.headers["authorization"] = cache.token;
        }
      }
      return config;
    });

  }

  public sendRequest(method: string, resource: string, params: any = {}): Promise<any> {
    resource = this.REST_API_SERVER + resource;
    switch (method.toUpperCase()) {
      case 'GET':
        return _axios.get(resource, { params });
      case 'POST':
        return _axios.post(resource, params);
      case 'PATCH':
        return _axios.patch(resource, params);
      case 'PUT':
        return _axios.put(resource, params);
      case 'DELETE':
        return _axios.delete(resource);
      default:
        return _axios.get(resource);

    }
  }

  public error(err: any) {
    console.log(err);
    switch (err.response.status) {
      case 401:
        localStorage.removeItem("accounting-app-token");
        localStorage.removeItem("accounting-app-user");
        window.location.href = "/login";
        break;
      case 403:
        localStorage.removeItem("accounting-app-token");
        localStorage.removeItem("accounting-app-user");
        //window.location.href = "/login";
        break;
      default:
        break;
    }
  }

  private logout() {
    localStorage.removeItem("accounting-app-token");
    localStorage.removeItem("accounting-app-user");
    window.location.href = "/login";
  }

}
