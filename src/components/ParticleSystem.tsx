import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
  preset: 'nebula' | 'vortex' | 'aurora'
}

export default function ParticleSystem({ preset }: ParticleSystemProps) {
  const count = 5000
  const points = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 10
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10

        let color = new THREE.Color()
        if (preset === 'nebula') color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5)
        else if (preset === 'vortex') color.setHSL(0.8 + Math.random() * 0.1, 0.9, 0.5)
        else color.setHSL(0.1 + Math.random() * 0.1, 0.9, 0.5)

        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b

        sizes[i] = Math.random() * 2
        randoms[i] = Math.random()
    }
    return { positions, colors, sizes, randoms }
  }, [preset])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const pos = points.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Basic movement
      if (preset === 'nebula') {
          pos[i3 + 1] += Math.sin(time + particles.randoms[i] * 10) * 0.002
      } else if (preset === 'vortex') {
          const angle = time * 0.2 + particles.randoms[i] * Math.PI * 2
          const radius = Math.sqrt(pos[i3] ** 2 + pos[i3 + 2] ** 2)
          pos[i3] = Math.cos(angle) * radius
          pos[i3 + 2] = Math.sin(angle) * radius
      }

      // Mouse interaction (crude but effective)
      const mouseX = (mouse.x * viewport.width) / 2
      const mouseY = (mouse.y * viewport.height) / 2
      
      const dx = pos[i3] - mouseX
      const dy = pos[i3 + 1] - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 1.5) {
        pos[i3] += dx * 0.02
        pos[i3 + 1] += dy * 0.02
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
