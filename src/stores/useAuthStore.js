import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "../firebase.config";
import { axiosInstance } from "../utils/axiosInstance";

const provider = new GoogleAuthProvider();

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isSigningIn: false,
      isGoogleSigningIn: false,
      isAuthLoading: true,
      isUserReady: false,
      error: "",
      isCookieReady: false,

      sendTokenToBackend: async (user) => {
        if (!user) return;
        const idToken = await user.getIdToken();
        await axiosInstance.post(
          "/users/login",
          { idToken },
          { withCredentials: true }
        );
        set({ isCookieReady: true });
      },

      signInWithGoogle: async () => {
        try {
          set({ isGoogleSigningIn: true });
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          await get().sendTokenToBackend(user);
          set({ user, isUserReady: true });
          return { user };
        } catch (err) {
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isGoogleSigningIn: false });
        }
      },

      signUp: async (name, email, password, image) => {
        set({ isSigningIn: true });
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseUser = result.user;
          await updateProfile(firebaseUser, {
            displayName: name,
            photoURL: image,
          });
          await get().sendTokenToBackend(firebaseUser);
          set({ user: firebaseUser, isUserReady: true });
          return { user: firebaseUser };
        } catch (err) {
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isSigningIn: false });
        }
      },

      signIn: async (email, password) => {
        set({ isSigningIn: true });
        try {
          const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const firebaseUser = result.user;
          await get().sendTokenToBackend(firebaseUser);
          set({ user: firebaseUser, isUserReady: true });
          return { user: firebaseUser };
        } catch (err) {
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isSigningIn: false });
        }
      },

      signOut: async () => {
        try {
          await firebaseSignOut(auth);
          await axiosInstance.post(
            "/users/logout",
            {},
            { withCredentials: true }
          );
          set({
            user: null,
            isUserReady: false,
            isAuthLoading: false,
            isSigningIn: false,
            isCookieReady: false,
          });
        } catch (err) {
          console.error(err);
          set({ error: err.message });
        }
      },
      initAuthListener: () => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) {
            set({
              user: null,
              isAuthLoading: false,
              isUserReady: false,
              isCookieReady: false,
            });
            return;
          }
          set({
            user: currentUser,
            isAuthLoading: false,
            isUserReady: true,
            isCookieReady: true,
          });
          await get().sendTokenToBackend(currentUser);
        });
        return unsubscribe;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user
          ? {
              uid: state.user.uid,
              displayName: state.user.displayName,
              email: state.user.email,
              photoURL: state.user.photoURL,
            }
          : null,
      }),
    }
  )
);
