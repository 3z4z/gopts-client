import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";
import { auth } from "../firebase.config";

import { persist } from "zustand/middleware";

const provider = new GoogleAuthProvider();
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isSigningIn: false,
      isGoogleSigningIn: false,
      isAuthLoading: true,
      isUserReady: false,
      error: "",
      signInWithGoogle: async () => {
        try {
          set({ isGoogleSigningIn: true });
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          set({ user });
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
          const user = result.user;
          await updateProfile(user, {
            displayName: name,
            photoURL: image,
          });
          set({ user });
          return { user };
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
          const user = result.user;
          set({ user, isSigningIn: false });
          return { user };
        } catch (err) {
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isSigningIn: false });
        }
      },
      signOut: async () => {
        try {
          await signOut(auth);
          set({ isAuthLoading: false, isSigningIn: false, user: null });
        } catch (err) {
          console.log(err);
          set({ error: err.message });
        }
      },
      initAuthListener: () => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) {
            set({
              user: null,
              isAuthLoading: false,
              isSigningIn: false,
              isUserReady: false,
            });
            return;
          } else {
            set({
              user: currentUser,
              isAuthLoading: false,
              isSigningIn: false,
              isUserReady: true,
            });
          }
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
