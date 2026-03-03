// src/context/AuthContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import api from "@/utils/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasLoaded = useRef(false);

  //////////////////////////////////////////////////////
  // LOAD USER (ครั้งเดียวจริง ๆ แม้ StrictMode)
  //////////////////////////////////////////////////////
  const loadUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me", {
        skipLoading: true,
      });

      setUser(res?.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadUser();
  }, [loadUser]);

  //////////////////////////////////////////////////////
  // AUTO REVALIDATE (tab focus)
  //////////////////////////////////////////////////////
  useEffect(() => {
    const handleFocus = () => loadUser();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadUser]);

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////
  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials, {
      skipLoading: true,
    });

    setUser(res.data.user);
    return res;
  };

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { skipLoading: true });
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  };

  //////////////////////////////////////////////////////
  // REFRESH USER
  //////////////////////////////////////////////////////
  const refreshUser = async () => {
    await loadUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        refreshUser,
        isLoggedIn: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

////////////////////////////////////////////////////////
// Safe Hook
////////////////////////////////////////////////////////
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};