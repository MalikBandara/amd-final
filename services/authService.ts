import { auth } from "@/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { sendPasswordResetEmail } from "firebase/auth";

// Register with name, email & password
export const register = async (name: string, email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password)

  // Update displayName
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
  }

  return cred
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}
export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const logout = () => {
  return signOut(auth)
}
