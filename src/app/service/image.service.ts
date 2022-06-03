import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiConectionService } from './api-conection.service';

import { Observable } from "rxjs";
import { Image } from '../models/image.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
    private apiConectionService: ApiConectionService) { }

  public create(urlImage: string):any {
    let url = this.apiConectionService.Api_url + "Image/create";
    return this.http.post(url,{urlImage});
  }

  public generateUrl(file:File):any{

    let formData:FormData = new FormData();
    formData.append('image',file);

    let url = "https://api.imgbb.com/1/upload?key=75e7a3aa56b50a533f2e9946f232fb6a";
 
    return this.http.post(url,formData);
  }
}
