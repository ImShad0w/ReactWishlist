import { create } from "zustand";
import type { Anime } from "@tutkli/jikan-ts";

interface AnimeStore {
  wishlist: Anime[];
  currentAnime: Anime | null;
  addToWishlist: (anime: Anime) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  setCurrentAnime: (anime: Anime) => void;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  wishlist: [],
  currentAnime: null,

  addToWishlist: (anime) =>
    set((state) => ({
      wishlist: [...state.wishlist, anime],//From previous state, adds a new anime to it
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((a) => a.mal_id !== id),//From previous state remove anime by id for current state
    })),

  isInWishlist: (id) => {
    return get().wishlist.some((a) => a.mal_id === id);
  },

  setCurrentAnime: (anime) => set({ currentAnime: anime }),
}));
