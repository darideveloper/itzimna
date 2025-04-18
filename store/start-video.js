import { create } from 'zustand'

export const useStartVideoStore = create((set) => ({
  videoPlayed: false,
  setVideoPlayed: (videoPlayed) => set({ videoPlayed }),
}))