import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem('token')
}

export default function isAuthenticated(){
   const token = getToken();

  if (!token) {
    return false;
  }

  const decode = jwtDecode(token)
  const isExpired = decode.exp < Date.now() / 1000;

  if (isExpired) {
      localStorage.removeItem('token')
      return false;
    }
    return true;
}