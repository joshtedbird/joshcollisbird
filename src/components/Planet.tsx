import PlanetBorder from "../assets/PlanetBorder"

export function Planet() {
    return (
        <div className="relative w-full p-4 bg-planet min-h-[100vh] flex justify-center z-10">
            <div className="absolute top-[-1.9rem] h-[2rem] lg:top-[-5.9rem] left-0 w-full lg:h-[6rem] z-20">
                <PlanetBorder />
            </div>
            <div className="absolute top-[-80rem] left-0 h-[80rem] w-full  z-10 bg-gradient-to-b from-transparent to-planet/80" />

            <h2 className="text-highlight text-[2.2rem] uppercase italic variation font-black">
                Previous Work
            </h2>
            <div className="absolute bottom-[-1.9rem] h-[2rem] lg:bottom-[-5.9rem] left-0 w-full lg:h-[6rem] scale-y-[-100%] z-20">
                <PlanetBorder />
            </div>
            <div className="absolute bottom-[-50rem] left-0 h-[50rem] w-full z-10 bg-gradient-to-t from-transparent to-planet/80" />
        </div>
    )
}
