import { Vector3 } from "three"
import { create } from "zustand"

interface IStore {
    isMobile: boolean
    setIsMobile: (b: boolean) => void

    joshCentre: Vector3
    setJoshCentre: (v: Vector3) => void
}

export const useStore = create<IStore>((set) => ({
    isMobile: false,
    setIsMobile: (b: boolean) => set({ isMobile: b }),

    joshCentre: new Vector3(0, -0.3, 0),
    setJoshCentre: (v: Vector3) => set({ joshCentre: v }),
}))
