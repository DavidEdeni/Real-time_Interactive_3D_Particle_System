import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleSystemProps {
  preset: string;
  tension: number;
  color: string;
}

const PARTICLE_COUNT = 15000;

export default function ParticleSystem({ preset, tension, color }: ParticleSystemProps) {
  const points = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()
  const targetColor = useMemo(() => new THREE.Color(color), [color])

  const shapes = useMemo(() => {
    const getPointOnSphere = (r = 10) => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    };

    const generators: Record<string, (i: number) => { x: number, y: number, z: number }> = {
      sphere: () => getPointOnSphere(10),
      heart: () => {
        const t = Math.random() * Math.PI * 2;
        const spread = Math.pow(Math.random(), 1 / 3);
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const z = (Math.random() - 0.5) * 10 * spread;
        const scale = 0.4;
        return { x: x * scale * spread, y: y * scale * spread, z: z * scale };
      },
      flower: () => {
        const k = 4;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        const r = Math.abs(Math.cos(k * theta)) * 10 + 2;
        const spread = Math.sqrt(Math.random());
        return {
          x: r * Math.cos(theta) * Math.cos(phi) * spread,
          y: r * Math.sin(theta) * Math.cos(phi) * spread,
          z: (Math.random() - 0.5) * 5,
        };
      },
      saturn: () => {
        if (Math.random() < 0.3) {
          const s = getPointOnSphere(6);
          return s;
        } else {
          const angle = Math.random() * Math.PI * 2;
          const r = 10 + Math.random() * 6;
          const height = (Math.random() - 0.5) * 0.5;
          const x = r * Math.cos(angle);
          const y = height;
          const z = r * Math.sin(angle);
          const tilt = 0.4;
          const yt = y * Math.cos(tilt) - z * Math.sin(tilt);
          const zt = y * Math.sin(tilt) + z * Math.cos(tilt);
          return { x: x, y: yt, z: zt };
        }
      },
      buddha: () => {
        const s = Math.random();
        if (s < 0.4) {
          const p = getPointOnSphere(4);
          return { x: p.x * 2.5, y: (p.y * 0.8) - 4, z: p.z * 1.8 };
        } else if (s < 0.7) {
          const p = getPointOnSphere(3);
          return { x: p.x * 1.2, y: p.y * 1.5, z: p.z * 1.0 };
        } else if (s < 0.85) {
          const p = getPointOnSphere(1.8);
          return { x: p.x, y: p.y + 4.5, z: p.z };
        } else {
          const r = 8 + Math.random() * 2;
          const t = Math.random() * Math.PI;
          return { x: r * Math.cos(t), y: r * Math.sin(t) - 2, z: (Math.random() - 0.5) * 2 };
        }
      },
      fireworks: () => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const dist = Math.pow(Math.random(), 0.5) * 15;
        return {
          x: Math.sin(phi) * Math.cos(theta) * dist,
          y: Math.sin(phi) * Math.sin(theta) * dist,
          z: Math.cos(phi) * dist,
        };
      }
    };

    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const generator = generators[preset] || generators.sphere;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = generator(i);
      targetPositions[i * 3] = p.x;
      targetPositions[i * 3 + 1] = p.y;
      targetPositions[i * 3 + 2] = p.z;
    }
    return targetPositions;
  }, [preset]);

  const initialPositions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        pos[i] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    const lerpFactor = 0.08;
    const finalScale = 1.0 - tension * 0.8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const tx = shapes[i3] * finalScale;
      const ty = shapes[i3 + 1] * finalScale;
      const tz = shapes[i3 + 2] * finalScale;

      pos[i3] += (tx - pos[i3]) * lerpFactor;
      pos[i3 + 1] += (ty - pos[i3 + 1]) * lerpFactor;
      pos[i3 + 2] += (tz - pos[i3 + 2]) * lerpFactor;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += 0.001;
    (points.current.material as THREE.PointsMaterial).color.lerp(targetColor, 0.05);
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
