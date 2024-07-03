import { Intro } from "./components/Intro"
import { Space } from "./components/Space"
import { Planet } from "./components/Planet"
import { Outro } from "./components/Outro"
import { useStore } from "./lib/store"
import { useEffect } from "react"
import { Entry } from "./components/Entry"

function App() {
    const { setIsMobile, siteEntered } = useStore()

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
        <div className="w-full flex flex-col font-body">
            {siteEntered && (
                <>
                    <Intro />
                    <Planet />
                    <Outro />
                </>
            )}
            <Entry />

            <Space />
        </div>
    )
}

export default App
