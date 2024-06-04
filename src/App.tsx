import { Intro } from "./components/Intro"
import { Space } from "./components/Space"
import { Planet } from "./components/Planet"
import { Outro } from "./components/Outro"
import { useStore } from "./lib/store"
import { useEffect } from "react"

function App() {
    const { setIsMobile } = useStore()

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth <= 768)
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange)
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange)
        }
    }, [])

    return (
        <div className="w-full flex flex-col font-body bg-black">
            <Intro />
            {/* <Planet /> */}
            {/* <Outro /> */}

            <Space />
        </div>
    )
}

export default App
