import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken( token ) {
  return localStorage.setItem('token', token)
}

export const clearToken = () => {
  localStorage.clear('token')
}

export const getHeader = () => {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export function isTokenExpired(){
   const token = getToken();

  if (!token) {
    return true;
  }

  const decode = jwtDecode(token)
  const isExpired = decode.exp < Date.now() / 1000;

  if (isExpired) {
      clearToken()
      return true;
    }

  return false;
}