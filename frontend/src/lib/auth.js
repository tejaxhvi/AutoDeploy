import { AuthContext } from "@/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";

const JWT_SECRET =
  import.meta.env.VITE_JWT_SECRET ||
  "THIS-IS-MY-FIRST-PROJECT-WHERE-IAM-LEARNING";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

export async function getUserFromToken(token) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  if (!token) throw new Error("No token found!")
  const decoded = jwtDecode(token);
  console.log(decoded);

  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorisation: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log("Response from Backend", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to login. Please check your credentials.",
      );
    }

    return data;
  } catch (err) {
    throw new Error("Backend is Down !", err);
  }
}

export default function useAuth() {
  return useContext(AuthContext);
}
