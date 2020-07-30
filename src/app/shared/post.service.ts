import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDef } from './api.def';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getAllPost() {
    this.httpClient
      .get<Post>(ApiDef.POSTS_ENDPOINT)
      .subscribe((data) => console.log(data));
  }
}
