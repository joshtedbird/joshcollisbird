import {
    AnimatePresence,
    MotionValue,
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion"
import { useRef, useState } from "react"

export function Intro() {
    const scrollRef = useRef(null)!
    const { scrollYProgress } = useScroll({
        target: scrollRef,
    })
    const isInView = useInView(scrollRef, { margin: "-100% 0px 0px 0px" })

    const variants = {
        in: { opacity: 0, transform: "translate(-50%, calc(-50% + 30px))" },
        visible: { opacity: 1, transform: "translate(-50%, -50%)" },
        out: { opacity: 0, transform: "translate(-50%, calc(-50% - 30px))" },
    }

    return (
        <motion.div
            id="scrollbox"
            ref={scrollRef}
            className="w-full relative h-[180rem] flex items-center justify-center bg-transparent text-white pointer-events-none"
        >
            <AnimatePresence>
                {isInView && (
                    <motion.div
                        initial={"in"}
                        animate={"visible"}
                        exit={"out"}
                        variants={variants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex flex-col items-end z-20 fixed top-[50vh] left-[50vw] text-[3.4rem] w-[85%] lg:w-auto"
                    >
                        <h1 className=" drop-shadow-lg uppercase font-black  pointer-events-none select-none leading-[3.5rem] ">
                            {"Josh"}
                        </h1>
                        <h1 className="drop-shadow-lg uppercase font-black pointer-events-none select-none leading-[3.5rem]">
                            {"collis-bird"}
                        </h1>
                        <ScrollingList progress={scrollYProgress} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

interface ListProps {
    progress: MotionValue<number>
}

function ScrollingList({ progress }: ListProps) {
    const list = [
        "React",
        "Svelte",
        "TypeScript",
        "Geospatial",
        "3D",
        "Design",
        ".com",
    ]
    const step = 1 / list.length

    const [active, setActive] = useState(
        Math.round(progress.get() / step) * step
    )

    useTransform(() => {
        let newProgress = Math.round(progress.get() / step) * step
        if (newProgress !== active) {
            setActive(newProgress)
        }
    })

    return (
        <div
            className="w-full h-[5rem] overflow-hidden relative pointer-events-none"
            style={{
                WebkitMaskImage:
                    "-webkit-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%,  rgba(0,0,0,0) )",
            }}
        >
            <motion.div
                initial={{ transform: `translateY(-${active * 100}%)` }}
                animate={{ transform: `translateY(-${active * 100}%)` }}
                transition={{ type: "spring", stiffness: 150, damping: 16 }}
                className="flex flex-col items-end"
            >
                {list.map((i, index) => (
                    <h1
                        key={index}
                        className="drop-shadow-lg uppercase font-black pointer-events-none select-none text-highlight "
                    >
                        {i}
                    </h1>
                ))}
            </motion.div>
        </div>
    )
}
