import {SIGN_IN} from "./actionTypes";

export interface User {

}

export interface SignInAction {
    type: typeof SIGN_IN,
    payload: User
}