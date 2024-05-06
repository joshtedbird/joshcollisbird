import { Canvas } from "@react-three/fiber"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"

export function Space() {
    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none select-none">
            <Canvas>
                <mesh rotation={[0.1, 0.9, 0.3]}>
                    <boxGeometry args={[1, 2, 1]} />
                    <meshNormalMaterial />
                </mesh>
            </Canvas>
        </div>
    )
}
