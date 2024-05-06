import { MotionValue, motion, useScroll } from "framer-motion"
import { useEffect, useRef } from "react"

interface StarsProps {
    offset: MotionValue<number>
}

interface Star {
    x: number
    y: number
    z: number
    brightness: number
}

function Stars({ offset }: StarsProps) {
    const canvasRef = useRef<any>(null)

    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight

    const num_stars = 1000

    let stars: Star[] = []

    for (let i = 0; i < num_stars; i++) {
        let s = {
            x: Math.random() * maxWidth,
            y: Math.random() * maxHeight,
            z: Math.random() * 1000,
            brightness: Math.random() * 0.5 + 0.5,
        }
        stars.push(s)
    }

    useEffect(() => {
        const context: CanvasRenderingContext2D =
            canvasRef.current.getContext("2d")

        const clear = () => {
            context.fillStyle = "#000000"
            context.fillRect(0, 0, maxWidth, maxHeight)
        }

        const makeStar = (
            x: number,
            y: number,
            z: number,
            brightness: number
        ) => {
            context.fillStyle = `rgba(255, 255, 255, ${brightness})`
            context.fillRect(x, y - offset.get() * z * 3, 1, 1)
        }

        const draw = () => {
            for (let i = 0; i < stars.length; i++) {
                let star = stars[i]
                makeStar(star.x, star.y, star.z, star.brightness)
            }
        }

        if (context) {
            let w = window.innerWidth
            let h = window.innerHeight

            const setCanvasExtents = () => {
                canvasRef.current.width = w
                canvasRef.current.height = h
            }

            setCanvasExtents()

            window.onresize = () => {
                setCanvasExtents()
            }
        }

        const updateCanvas = () => {
            clear()

            draw()
            requestAnimationFrame(updateCanvas)
        }

        updateCanvas()
    }, [offset])

    return (
        <motion.canvas
            ref={canvasRef}
            style={
                {
                    // translateY: useTransform(offset, [0, 1], [0, -60]),
                }
            }
            width="inherit"
            height="inherit"
        />
    )
}

export function Background() {
    const { scrollYProgress } = useScroll()

    return (
        <motion.div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none text-green-500">
            <Stars offset={scrollYProgress} />
        </motion.div>
    )
}
