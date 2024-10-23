import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { RefObject, Suspense, createRef } from "react";
import { Mesh, Color } from "three";
// import { StarField } from "./StarField"
import { StarField } from "./StarField_v2";
import { Joshtronaut } from "./Joshtronaut";
import { Environment, Plane } from "@react-three/drei";

export function Space() {
    // const { progress } = useProgress()
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     setLoading(progress !== 100)
    //     console.log(progress)
    // }, [progress])

    const renderStars = true;
    const renderTimeWarp = false;

    return (
        <div className="fixed top-0 left-0 w-full min-w-[200px] min-h-[400px] h-[100vh] z-0 pointer-events-none select-none bg-black">
            <Canvas>
                {/* <fogExp2 attach={"fog"} args={["black", 0.04]} /> */}
                <Environment preset="apartment" environmentIntensity={0.3} />
                <directionalLight position={[5, 2, 1]} intensity={5} />
                <Suspense fallback={null}>
                    <Physics gravity={[0, 0, 0]}>
                        <Joshtronaut />
                    </Physics>

                    {renderStars && <StarField count={250} />}
                </Suspense>
                {renderTimeWarp && <TimeWarp />}

                {/* <Suspense fallback={null}>
                    <EffectComposer>
                        <Bloom
                            intensity={10}
                            kernelSize={3}
                            luminanceThreshold={0.8}
                        />
                    </EffectComposer>
                </Suspense> */}

                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}

// function Stars() {
//     // State variables to store the vertex and fragment shaders as strings
//     const [fragment, setFragment] = useState("")
//     const [vertex, setVertex] = useState("")

//     // Fetch the shaders once the component mounts
//     useEffect(() => {
//         // fetch the vertex and fragment shaders from public folder
//         axios.get("/vertexShader.glsl").then((res) => setVertex(res.data))
//         axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data))
//     }, [])

//     // If the shaders are not loaded yet, return null (nothing will be rendered)
//     if (vertex == "" || fragment == "") return null
//     return StarField
// }

// function Pointer({ vec = new Vector3() }) {
//     const ref = useRef(null!)
//     useFrame(({ mouse, viewport }) => {
//         //@ts-ignore
//         ref.current?.setNextKinematicTranslation(
//             vec.set(
//                 (mouse.x * viewport.width) / 2,
//                 (mouse.y * viewport.height) / 2,
//                 0
//             )
//         )
//     })
//     return (
//         <RigidBody
//             position={[0, 0, 0]}
//             type="kinematicPosition"
//             colliders={false}
//             ref={ref}
//         >
//             <BallCollider args={[0.5]} mass={0.1} />
//         </RigidBody>
//     )
// }

interface Plane {
    ref: RefObject<Mesh>;
    pos: { x: number; y: number; z: number };
    height: number;
    length: number;
    color: Color;
}

function TimeWarp() {
    const animationLength = 100;
    const numPlanes = 30;
    const xWindow: [number, number] = [2, 6];
    const yWindow = 5;
    const lengthWindow: [number, number] = [30, 60];
    const heightWindow: [number, number] = [0.5, 3.5];

    // const refs = useRef(Array.from({length: animationLength}).map(() => ))

    const planes: Plane[] = genPlanes(
        animationLength,
        numPlanes,
        xWindow,
        yWindow,
        lengthWindow,
        heightWindow
    );

    useFrame((_, delta) => {
        delta = Math.min(0.1, delta);
        planes.forEach((p) => {
            if (p.ref.current?.position.z) {
                if (p.ref.current.position.z > p.length / 2 + 5) {
                    p.ref.current.position.setZ(-animationLength);
                } else {
                    p.ref.current.position.setZ(
                        p.ref.current.position.z + delta * 30
                    );
                }
            }
        });
    });
    return (
        <group>
            {planes.map((p, index) => (
                <Plane
                    ref={p.ref}
                    args={[p.length, p.height]}
                    position={[p.pos.x, p.pos.y, p.pos.z]}
                    rotation={[0, p.pos.x < 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
                    renderOrder={2}
                    key={index}
                >
                    <meshBasicMaterial
                        color={p.color}
                        // transparent
                        depthTest={false}
                        toneMapped={false}
                    />
                </Plane>
            ))}
        </group>
    );
}

function genPlanes(
    len: number,
    n: number,
    xWindow: [number, number],
    yWindow: number,
    lWindow: [number, number],
    hWindow: [number, number]
) {
    let planes: Plane[] = [];
    for (let i = 0; i < n; i++) {
        let pos = {
            x:
                (Math.random() * (xWindow[1] - xWindow[0]) + xWindow[0]) *
                alternate(i),
            y: Math.random() * (yWindow * 2) - yWindow,
            z: Math.random() * len * -1 - len,
        };
        let height = Math.random() * (hWindow[1] - hWindow[0]) + hWindow[0];
        let length = Math.random() * (lWindow[1] - lWindow[0]) + lWindow[0];
        let color = new Color(`hsl(${Math.random() * 40 + 330}, 100%, 55%)`);
        let ref = createRef<Mesh>();
        planes.push({ ref, pos, color, height, length });
    }

    return planes;
}

const alternate = (i: number) => {
    let n = i % 2;
    return n === 0 ? -1 : 1;
};
