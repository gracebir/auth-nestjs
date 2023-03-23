import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    login(){
        return {msg: 'sign up'}
    }
     signin(){
        return {msg: 'sign in'}
     }
}