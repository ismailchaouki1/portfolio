import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

const ACCENT = new THREE.Color('#e8892b');
const ACCENT_HEX = '#e8892b';

function FloatingIcosahedron() {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    if (hovered) {
      ref.current.rotation.x = state.mouse.x * 2;
      ref.current.rotation.y = state.mouse.y * 2;
    }
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        setHover(false);
      }}
    >
      <icosahedronGeometry args={[1.2, 0]} />
      <meshBasicMaterial
        color={ACCENT}
        wireframe={true}
        transparent={true}
        opacity={0.9}
        emissive={ACCENT}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function OrbitingCubes({ count = 12 }) {
  const group = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    const rotationSpeed = 0.1;
    group.current.children.forEach((child, i) => {
      const t = time * rotationSpeed + (i * 0.3);
      const radius = 2.5;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      child.position.set(x, Math.sin(t * 0.5) * 0.5, z);
    });
    if (hovered) {
      group.current.rotation.y = time * 0.2;
    }
  });

  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => (
      <mesh key={i}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.3}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
    ));
  }, [count]);

  return (
    <group ref={group}>
      {cubes}
    </group>
  );
}

function Ring() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.z = time * 0.15;
    ref.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[4, 0.02, 8, 100]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color={ACCENT_HEX} />
    </>
  );
}

function Scene({ isVisible }) {
  const { gl } = useThree();
  const [dpr] = useState(Math.min(window.devicePixelRatio, 1.5));

  useEffect(() => {
    gl.setPixelRatio(dpr);
  }, [gl, dpr]);

  if (!isVisible) {
    return null;
  }

  return (
    <group>
      <Lighting />
      <FloatingIcosahedron />
      <OrbitingCubes count={12} />
      <Ring />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.2}
        scale={6}
        blur={2}
      />
    </group>
  );
}

export default function HeroScene() {
  const [isVisible, setIsVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas-container">
      <Canvas
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
        frameloop={inView ? 'continuous' : 'demand'}
        onCreated={({ gl }) => {
          gl.setClearColor(0x0a0f1a, 0);
          gl.autoClear = true;
        }}
      >
        <color attach="background" args={['#0a0f1a']} />
        <Scene isVisible={inView} />
      </Canvas>
    </div>
  );
}