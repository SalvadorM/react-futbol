
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import FormationSelector from './components/FormationSelector';
import {SoccerField} from './gltf_exports/SoccerField'

export default function App() {
  const availableFormations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2', '4-2-3-1'];
  const [selectedFormation, setSelectedFormation] = useState(availableFormations[0]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 font-inter">
      {/* Tailwind Font Import (just for reference, typically in index.html or global CSS) */}

      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 mt-4 text-center">
        <span className="text-blue-600">Futbol</span> Táctico
      </h1>

      {/* Header/Formation Selection */}
      <FormationSelector
        formations={availableFormations}
        selected={selectedFormation}
        onSelect={setSelectedFormation}
      />


      <div className="canvas_wrapper">
      <Canvas camera={{ position: [0, 50, 80], fov: 30 }}>
        <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
                {/* Soccer Field */}
                <SoccerField />
                <OrbitControls 
                  target={[0, 0, 5]} // Point camera towards the center of the half field
                  enableZoom={true}
                  enablePan={true}
                  enableDamping={true} // Enable damping for smooth camera movement
                  dampingFactor={0.05} // Set the damping factor
                  maxPolarAngle={Math.PI / 2 - 0.1} // Prevent camera from going below ground
                />
        </Suspense>
      </Canvas>
      </div>

      
      <footer className="mt-8 text-gray-600 text-sm">
        Drag to rotate, scroll to zoom.
      </footer>
    </div>
  );
}
