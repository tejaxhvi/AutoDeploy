function getToken(){
  return localStorage.getItem("token");
}

export default function isAuthenticated(){
  return Boolean(getToken())
}