import { BsHandIndexThumb } from "react-icons/bs"
import { useStore } from "../lib/store"
import { AnimatePresence, motion } from "framer-motion"

export function Entry() {
    const { siteEntered, loadProgress } = useStore()

    return (
        <AnimatePresence>
            {!siteEntered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-32 left-1/2 translate-x-[-50%] text-white z-40 text-[1.5rem] pointer-events-none select-none"
                >
                    {loadProgress < 1 ? (
                        <span>loading...</span>
                    ) : (
                        <span className="flex gap-x-3 items-center">
                            <BsHandIndexThumb /> me to enter
                        </span>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
