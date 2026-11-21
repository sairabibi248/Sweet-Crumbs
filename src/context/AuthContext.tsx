import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  /** Email of the logged in user or null if no one is logged in */
  user: string | null;
  /** Logs the user in and saves the email in localStorage */
  login: (email: string) => void;
  /** Logs the user out and removes the email from localStorage */
  logout: () => void;
};

/**
 * Props of AuthProvider.
 */

type AuthProviderProps = {
  /** All pages and components that need the logged in user */
  children: ReactNode;
};

/**
 * Context that holds the logged in user for the whole app.
 * Starts as null and gets its real value from AuthProvider.
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provides the logged in user to the whole app.
 * Saves the user in localStorage so the user stays logged in after a refresh.
 * Wraps the App in main.tsx.
 */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  /**
   * Email of the logged in user.
   * Starts with the email saved in localStorage or null.
   * Changed by login and logout.
   */

  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("user"),
  );

  /**
   * Logs the user in and saves the email in localStorage.
   * Called by the Login page after the form is valid.
   *
   * @param email The email the user typed on the login page
   */

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("user", email);
  };

  /**
   * Logs the user out and removes the email from localStorage.
   * Called by the Logout button in the Header.
   */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook that gives the logged-in user data from AuthContext.
 * Throws an error if it is used outside AuthProvider.
 * Used in ProtectedRoute and Login and Header.
 *
 * @returns The user and the login and logout functions
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
