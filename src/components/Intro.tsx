import {
    MotionValue,
    clamp,
    easeInOut,
    motion,
    spring,
    useAnimate,
    useInView,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function Intro() {
    const scrollRef = useRef(null!)
    const { scrollYProgress } = useScroll({
        target: scrollRef,
    })

    const opacity = useTransform(scrollYProgress, [0, 0.92, 1], [1, 1, 0])

    const variants = {
        hidden: { opacity: 0, transform: "translate(-50%, calc(-50% + 30px))" },
        visible: { opacity: 1, transform: "translate(-50%, -50%)" },
    }

    return (
        <motion.div
            ref={scrollRef}
            className="w-full relative h-[180rem] flex items-center justify-center bg-transparent text-white pointer-events-none"
        >
            <motion.div
                initial={"hidden"}
                animate={"visible"}
                style={{ opacity }}
                variants={variants}
                transition={{ duration: 1 }}
                className="flex flex-col items-end z-20 fixed top-[50vh] left-[50vw] text-[3.4rem] w-[85%] lg:w-auto"
            >
                <h1 className="uppercase font-black  pointer-events-none select-none leading-[3.5rem] ">
                    {"Josh"}
                </h1>
                <h1 className="uppercase font-black pointer-events-none select-none leading-[3.5rem]">
                    {"collis-bird"}
                </h1>
                <ScrollingList progress={scrollYProgress} />
            </motion.div>
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

    const [active, setActive] = useState(0)

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
                animate={{ transform: `translateY(-${active * 100}%)` }}
                transition={{ type: "spring", stiffness: 150, damping: 16 }}
                className="flex flex-col items-end"
            >
                {list.map((i, index) => (
                    <h1
                        key={index}
                        className="uppercase font-black pointer-events-none select-none text-highlight "
                    >
                        {i}
                    </h1>
                ))}
            </motion.div>
        </div>
    )
}
