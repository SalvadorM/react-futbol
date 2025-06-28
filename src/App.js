
import React, { useState } from 'react';
import FormationSelector from './components/FormationSelector';

import SoccerField3D from './SoccerField3D';


export default function App() {
  const availableFormations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2', '4-2-3-1', '4-1-4-1', '4-3-1-2', '3-4-3', '4-4-1-1', '4-2-2-2', '3-6-1', '2-3-5', '4-3-2-1'];
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
        <SoccerField3D formation={selectedFormation} />
      </div>

      
      <footer className="mt-8 text-gray-600 text-sm">
        Drag to rotate, scroll to zoom.
      </footer>
    </div>
  );
}
