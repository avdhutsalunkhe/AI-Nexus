import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';

const canvasStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: -1
};

export default function StarsCanvas(){
  return (
    <div style={canvasStyle}>
      <Canvas camera={{ position: [0,0,1] }}>
        <Suspense fallback={null}>
          <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false}/>
        </Suspense>
      </Canvas>
    </div>
  );
}