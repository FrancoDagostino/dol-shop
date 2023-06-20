import { IUser } from "@/interface"
import { AuthState } from "./AuthProvider"



type AuthActionType = 
| {type: '[Auth] - Login', payload:IUser}
| {type: '[Auth] - Validation jwt',payload:IUser}
| {type: '[Auth] - Logout'}

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {


    switch (action.type) {
        case "[Auth] - Login":
            
           return{
                ...state,
                isLoggedIn: true,
                user: action.payload
           }

        case "[Auth] - Validation jwt":
        
        return{
            ...state,
            isLoggedIn: true,
            user: action.payload
        }   
        case "[Auth] - Logout":
        
        return{
                ...state,
                isLoggedIn:false,
                user:undefined,
           }
    
        default:
            return state
    }
}