import { useFrame, useThree } from "@react-three/fiber"
import { useScroll, useTransform } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import { Vector2 } from "three"

export function StarField({
    fragment,
    vertex,
}: {
    fragment: string
    vertex: string
}) {
    const meshRef = useRef(null)
    const { viewport } = useThree()

    const { scrollYProgress } = useScroll()
    const [scroll, setScroll] = useState(0)

    useTransform(() => {
        let newScroll = scrollYProgress.get()
        if (newScroll !== scroll) {
            setScroll(newScroll)
            console.log("update")
        }
    })

    useFrame(() => {
        // start from 20 to skip first 20 seconds ( optional )
        if (meshRef.current) {
            //@ts-ignore
            // meshRef.current.material.uniforms.iTime.value = time + 20
            //@ts-ignore

            meshRef.current.material.uniforms.u_scroll.value = scroll
        }
    })

    const uniforms = useMemo(
        () => ({
            iTime: {
                type: "f",
                value: 1.0,
            },
            iResolution: {
                type: "v2",
                value: new Vector2(viewport.width, viewport.height),
            },
            u_scroll: {
                type: "f",
                value: 0.0,
            },
        }),
        []
    )

    return (
        <mesh ref={meshRef} renderOrder={1}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                fragmentShader={fragment}
                vertexShader={vertex}
                uniforms={uniforms}
                depthTest={false}
                // transparent
                toneMapped={true}
            />
        </mesh>
    )
}
