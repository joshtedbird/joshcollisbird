import { Intro } from "./components/Intro"
import { Space } from "./components/Space"
import { Planet } from "./components/Planet"
import { Outro } from "./components/Outro"
import { useStore } from "./lib/store"
import { useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

function App() {
    const { setIsMobile, setRevs } = useStore()
    const { scrollYProgress } = useScroll()

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth <= 768)
    }

    function handleScroll() {
        if (
            window.scrollY + window.innerHeight >=
            document.body.scrollHeight - 10
        ) {
            loop(1)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange)
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const loop = (n: number) => {
        window.scroll({
            top: 0,
            behavior: "instant",
        })

        setRevs(n)
    }

    return (
        <div className="w-full flex flex-col font-body bg-black">
            <motion.span className="z-[100] fixed top-0 left-0 text-pink-500">
                {scrollYProgress}
            </motion.span>
            <Intro />
            <Planet />
            <Outro />

            <Space />
            {/* <Background /> */}
        </div>
    )
}

export default App
