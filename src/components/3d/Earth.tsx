import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

function EarthMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Use a procedural earth-like material since we don't have texture files
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x1a3a6b),
    emissive: new THREE.Color(0x0a1a3b),
    emissiveIntensity: 0.3,
    shininess: 30,
    specular: new THREE.Color(0x4488ff),
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Gentle auto rotation
    meshRef.current.rotation.y += 0.003;
    
    // Mouse reactive tilt
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.3,
      0.05
    );
    
    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 0.5) * 0.01;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} material={earthMaterial}>
        <sphereGeometry args={[1.8, 64, 64]} />
      </mesh>
      
      {/* Ocean layer */}
      <mesh>
        <sphereGeometry args={[1.81, 64, 64]} />
        <meshPhongMaterial
          color={new THREE.Color(0x0d3060)}
          transparent
          opacity={0.4}
          shininess={100}
          specular={new THREE.Color(0x3399ff)}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshPhongMaterial
          color={new THREE.Color(0x1a6aff)}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshPhongMaterial
          color={new THREE.Color(0x0044ff)}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Land masses - procedural dots */}
      <LandMasses />
      <CityLights />
    </group>
  );
}

function LandMasses() {
  const points = useRef<THREE.Points>(null);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.003;
    }
  });

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const colors: number[] = [];

  // Generate land-like distribution
  const landPatterns = [
    // North America
    { lat: 45, lng: -100, spread: 25, density: 80 },
    { lat: 20, lng: -100, spread: 20, density: 60 },
    // Europe
    { lat: 50, lng: 15, spread: 20, density: 80 },
    // Asia
    { lat: 50, lng: 80, spread: 40, density: 120 },
    { lat: 30, lng: 100, spread: 25, density: 80 },
    // Africa
    { lat: 0, lng: 20, spread: 30, density: 100 },
    // South America
    { lat: -15, lng: -60, spread: 20, density: 70 },
    // Australia
    { lat: -25, lng: 135, spread: 18, density: 60 },
  ];

  landPatterns.forEach(({ lat, lng, spread, density }) => {
    for (let i = 0; i < density; i++) {
      const latRad = THREE.MathUtils.degToRad(lat + (Math.random() - 0.5) * spread);
      const lngRad = THREE.MathUtils.degToRad(lng + (Math.random() - 0.5) * spread);
      const r = 1.82;

      positions.push(
        r * Math.cos(latRad) * Math.cos(lngRad),
        r * Math.sin(latRad),
        r * Math.cos(latRad) * Math.sin(lngRad)
      );

      // Green-ish land colors
      colors.push(0.1 + Math.random() * 0.2, 0.3 + Math.random() * 0.3, 0.2 + Math.random() * 0.2);
    }
  });

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.7} />
    </points>
  );
}

function CityLights() {
  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.003;
      // Subtle twinkle
      const material = points.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];

  const cities = [
    [40.7, -74], [51.5, -0.1], [48.8, 2.3], [35.7, 139.7],
    [22.3, 114.2], [1.3, 103.8], [28.6, 77.2], [19.1, 72.9],
    [-33.9, 151.2], [37.8, -122.4], [34.0, -118.2], [41.9, 12.5],
    [52.5, 13.4], [55.7, 37.6], [39.9, 116.4], [31.2, 121.5],
    [-23.5, -46.6], [6.5, 3.4], [30.0, 31.2], [24.7, 46.7],
  ];

  cities.forEach(([lat, lng]) => {
    for (let i = 0; i < 8; i++) {
      const latRad = THREE.MathUtils.degToRad(lat + (Math.random() - 0.5) * 3);
      const lngRad = THREE.MathUtils.degToRad(lng + (Math.random() - 0.5) * 3);
      const r = 1.83;

      positions.push(
        r * Math.cos(latRad) * Math.cos(lngRad),
        r * Math.sin(latRad),
        r * Math.cos(latRad) * Math.sin(lngRad)
      );
    }
  });

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={0.03} color={0xffdd88} transparent opacity={0.7} />
    </points>
  );
}

function Rings() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[2.6, 0.008, 16, 100]} />
      <meshBasicMaterial color={0x3366ff} transparent opacity={0.2} />
    </mesh>
  );
}

export function Earth3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 3, 5]} intensity={1.5} color={0x4488ff} />
        <pointLight position={[-5, -2, -3]} intensity={0.3} color={0x001133} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color={0x2255aa} />
        
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />
        
        <EarthMesh />
        <Rings />
      </Canvas>
    </div>
  );
}
