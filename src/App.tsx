import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import ParticleSystem from './components/ParticleSystem'
import Overlay from './components/Overlay'

export default function App() {
  const [preset, setPreset] = useState<'nebula' | 'vortex' | 'aurora'>('nebula')

  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <ParticleSystem preset={preset} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <Overlay currentPreset={preset} onPresetChange={setPreset} />
      {/* <Stats /> */}
    </div>
  )
}
