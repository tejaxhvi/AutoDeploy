import { createContext, useState } from "react";
import { getUserFromToken } from "./lib/auth";
import { useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function getUserInfo() {
      try {
        const token = localStorage.getItem('token')
        const userInfo = await getUserFromToken(token);
        console.log(userInfo);

        if (mounted) {
          setUser(userInfo);
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
