"use client";

import { auth } from "@/lib/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState, useContext } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  registerWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loginWithGoogle(): Promise<User> {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    return result.user;
  }

  async function loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  async function registerWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  async function logout(): Promise<void> {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData: AuthContextType = {
    user,
    loading,
    loginWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
  };
   
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
