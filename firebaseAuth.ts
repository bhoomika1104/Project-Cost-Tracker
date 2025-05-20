import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);

// Create new provider instance each time
const createGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    login_hint: ""
  });
  return provider;
};

export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, createGoogleProvider());
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};