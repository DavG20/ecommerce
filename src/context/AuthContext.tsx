import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  email: string;
  name?: string;
};

export type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth:user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const login = (email: string, name?: string) => {
    const nextUser: AuthUser = { email, name };
    setUser(nextUser);
    localStorage.setItem('auth:user', JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth:user');
  };

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(user),
    user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


