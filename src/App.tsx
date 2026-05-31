import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import ParticleSystem from './components/ParticleSystem'
import Overlay from './components/Overlay'

export default function App() {
  const [preset, setPreset] = useState<string>('heart')
  const [color, setColor] = useState('#00ff88')
  const [shapeSize, setShapeSize] = useState<number>(1.0)
  const [particleSize, setParticleSize] = useState<number>(0.1)

  return (
    <div style={{ width: '100%', height: '100%', background: '#050505' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <ParticleSystem 
            preset={preset} 
            shapeSize={shapeSize} 
            particleSize={particleSize} 
            color={color} 
          />
        </Suspense>
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <Overlay 
        currentPreset={preset} 
        onPresetChange={setPreset}
        currentColor={color}
        onColorChange={setColor}
        shapeSize={shapeSize}
        onShapeSizeChange={setShapeSize}
        particleSize={particleSize}
        onParticleSizeChange={setParticleSize}
      />
    </div>
  )
}
