import { useState } from "react";
import { getUserFromToken } from "../lib/auth.js";
import { useEffect } from "react";
import { AuthContext } from "./create-context";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userInfo = await getUserFromToken(token);

          if (mounted) {
            setUser(userInfo);
          }
        }
      } catch (err) {
        console.error("[AuthContext] Failed to load user:", err.message);
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getUserInfo();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}