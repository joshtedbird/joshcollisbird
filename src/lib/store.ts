import { Vector3 } from "three"
import { create } from "zustand"

interface IStore {
    isMobile: boolean
    setIsMobile: (b: boolean) => void

    siteEntered: boolean
    setSiteEntered: (b: boolean) => void

    joshCentre: Vector3
    setJoshCentre: (v: Vector3) => void

    loadProgress: number
    setLoadProgress: (n: number) => void
}

export const useStore = create<IStore>((set) => ({
    isMobile: false,
    setIsMobile: (b: boolean) => set({ isMobile: b }),

    siteEntered: false,
    setSiteEntered: (b: boolean) => set({ siteEntered: b }),

    joshCentre: new Vector3(0, -0.4, 0),
    setJoshCentre: (v: Vector3) => set({ joshCentre: v }),

    loadProgress: 0,
    setLoadProgress: (n: number) => set({ loadProgress: n }),
}))
