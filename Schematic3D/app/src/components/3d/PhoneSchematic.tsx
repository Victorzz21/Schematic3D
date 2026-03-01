import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { PhoneModel, PhoneComponent } from '@/types/phone';

interface ComponentNodeProps {
  component: PhoneComponent;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

function ComponentNode({ component, isSelected, isHovered, onClick, onHover }: ComponentNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = isSelected ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1 : 1;
      meshRef.current.scale.setScalar(pulse * scale);
    }
  });

  const getComponentGeometry = (type: string) => {
    switch (type) {
      case 'cpu':
        return <boxGeometry args={[1.2, 1.2, 0.3]} />;
      case 'gpu':
        return <boxGeometry args={[1, 1, 0.25]} />;
      case 'ram':
        return <boxGeometry args={[0.8, 0.6, 0.2]} />;
      case 'storage':
        return <boxGeometry args={[0.8, 0.6, 0.2]} />;
      case 'battery':
        return <boxGeometry args={[2.5, 1.5, 0.3]} />;
      case 'camera':
        return <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />;
      case 'display':
        return <boxGeometry args={[6, 10, 0.1]} />;
      case 'connector':
        return <boxGeometry args={[0.8, 0.4, 0.2]} />;
      case 'sensor':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case 'antenna':
        return <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />;
      default:
        return <boxGeometry args={[0.8, 0.8, 0.3]} />;
    }
  };

  return (
    <group position={component.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => { onHover(true); setScale(1.1); }}
        onPointerOut={() => { onHover(false); setScale(1); }}
      >
        {getComponentGeometry(component.type)}
        <meshStandardMaterial
          color={component.color}
          emissive={isSelected ? component.color : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Label */}
      {(isSelected || isHovered) && (
        <Html distanceFactor={10}>
          <div className="bg-black/90 text-green-400 px-2 py-1 rounded text-xs font-mono whitespace-nowrap border border-green-500/50">
            <div className="font-bold">{component.name}</div>
            <div className="text-green-300/70 text-[10px]">{component.type.toUpperCase()}</div>
          </div>
        </Html>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

interface ConnectionLineProps {
  from: [number, number, number];
  to: [number, number, number];
  isActive: boolean;
  type: string;
}

function ConnectionLine({ from, to, isActive, type }: ConnectionLineProps) {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  }, [from, to]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      if (isActive) {
        const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
        material.opacity = pulse;
      } else {
        material.opacity = 0.2;
      }
    }
  });

  const getLineColor = (type: string) => {
    switch (type) {
      case 'power': return '#ff4444';
      case 'data': return '#4444ff';
      case 'signal': return '#44ff44';
      default: return '#888888';
    }
  };

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: getLineColor(type),
      transparent: true,
      opacity: isActive ? 0.8 : 0.2
    }))} ref={lineRef} />
  );
}

interface PhoneFrameProps {
  dimensions: [number, number, number];
}

function PhoneFrame({ dimensions }: PhoneFrameProps) {
  const [width, height, depth] = dimensions;
  
  return (
    <group>
      {/* Phone outline */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color="#1a1a1a" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* PCB Board */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width - 0.5, height - 1, 0.05]} />
        <meshStandardMaterial color="#0d4f0d" transparent opacity={0.3} />
      </mesh>

      {/* Grid lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Line
          key={`h-${i}`}
          points={[[-width/2, -height/2 + (i * height/10), 0], [width/2, -height/2 + (i * height/10), 0]]}
          color="#00ff00"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[[-width/2 + (i * width/6), -height/2, 0], [-width/2 + (i * width/6), height/2, 0]]}
          color="#00ff00"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
}

interface SceneProps {
  phone: PhoneModel;
  selectedComponent: string | null;
  onComponentSelect: (id: string | null) => void;
  showConnections: boolean;
}

function Scene({ phone, selectedComponent, onComponentSelect, showConnections }: SceneProps) {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  const getComponentById = (id: string) => phone.components.find(c => c.id === id);

  const connections = useMemo(() => {
    const lines: { from: PhoneComponent; to: PhoneComponent; type: string }[] = [];
    phone.components.forEach(comp => {
      comp.connections.forEach(targetId => {
        const target = getComponentById(targetId);
        if (target && comp.id < targetId) {
          let type = 'signal';
          if (comp.type === 'battery' || target.type === 'battery') type = 'power';
          else if (comp.type === 'cpu' || target.type === 'cpu') type = 'data';
          lines.push({ from: comp, to: target, type });
        }
      });
    });
    return lines;
  }, [phone]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ff00" />
      
      <PhoneFrame dimensions={phone.dimensions} />

      {/* Connection lines */}
      {showConnections && connections.map((conn, idx) => {
        const isActive = selectedComponent === conn.from.id || selectedComponent === conn.to.id;
        return (
          <ConnectionLine
            key={idx}
            from={conn.from.position}
            to={conn.to.position}
            isActive={isActive}
            type={conn.type}
          />
        );
      })}

      {/* Components */}
      {phone.components.map(component => (
        <ComponentNode
          key={component.id}
          component={component}
          isSelected={selectedComponent === component.id}
          isHovered={hoveredComponent === component.id}
          onClick={() => onComponentSelect(selectedComponent === component.id ? null : component.id)}
          onHover={(hovered) => setHoveredComponent(hovered ? component.id : null)}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
}

interface PhoneSchematicProps {
  phone: PhoneModel;
  selectedComponent: string | null;
  onComponentSelect: (id: string | null) => void;
  showConnections: boolean;
}

export function PhoneSchematic({ phone, selectedComponent, onComponentSelect, showConnections }: PhoneSchematicProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        style={{ background: '#0a0a0a' }}
      >
        <Scene
          phone={phone}
          selectedComponent={selectedComponent}
          onComponentSelect={onComponentSelect}
          showConnections={showConnections}
        />
      </Canvas>
    </div>
  );
}
