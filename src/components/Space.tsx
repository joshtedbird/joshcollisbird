import { Canvas, useFrame } from "@react-three/fiber"
import { Physics, RigidBody, BallCollider } from "@react-three/rapier"
import { Suspense, useRef } from "react"
import { Vector3 } from "three"
import { StarField } from "./StarField"

export function Space() {
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none">
            <Canvas orthographic camera={{ zoom: 130, far: 15 }}>
                <Suspense>
                    <Physics debug gravity={[0, 0, 0]}>
                        <Character />
                        <Pointer />
                    </Physics>
                </Suspense>
                <StarField />
            </Canvas>
        </div>
    )
}

function Character() {
    const characterRef = useRef(null)
    const vec = new Vector3()

    useFrame((_, delta) => {
        delta = Math.min(0.1, delta)
        //prettier-ignore
        //@ts-ignore
        characterRef.current?.applyImpulse(vec.copy(characterRef.current.translation()).negate().multiplyScalar(0.2))
    })
    return (
        <RigidBody
            ref={characterRef}
            // mass={60000}
            linearDamping={3}
            angularDamping={3}
            // mass={99999999}
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
