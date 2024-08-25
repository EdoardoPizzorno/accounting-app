import { Injectable } from '@angular/core';
import _axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private REST_API_SERVER: string = 'http://localhost:3000/api/';

  constructor() { }

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
    console.error(err);
  }

}
