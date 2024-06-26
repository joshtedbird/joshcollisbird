import { useLoader, useThree } from "@react-three/fiber"
import { useScroll, useTransform } from "framer-motion"
import { motion } from "framer-motion-3d"
import { useEffect, useRef, useState } from "react"
import { Object3D, TextureLoader } from "three"
import starTexture from "../assets/Star.png"

export function StarField({ count = 300 }) {
    const { scrollYProgress } = useScroll()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    const viewport = useThree((state) => state.viewport)

    const scrollVal = useTransform(
        () =>
            scrollYProgress.get() * (viewport.height * 4) - viewport.height * 2
    )

    return (
        //@ts-ignore
        <motion.group position={[0, scrollVal, 0]}>
            {loaded && <Stars count={count} />}
        </motion.group>
    )
}

function Stars({ count = 300, temp = new Object3D() }) {
    const instancedMeshRef = useRef(null)
    const dim = { x: 10, y: 10, z: 40 }
    const viewport = useThree((state) => state.viewport)
    const texture = useLoader(TextureLoader, starTexture)

    useEffect(() => {
        // Set positions
        if (instancedMeshRef.current) {
            for (let i = 0; i < count; i++) {
                temp.position.set(
                    (0.5 - Math.random()) * viewport.width * dim.x,
                    (0.5 - Math.random()) * viewport.height * dim.y,
                    -Math.random() * dim.z
                )
                temp.updateMatrix()
                //@ts-ignore
                instancedMeshRef.current.setMatrixAt(i, temp.matrix)
            }
            //@ts-ignore
            instancedMeshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [])

    return (
        //@ts-ignore

        <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
            <planeGeometry args={[0.2, 0.2]} />

            <meshBasicMaterial attach="material" map={texture} transparent />
        </instancedMesh>
    )
}
