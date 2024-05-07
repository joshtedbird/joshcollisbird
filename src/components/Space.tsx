import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, RigidBody, BallCollider } from "@react-three/rapier"
import { Suspense, useEffect, useRef, useState } from "react"
import { Vector3 } from "three"
import axios from "axios"
import { StarField } from "./StarField"

export function Space() {
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none">
            <Canvas>
                <Suspense>
                    <Physics gravity={[0, 0, 0]}>
                        <Character />
                        <Pointer />
                    </Physics>
                </Suspense>
                <Stars />
            </Canvas>
        </div>
    )
}

function Stars() {
    // State variables to store the vertex and fragment shaders as strings
    const [fragment, setFragment] = useState("")
    const [vertex, setVertex] = useState("")

    // Fetch the shaders once the component mounts
    useEffect(() => {
        // fetch the vertex and fragment shaders from public folder
        axios.get("/vertexShader.glsl").then((res) => setVertex(res.data))
        axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data))
    }, [])

    // If the shaders are not loaded yet, return null (nothing will be rendered)
    if (vertex == "" || fragment == "") return null
    return <StarField vertex={vertex} fragment={fragment} />
}

function Character() {
    const characterRef = useRef(null)
    const vec = new Vector3()

    useFrame((_, delta) => {
        delta = Math.min(0.1, delta)
        //prettier-ignore
        //@ts-ignore
        characterRef.current?.applyImpulse(vec.copy(characterRef.current.translation()).negate().multiplyScalar(600))
    })
    return (
        <RigidBody
            ref={characterRef}
            linearDamping={3}
            angularDamping={1.5}
            density={10000}
        >
            <mesh rotation={[0.1, 0.9, 0.3]}>
                <boxGeometry args={[1, 2, 1]} />
                <meshNormalMaterial />
            </mesh>
        </RigidBody>
    )
}

function Pointer({ vec = new Vector3() }) {
    const ref = useRef(null!)
    useFrame(({ mouse, viewport }) => {
        //@ts-ignore
        ref.current?.setNextKinematicTranslation(
            vec.set(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2,
                0
            )
        )
    })
    return (
        <RigidBody
            position={[0, 0, 0]}
            type="kinematicPosition"
            colliders={false}
            ref={ref}
        >
            <BallCollider args={[0.5]} mass={0.1} />
        </RigidBody>
    )
}
