import { Cylinder } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll } from "framer-motion"
import { useMemo, useRef, useState } from "react"

export function StarField() {
    const volumeRef = useRef(null)
    const { viewport } = useThree()

    const { scrollYProgress } = useScroll()
    const [scroll, setScroll] = useState(0)

    useFrame(() => {
        setScroll(scrollYProgress.get())
    })

    return (
        // <Cylinder
        //     args={[
        //         viewport.height * 2,
        //         viewport.height * 2,
        //         viewport.width * 4,
        //     ]}
        //     position={[0, 0, -18]}
        //     rotation={[scroll, 0, Math.PI / 2]}
        //     ref={volumeRef}
        // >
        //     <meshBasicMaterial wireframe color={"#ffffff"} />
        //     {/* <meshNormalMaterial /> */}
        // </Cylinder>
        <group rotation={[-scroll, 0, 0]} position={[0, 0, -10]}>
            <BufferPoints />
        </group>
    )
}

import { BufferAttribute } from "three"

function BufferPoints({ count = 20000 }) {
    const points = useMemo(() => {
        const p = new Array(count)
            .fill(0)
            .map((v) => (0.5 - Math.random()) * 20)
        return new BufferAttribute(new Float32Array(p), 3)
    }, [count])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach={"attributes-position"} {...points} />
            </bufferGeometry>
            <pointsMaterial
                size={0.4}
                threshold={0.1}
                color={0xffffff}
                sizeAttenuation={true}
            />
        </points>
    )
}
