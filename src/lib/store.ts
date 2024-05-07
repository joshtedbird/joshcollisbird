import { create } from "zustand"

interface IStore {
    revs: number
    setRevs: (n: number) => void
    isMobile: boolean
    setIsMobile: (b: boolean) => void
}

export const useStore = create<IStore>((set) => ({
    revs: 0,
    setRevs: (n: number) => set((state) => ({ revs: state.revs + n })),
    isMobile: false,
    setIsMobile: (b: boolean) => set({ isMobile: b }),
}))
