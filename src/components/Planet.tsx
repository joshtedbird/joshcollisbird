import { useStore } from "../lib/store"
import PlanetBorder from "./PlanetBorder"
import "../lib/components.css"
import { motion } from "framer-motion"
import { ReactNode, useState } from "react"
import ImgBrisbane from "../assets/thumb-brisbane.png"
import ImgIPA from "../assets/thumb-ip-aus.png"
import ImgFifteenTiles from "../assets/thumb-fifteen-tiles.png"
import ImgSmashGeo from "../assets/thumb-smash-geo.png"
import ContentSmashGeo_1 from "../assets/content-smash-geo-1.png"
import ContentSmashGeo_2 from "../assets/content-smash-geo-2.png"
import { IoClose } from "react-icons/io5"
import * as Dialog from "@radix-ui/react-dialog"

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
            <div className="max-w-[70rem] w-full flex-auto mt-8 flex flex-col gap-8 overflow-hidden p-4 lg:gap-y-48 lg:mt-48">
                <Project
                    title={"Mobility and the Brisbane Olympics"}
                    tags={[
                        "UI/UX",
                        "Design",
                        "Geospatial",
                        "3D",
                        "Storytelling",
                        "Data",
                        "Svelte",
                    ]}
                    img={ImgBrisbane}
                    link="https://brisbane2032mobility.smashdelta.com/"
                >
                    <p>
                        Made during my time at Smash Delta, this interactive,
                        data-driven story explores public transport in Brisbane
                        through the lens of the 2032 Olympics.
                    </p>
                    <p>
                        My role was the overall visual design of the story using
                        prototyping in Figma, the 3D design using Blender, as
                        well as design and development of the interactive UI,
                        all of which was constructed in Svelte.
                    </p>
                </Project>
                <Project
                    title={"Generative AI and the IP System"}
                    tags={["UI/UX", "3D", "React", "Storytelling"]}
                    img={ImgIPA}
                    link="https://www.ipaustralia.gov.au/temp/Generative-AI-and-the-IP-System.html"
                >
                    <p>
                        Made as part of the design engineering team at Smash
                        Delta, this interactive story explores the potential
                        damaging effects that generative AI can have on the IP
                        system.
                    </p>
                    <p>
                        My role was primarily in the visual design, both
                        coordinating the design of the story in Figma, as well
                        as the 3D art and animation in Blender.
                    </p>
                </Project>
                <Project
                    title={"Catchment Fingerprinting UI"}
                    tags={["UI/UX", "Data", "React", "Web App", "Geospatial"]}
                    img={ImgSmashGeo}
                    link=""
                    btnText="Explore"
                >
                    <p>
                        A hybrid project between Smash Delta's design
                        engineering and data teams; prototyped to exhibit
                        powerful data science capabilities with an interactive
                        frontend.
                    </p>
                    <p>
                        My role was in the UI/UX design and development. Initial
                        prototyping was done in Figma, with a full build of the
                        tool in React, including connecting the frontend to a
                        live data-driven backend.
                    </p>
                    <p className="italic text-[0.8rem]">
                        Note this project is not publicly available
                    </p>
                    <Dialog.Root>
                        <div className="flex gap-4 justify-center mt-6">
                            <Dialog.Trigger className="bg-highlight text-white font-black flex items-center justify-center flex-auto h-12 rounded-[12px] uppercase text-[1.6rem] lg:max-w-[20rem] ">
                                Explore
                            </Dialog.Trigger>
                        </div>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed top-0 left-0 right-0 bottom-0 z-40  bg-black/85 backdrop-blur-[3px] flex flex-col items-center pointer-events-auto">
                                <Modal />
                                <Dialog.Close className="fixed top-8 right-8 w-8 h-8 rounded-full bg-black/25 text-white">
                                    {<IoClose size={"100%"} />}
                                </Dialog.Close>
                            </Dialog.Overlay>
                        </Dialog.Portal>
                    </Dialog.Root>
                </Project>
                <Project
                    title={"Fifteen Tiles"}
                    tags={["UI/UX", "Svelte", "Game Dev"]}
                    img={ImgFifteenTiles}
                    link="https://fifteen-tiles.vercel.app/"
                >
                    <p>
                        A personal passion project of mine. It's a "daily-style"
                        web game based on Scrabble where you're given a random
                        selection of 15 tiles, and you have to use them all to
                        make Scrabble-legal words.
                    </p>
                    <p>
                        This was entirely designed and engineered by me using
                        Figma and Svelte.
                    </p>
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
    img: string
    link: string
    btnText?: string
}

function Project({
    title,
    tags,
    children,
    img,
    link,
    btnText = "Visit",
}: ProjectProps) {
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
                <div className="project-img w-[calc(100vw-2rem)] lg:w-full ">
                    <div
                        className=" rounded-[12px] w-full aspect-[8/5] border-[5px] border-white"
                        onClick={() => handleClick()}
                        style={{
                            backgroundImage: `url("${img}")`,
                            backgroundSize: "cover",
                        }}
                    />
                    <div className="flex gap-2 flex-wrap pr-2 mt-2">
                        {tags.map((t, i) => (
                            <Tag key={i} name={t} />
                        ))}
                    </div>
                </div>
                <div className="project-prose text-white w-[70vw] lg:w-[30rem] pl-4 ">
                    {!isMobile && (
                        <h2 className="font-black text-[1.6rem]">{title}</h2>
                    )}
                    {children}
                    {btnText === "Visit" && (
                        <div className="flex gap-4 justify-center mt-6">
                            <a
                                href={link}
                                target="_blank"
                                className="bg-highlight text-white font-black flex items-center justify-center flex-auto h-12 rounded-[12px] uppercase text-[1.6rem] lg:max-w-[20rem] "
                            >
                                {btnText}
                            </a>
                        </div>
                    )}
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

function Modal() {
    return (
        <Dialog.Content className="p-4 flex flex-col items-center w-full h-full text-white overflow-y-auto">
            <div className="max-w-[45rem] gap-y-8 flex flex-col">
                <div className="w-full aspect-video ">
                    <img
                        className="w-full h-full rounded-lg"
                        src={ContentSmashGeo_1}
                    />
                </div>

                <p className="w-full ">
                    The tool was designed to generate a "Catchment" around a
                    user-selected point on a map. This catchment gave travel
                    times from surrounding residential addresses via car, public
                    transport, cycling and walking, and was visualised at the
                    individual level on a fully interactive map.{" "}
                </p>

                <div className="w-full  aspect-video ">
                    <img
                        className="w-full h-full rounded-lg"
                        src={ContentSmashGeo_2}
                    />
                </div>
                <p className="w-full ">
                    It also generated and visualised complex data around
                    demographics, ammenities and land use of the area using
                    custom data visualisations. The data being visualised both
                    on the map and in graph form was also dynamic to the UI,
                    allowing for toggling of transport modes as well as control
                    over the maximum travel time being visualised.
                </p>
            </div>
        </Dialog.Content>
    )
}
