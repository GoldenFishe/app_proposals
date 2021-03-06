import {SignInAction, User} from "../SignIn/types";

export interface MainState {
    user: User | null
}

export type MainActionTypes = SignInAction