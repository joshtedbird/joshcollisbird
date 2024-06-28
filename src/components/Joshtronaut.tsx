/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three"
import { useRef, RefObject, useLayoutEffect, useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import {
    CylinderCollider,
    RapierRigidBody,
    RigidBody,
    useRevoluteJoint,
} from "@react-three/rapier"
import { ThreeEvent, useFrame } from "@react-three/fiber"
import { useStore } from "../lib/store"

type GLTFResult = GLTF & {
    nodes: {
        Torso_and_Helmet_1: THREE.Mesh
        Torso_and_Helmet_2: THREE.Mesh
        Torso_and_Helmet_3: THREE.Mesh
        Torso_and_Helmet_4: THREE.Mesh
        Cube024: THREE.Mesh
        Cube024_1: THREE.Mesh
        Cube024_2: THREE.Mesh
        Plane002: THREE.Mesh
        Plane002_1: THREE.Mesh
        Cylinder007: THREE.Mesh
        Cylinder007_1: THREE.Mesh
        Head_Josh_1: THREE.Mesh
        Head_Josh_2: THREE.Mesh
        Ears: THREE.Mesh
        Eyebrows001: THREE.Mesh
        Eyes001: THREE.Mesh
        Mouth001: THREE.Mesh
        Nose001: THREE.Mesh
        Straps: THREE.Mesh
        BézierCurve006: THREE.Mesh
        BézierCurve006_1: THREE.Mesh
        Leg_L001_1: THREE.Mesh
        Leg_L001_2: THREE.Mesh
        Arm_L_1: THREE.Mesh
        Arm_L_2: THREE.Mesh
        Arm_L_3: THREE.Mesh
        Arm_R001: THREE.Mesh
        Arm_R001_1: THREE.Mesh
        Arm_R001_2: THREE.Mesh
        Leg_R_1: THREE.Mesh
        Leg_R_2: THREE.Mesh
    }
    materials: {
        Glass: THREE.MeshStandardMaterial
        Suit: THREE.MeshStandardMaterial
        Screen: THREE.MeshStandardMaterial
        Metal: THREE.MeshStandardMaterial
        Mesh: THREE.MeshStandardMaterial
        Lens_glass: THREE.MeshStandardMaterial
        Skin: THREE.MeshStandardMaterial
        ["Hair.001"]: THREE.MeshStandardMaterial
        Beard: THREE.MeshStandardMaterial
        Nose: THREE.MeshStandardMaterial
        Rubber: THREE.MeshStandardMaterial
        Suit_ribbed: THREE.MeshStandardMaterial
    }
}

export function Joshtronaut(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/joshtronaut_v3.glb") as GLTFResult
    const { joshCentre } = useStore()
    const [loaded, setLoaded] = useState(false)

    useLayoutEffect(() => {
        Object.keys(materials).map((m) => {
            //@ts-ignore
            materials[m].transparent = true
        })
    }, [])

    useEffect(() => {
        if (nodes) {
            setLoaded(true)
        }
    }, [nodes])

    const torsoRef = useRef<RapierRigidBody>(null)!
    const leftArmRef = useRef<RapierRigidBody>(null)!
    const rightArmRef = useRef<RapierRigidBody>(null)!
    const leftLegRef = useRef<RapierRigidBody>(null)!
    const rightLegRef = useRef<RapierRigidBody>(null)!

    const vec = new THREE.Vector3()

    useFrame((_, delta) => {
        if (loaded) {
            delta = Math.min(0.1, delta)
            //prettier-ignore
            //@ts-ignore
            torsoRef.current?.applyImpulse(vec.copy(torsoRef.current.translation()).add(joshCentre).negate().multiplyScalar(400));
            torsoRef.current?.applyTorqueImpulse(
                vec
                    .copy(torsoRef.current.rotation())
                    .negate()
                    .multiplyScalar(10),
                true
            )
        }
    })

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        const transWindow = 20

        torsoRef.current?.applyImpulse(
            vec
                .add({
                    x: Math.random() * transWindow - transWindow / 2,
                    y: Math.random() * transWindow - transWindow / 2,
                    z: Math.random() * transWindow - transWindow / 2,
                })
                .multiplyScalar(2000),
            true
        )
        torsoRef.current?.applyTorqueImpulse(
            vec
                .add({
                    x: Math.random() * transWindow - transWindow / 2,
                    y: Math.random() * transWindow - transWindow / 2,
                    z: Math.random() * transWindow - transWindow / 2,
                })
                .multiplyScalar(0.3),
            true
        )
    }

    return (
        <group
            renderOrder={3}
            onClick={(e: ThreeEvent<MouseEvent>) => handleClick(e)}
            scale={1.4}
            position={[2.5, 4, 0]}
            rotation={[0, 0.1, Math.PI]}
        >
            <group {...props} dispose={null}>
                <RigidBody
                    ref={torsoRef}
                    linearDamping={2.5}
                    angularDamping={0.4}
                    density={10000}
                    colliders={false}
                >
                    <CylinderCollider args={[0.4, 0.3]} position={[0, 0, 0]} />
                    <group>
                        <mesh
                            geometry={nodes.Torso_and_Helmet_1.geometry}
                            material={materials.Glass}
                        />
                        <mesh
                            geometry={nodes.Torso_and_Helmet_2.geometry}
                            material={materials.Suit}
                        />
                        <mesh
                            geometry={nodes.Torso_and_Helmet_3.geometry}
                            material={materials.Metal}
                        />
                        <mesh
                            geometry={nodes.Torso_and_Helmet_4.geometry}
                            material={materials.Rubber}
                        />
                        <group
                            position={[-0.011, -0.184, 0.289]}
                            rotation={[0.047, 0, 0]}
                        >
                            <mesh
                                geometry={nodes.Cube024.geometry}
                                material={materials.Suit}
                            />
                            <mesh
                                geometry={nodes.Cube024_1.geometry}
                                material={materials.Screen}
                            />
                            <mesh
                                geometry={nodes.Cube024_2.geometry}
                                material={materials.Metal}
                            />
                            <group
                                position={[0.099, 0.037, 0.089]}
                                rotation={[1.551, 0, 0]}
                            >
                                <mesh
                                    geometry={nodes.Plane002.geometry}
                                    material={materials.Metal}
                                />
                                <mesh
                                    geometry={nodes.Plane002_1.geometry}
                                    material={materials.Mesh}
                                />
                            </group>
                            <group
                                position={[-0.1, -0.022, 0.095]}
                                rotation={[1.551, 0, 0]}
                            >
                                <mesh
                                    geometry={nodes.Cylinder007.geometry}
                                    material={materials.Lens_glass}
                                />
                                <mesh
                                    geometry={nodes.Cylinder007_1.geometry}
                                    material={materials.Metal}
                                />
                            </group>
                        </group>
                        <group
                            position={[0, 0.574, 0.16]}
                            rotation={[0.18, 0, 0]}
                        >
                            <mesh
                                geometry={nodes.Head_Josh_1.geometry}
                                material={materials.Skin}
                            />
                            <mesh
                                geometry={nodes.Head_Josh_2.geometry}
                                material={materials["Hair.001"]}
                            />
                            <mesh
                                geometry={nodes.Ears.geometry}
                                material={materials.Skin}
                                position={[0, 0.006, 0.015]}
                                rotation={[-0.018, 0, 0]}
                            />
                            <mesh
                                geometry={nodes.Eyebrows001.geometry}
                                material={materials.Beard}
                                position={[0.042, 0.012, 0.196]}
                                rotation={[0.022, 0.144, -0.149]}
                            />
                            <mesh
                                geometry={nodes.Eyes001.geometry}
                                material={materials.Rubber}
                                position={[0.06, -0.021, 0.174]}
                                rotation={[0, 0.508, 0]}
                            />
                            <mesh
                                geometry={nodes.Mouth001.geometry}
                                material={materials.Rubber}
                                position={[0.001, -0.17, 0.211]}
                                rotation={[0, 0, 0.042]}
                            />
                            <mesh
                                geometry={nodes.Nose001.geometry}
                                material={materials.Nose}
                                position={[0, -0.002, 0]}
                            />
                        </group>
                        <mesh
                            geometry={nodes.Straps.geometry}
                            material={materials.Rubber}
                            position={[0.195, -0.061, 0.26]}
                        />
                        <group position={[-0.097, 0.021, -0.257]}>
                            <mesh
                                geometry={nodes.BézierCurve006.geometry}
                                material={materials.Rubber}
                            />
                            <mesh
                                geometry={nodes.BézierCurve006_1.geometry}
                                material={materials.Metal}
                            />
                        </group>
                    </group>
                    {/* <Sphere args={[0.3]} position={[0.058, -0.38, 0.015]}>
                        <meshNormalMaterial />
                    </Sphere> */}
                </RigidBody>

                <RigidBody
                    ref={leftArmRef}
                    linearDamping={3}
                    angularDamping={4}
                    density={100}
                    colliders="hull"
                >
                    <group position={[0.284, 0.052, -0.029]}>
                        <mesh
                            geometry={nodes.Arm_L_1.geometry}
                            material={materials.Suit_ribbed}
                        />
                        <mesh
                            geometry={nodes.Arm_L_2.geometry}
                            material={materials.Metal}
                        />
                        <mesh
                            geometry={nodes.Arm_L_3.geometry}
                            material={materials.Rubber}
                        />
                    </group>
                </RigidBody>

                <RigidBody
                    ref={rightArmRef}
                    linearDamping={3}
                    angularDamping={4}
                    density={100}
                    colliders="hull"
                >
                    <group position={[-0.286, 0.052, -0.03]}>
                        <mesh
                            geometry={nodes.Arm_R001.geometry}
                            material={materials.Suit_ribbed}
                        />
                        <mesh
                            geometry={nodes.Arm_R001_1.geometry}
                            material={materials.Metal}
                        />
                        <mesh
                            geometry={nodes.Arm_R001_2.geometry}
                            material={materials.Rubber}
                        />
                    </group>
                </RigidBody>

                <RigidBody
                    ref={leftLegRef}
                    linearDamping={3}
                    angularDamping={4}
                    density={100}
                    colliders={"hull"}
                >
                    <group position={[0.208, -0.41, 0.015]}>
                        <mesh
                            geometry={nodes.Leg_L001_1.geometry}
                            material={materials.Suit_ribbed}
                        />
                        <mesh
                            geometry={nodes.Leg_L001_2.geometry}
                            material={materials.Rubber}
                        />
                    </group>
                </RigidBody>
                <RigidBody
                    ref={rightLegRef}
                    linearDamping={3}
                    angularDamping={4}
                    density={100}
                    colliders={"hull"}
                >
                    <group position={[-0.23, -0.393, 0.016]}>
                        <mesh
                            geometry={nodes.Leg_R_1.geometry}
                            material={materials.Suit_ribbed}
                        />
                        <mesh
                            geometry={nodes.Leg_R_2.geometry}
                            material={materials.Rubber}
                        />
                    </group>
                </RigidBody>
                {/* DETAILS */}
            </group>
            <group>
                <Joint
                    a={torsoRef}
                    b={leftArmRef}
                    args={[
                        [0.204, 0.052, -0.029],
                        [0.16, 0, 0],
                        [0, 0, 1],
                    ]}
                />
                <Joint
                    a={torsoRef}
                    b={rightArmRef}
                    args={[
                        [-0.204, 0.052, -0.029],
                        [-0.16, 0, 0],
                        [0, 0, 1],
                    ]}
                />
                <Joint
                    a={torsoRef}
                    b={leftLegRef}
                    args={[
                        [0.058, -0.393, 0.015],
                        [0.04, -0.3, -0.02],
                        [1, 0, 0],
                    ]}
                />
                <Joint
                    a={torsoRef}
                    b={rightLegRef}
                    args={[
                        [-0.058, -0.393, 0.015],
                        [-0.04, -0.36, -0.02],
                        [1, 0, 0],
                    ]}
                />
            </group>
        </group>
    )
}

interface JointProps {
    a: RefObject<RapierRigidBody>
    b: RefObject<RapierRigidBody>
    args: [
        [number, number, number],
        [number, number, number],
        [number, number, number]
    ]
}

const Joint = ({ a, b, args }: JointProps) => {
    useRevoluteJoint(a, b, args)

    return null
}

useGLTF.preload("/joshtronaut_v3.glb")
