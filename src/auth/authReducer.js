import { AUTH_TYPES } from "../types/auth_types";


export const authReducer = ( state = {}, action ) => {

  switch (action.type) {
    case AUTH_TYPES.login:
      return {
        ...action.payload,
        logged: true
      };
    case AUTH_TYPES.logout:
      return {
        logged: false
      };
    default:
      return {
        ...state
      }
  }
}