import { Intro } from "./components/Intro"
import { Space } from "./components/Space"
import { Planet } from "./components/Planet"
import { Outro } from "./components/Outro"

function App() {
    return (
        <div className="w-full flex flex-col font-body bg-black">
            <Intro />
            <Planet />
            <Outro />

            <Space />
            {/* <Background /> */}
        </div>
    )
}

export default App
