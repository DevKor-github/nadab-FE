import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import createSelectors from "./createSelectors";

type State = {
  isTermsAgreed: boolean;
  email: string;
  isEmailVerified: boolean;
  password: string;
  category: string;
  nickname: string;
};

type Action = {
  updateIsTermsAgreed: () => void;
  updateEmail: (email: State["email"]) => void;
  updateIsEmailVerified: () => void;
  updatePassword: (password: State["password"]) => void;
  updateCategory: (category: State["category"]) => void;
  updateNickname: (nickname: State["nickname"]) => void;
  reset: () => void;
};

const useSignupStoreBase = create<State & Action>()(
  persist(
    (set, get, store) => ({
      isTermsAgreed: false,
      email: "",
      isEmailVerified: false,
      password: "",
      category: "",
      nickname: "",
      updateIsTermsAgreed: () => set({ isTermsAgreed: true }),
      updateEmail: (email) => set(() => ({ email: email })),
      updateIsEmailVerified: () => set({ isEmailVerified: true }),
      updatePassword: (password) => set(() => ({ password: password })),
      updateCategory: (category) => set(() => ({ category: category })),
      updateNickname: (nickname) => set(() => ({ nickname: nickname })),
      reset: () => set(store.getInitialState),
    }),
    {
      name: "signup-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isTermsAgreed: state.isTermsAgreed,
        email: state.email,
      }),
    }
  )
);

const useSignupStore = createSelectors(useSignupStoreBase);

export default useSignupStore;
