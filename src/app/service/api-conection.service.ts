import { Injectable } from '@angular/core';
import { __123environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiConectionService {

  Api_url = __123environment.baseUrl;

  constructor() { }
}
