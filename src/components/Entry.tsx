import { BsHandIndexThumb } from "react-icons/bs"
import { useStore } from "../lib/store"
import { AnimatePresence, motion } from "framer-motion"

export function Entry() {
    const { siteEntered } = useStore()

    return (
        <AnimatePresence>
            {!siteEntered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-32 left-1/2 translate-x-[-50%] text-white z-40 text-[1.5rem] flex gap-x-3 items-center pointer-events-none select-none"
                >
                    <BsHandIndexThumb /> to enter
                </motion.div>
            )}
        </AnimatePresence>
    )
}
