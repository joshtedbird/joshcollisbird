import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useStore } from "../lib/store"
import { Vector3 } from "three"
import { SiLinkedin, SiGithub } from "react-icons/si"
import { MdEmail } from "react-icons/md"

export function Outro() {
    const cont = useRef(null)
    const frames = 16
    let [frame, setFrame] = useState(0)

    const { isMobile, setJoshCentre } = useStore()

    let { scrollYProgress } = useScroll({
        target: cont,
    })

    useTransform(() => {
        let newFrame = Math.round(scrollYProgress.get() * frames)
        if (newFrame !== frame) {
            setFrame(newFrame)
        }
    })

    useEffect(() => {
        if (frame >= 13) {
            setJoshCentre(new Vector3(0, -1.5, 0))
        } else {
            setJoshCentre(new Vector3(0, -0.3, 0))
        }
    }, [frame])

    return (
        <motion.div
            ref={cont}
            className="w-full h-[260rem] flex flex-col items-center bg-transparent text-white  z-20 pointer-events-none select-none"
        >
            {frame > 0 && (
                <div
                    className="fixed top-0 left-[50%] w-screen h-[100svh] max-w-[60rem] flex justify-center"
                    style={{ transform: "translateX(-50%)" }}
                >
                    <Heading
                        pos={isMobile ? "4rem" : "8rem"}
                        align="left"
                        state={
                            frame >= 1
                                ? frame < 5
                                    ? "middle"
                                    : "end"
                                : "start"
                        }
                    >
                        With many years of customer-facing experience...
                    </Heading>
                    <Heading
                        pos={
                            isMobile
                                ? "calc(100% - 12rem)"
                                : "calc(100% - 16rem)"
                        }
                        align="right"
                        state={
                            frame >= 2
                                ? frame < 6
                                    ? "middle"
                                    : "end"
                                : "start"
                        }
                    >
                        ...alongside expertise in design, art, animation and
                        development...
                    </Heading>
                    <Heading
                        pos={isMobile ? "4rem" : "8rem"}
                        align="center"
                        state={
                            frame >= 6
                                ? frame < 10
                                    ? "middle"
                                    : "end"
                                : "start"
                        }
                    >
                        I've developed a passion for working with talented
                        people...
                    </Heading>
                    <Heading
                        pos={
                            isMobile
                                ? "calc(100% - 8rem)"
                                : "calc(100% - 12rem)"
                        }
                        align="center"
                        state={
                            frame >= 7
                                ? frame < 13
                                    ? "middle"
                                    : "end"
                                : "start"
                        }
                    >
                        building amazing things.
                    </Heading>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: frame > 13 ? 1 : 0 }}
                        className="absolute text-white w-full max-w-[20rem] flex items-center flex-col pointer-events-auto"
                        style={{
                            top: isMobile
                                ? "calc(100% - 10rem)"
                                : "calc(100% - 16rem)",
                        }}
                    >
                        <h1 className="drop-shadow-lg font-bold text-[2.3rem] pointer-events-none select-none leading-[3rem]">
                            Get in touch!
                        </h1>
                        <div className="w-full flex justify-around h-[2.5rem] mt-8">
                            <a
                                className="aspect-square h-full"
                                href="https://www.linkedin.com/in/joshua-c-8106a015a/"
                                target="_blank"
                            >
                                <SiLinkedin size={"100%"} />
                            </a>
                            <a
                                className="aspect-square h-full"
                                href="https://github.com/joshtedbird"
                                target="_blank"
                            >
                                <SiGithub size={"100%"} />
                            </a>
                            <a
                                className="aspect-square h-full"
                                href="mailto:josh.ted.bird@gmail.com"
                                target="_blank"
                            >
                                <MdEmail size={"100%"} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    )
}

const headingVariants = {
    start: { transform: "translateY(-30px)", opacity: 0 },
    middle: { transform: "translateY(0px)", opacity: 1 },
    end: { transform: "translateY(30px)", opacity: 0 },
}

interface HeadingProps {
    children: ReactNode
    pos: string
    align: "left" | "center" | "right"
    state: "start" | "middle" | "end"
}

function Heading({ children, pos, align, state }: HeadingProps) {
    const alignStyle =
        align === "left"
            ? "left-0 text-left"
            : align === "right"
            ? "right-0 text-right"
            : "text-center "
    return (
        <motion.h1
            initial={"start"}
            variants={headingVariants}
            animate={state}
            className={`drop-shadow-lg absolute font-bold text-[2rem] pointer-events-none select-none leading-[3rem] w-screen p-4 max-w-[40rem] ${alignStyle}`}
            style={{
                top: pos,
            }}
        >
            {children}
        </motion.h1>
    )
}
