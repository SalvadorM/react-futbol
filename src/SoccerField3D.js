
import  { Suspense } from 'react';

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import {SoccerPlayerIdle} from './gltf_exports/Idle'
import {SoccerField} from './gltf_exports/SoccerField'
import { formationPositions } from './formations'

const SoccerField3D = ({ formation }) => {
    const currentFormation = formationPositions[formation] || [];

    return(
    <Canvas camera={{ position: [0, 50, 80], fov: 30 }}>
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
                {/* Soccer Field */}

                <group>
                  <SoccerField />
                </group>

                {currentFormation.map((player, index) => (
                    <SoccerPlayerIdle key={index} position={player.pos} number={player.num} />
                ))}
        
                <OrbitControls 
                  target={[0, 0, 15]} // Point camera towards the center of the half field
                  enableZoom={true}
                  enablePan={true}
                  enableDamping={true} // Enable damping for smooth camera movement
                  dampingFactor={0.05} // Set the damping factor
                  maxPolarAngle={Math.PI / 2 - 0.1} // Prevent camera from going below ground
                    minDistance={30} // 🚫 Can't zoom in closer than 20 units
                    maxDistance={80} // 🚫 Can't zoom out farther than 80 units
                />
        </Suspense>
    </Canvas>
    )
}

export default SoccerField3D