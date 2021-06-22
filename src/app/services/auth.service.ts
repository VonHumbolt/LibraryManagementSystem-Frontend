import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { UserForLogin } from '../models/userForLogin';
import { UserForRegister } from '../models/userForRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://localhost:44335/api/auth/"

  constructor(private httpClient: HttpClient) { }

  getUserByEmail(email: string) : Observable<SingleResponseModel<User>>{
    let url = this.apiUrl + "getUserByEmail/?email="+email;
    return this.httpClient.get<SingleResponseModel<User>>(url);
  }

  register(user: UserForRegister) : Observable<SingleResponseModel<TokenModel>> {
    let url = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, user);
  }

  login(user: UserForLogin) : Observable<SingleResponseModel<TokenModel>>{
    let url = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url, user);
  }

  getUserClaims(user: User): Observable<ListResponseModel<OperationClaim>>{
    let url = this.apiUrl + "getUserClaims";
    return this.httpClient.post<ListResponseModel<OperationClaim>>(url,user);
  }

}
