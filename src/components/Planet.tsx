import { useStore } from "../lib/store"
import PlanetBorder from "../assets/PlanetBorder"
import "../lib/components.css"
import { motion } from "framer-motion"
import { ReactNode, useState } from "react"

export function Planet() {
    return (
        <div className="relative w-full bg-planet min-h-[100vh] flex flex-col items-center z-10">
            <div className="absolute top-[-1.9rem] h-[2rem] lg:top-[-5.9rem] left-0 w-full lg:h-[6rem] z-20">
                <PlanetBorder />
            </div>
            <div className="absolute top-[-80rem] left-0 h-[80rem] w-full  z-10 bg-gradient-to-b from-transparent to-planet/95 pointer-events-none" />

            <h2 className="text-highlight text-[2.2rem] uppercase italic variation font-black mt-8 lg:mt-0">
                Previous Work
            </h2>
            <div className="max-w-[70rem] w-full flex-auto mt-8 flex flex-col gap-8 overflow-hidden p-4">
                <Project
                    title={"Project 1"}
                    tags={[
                        "UI/UX",
                        "Geospatial",
                        "3D",
                        "React",
                        "Storytelling",
                    ]}
                >
                    <span>Lorem ipsum dolor sit amet</span>
                </Project>
                <Project
                    title={"Project 2"}
                    tags={[
                        "UI/UX",
                        "Geospatial",
                        "3D",
                        "React",
                        "Storytelling",
                    ]}
                >
                    <span>Lorem ipsum dolor sit amet</span>
                </Project>
            </div>
            <div className="absolute bottom-[-1.9rem] h-[2rem] lg:bottom-[-5.9rem] left-0 w-full lg:h-[6rem] scale-y-[-100%] z-20">
                <PlanetBorder />
            </div>
            <div className="absolute bottom-[-50rem] left-0 h-[50rem] w-full z-10 bg-gradient-to-t from-transparent to-planet/95 pointer-events-none" />
        </div>
    )
}

interface ProjectProps {
    title: string
    tags: string[]
    children: ReactNode
}

function Project({ title, tags, children }: ProjectProps) {
    const { isMobile } = useStore()
    const [open, setOpen] = useState(false)

    const variants = {
        closed: { transform: "translateX(0vw)" },
        open: { transform: "translateX(-70vw)" },
    }

    const handleClick = () => {
        if (isMobile) {
            setOpen(!open)
        }
    }

    return (
        <div>
            {isMobile && (
                <h2 className="text-white font-black text-[1.6rem] mb-2">
                    {title}
                </h2>
            )}
            <motion.div
                className="project-container w-[calc(170vw-2rem)] lg:w-full"
                animate={open ? "open" : "closed"}
                variants={variants}
                transition={{ type: "spring", stiffness: 140, damping: 17 }}
                key={title}
            >
                <div className="project-img w-[calc(100vw-2rem)] lg:w-full">
                    <div
                        className="bg-white rounded-[12px] w-full aspect-[8/5]"
                        onClick={() => handleClick()}
                    />
                </div>
                <div className="project-prose text-white w-[70vw] lg:w-[30rem]  pl-4">
                    {!isMobile && (
                        <h2 className="font-black text-[1.6rem]">{title}</h2>
                    )}
                    {children}
                    <div className="flex gap-4 justify-center mt-6">
                        <button className="bg-highlight text-white font-black flex items-center justify-center flex-auto h-12 rounded-[12px] uppercase text-[1.6rem] lg:max-w-[20rem] ">
                            Visit
                        </button>
                    </div>
                </div>
                <div className="project-tags flex gap-2 flex-wrap pr-4">
                    {tags.map((t, i) => (
                        <Tag key={i} name={t} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

function Tag({ name }: { name: string }) {
    return (
        <div className="rounded-[12px] px-3 flex items-center bg-white h-8">
            <span className="font-black text-[1rem] uppercase text-planet mt-[1px]">
                {name}
            </span>
        </div>
    )
}
