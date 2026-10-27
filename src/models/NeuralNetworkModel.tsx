import { useState, useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface LayerMeta {
  name: string;
  count: number;
  color: string;
  accentColor: string;
  x: number;
  ySpacing: number;
  description: string;
  formula: string;
  badge: string;
}

const LAYERS_CONFIG: LayerMeta[] = [
  {
    name: 'Input Layer',
    count: 4,
    color: '#06b6d4',      // cyan
    accentColor: '#22d3ee',
    x: -4.5,
    ySpacing: 1.3,
    description: 'Receives and normalizes raw multi-dimensional feature inputs.',
    formula: 'x ∈ ℝ⁴',
    badge: '4 Features'
  },
  {
    name: 'Hidden Layer 1',
    count: 6,
    color: '#6366f1',      // indigo
    accentColor: '#818cf8',
    x: -1.5,
    ySpacing: 1.05,
    description: 'Learns low-level representations and spatial feature representations.',
    formula: 'a⁽¹⁾ = σ(W⁽¹⁾x + b⁽¹⁾)',
    badge: '6 Neurons (ReLU)'
  },
  {
    name: 'Hidden Layer 2',
    count: 6,
    color: '#a855f7',      // purple
    accentColor: '#c084fc',
    x: 1.5,
    ySpacing: 1.05,
    description: 'Constructs abstract high-order non-linear feature maps.',
    formula: 'a⁽²⁾ = σ(W⁽²⁾a⁽¹⁾ + b⁽²⁾)',
    badge: '6 Neurons (GELU)'
  },
  {
    name: 'Output Layer',
    count: 3,
    color: '#ec4899',      // pink
    accentColor: '#f43f5e',
    x: 4.5,
    ySpacing: 1.35,
    description: 'Outputs class probability distribution via normalized Softmax.',
    formula: 'ŷ = softmax(W⁽³⁾a⁽²⁾ + b⁽³⁾)',
    badge: '3 Classes'
  }
];

interface NodeData {
  id: string;
  position: THREE.Vector3;
  layerIndex: number;
  nodeIndex: number;
  color: string;
  accentColor: string;
}

interface ConnectionData {
  id: string;
  p1: THREE.Vector3;
  p2: THREE.Vector3;
  midpoint: THREE.Vector3;
  length: number;
  quaternion: THREE.Quaternion;
  colorHex: string;
  fromLayer: number;
  toLayer: number;
}

interface SignalData {
  p1: THREE.Vector3;
  p2: THREE.Vector3;
  speed: number;
  offset: number;
  color: THREE.Color;
  size: number;
}

function LayerHtmlLabel({ 
  layer, 
  position 
}: { 
  key?: any;
  layer: LayerMeta; 
  position: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} center distanceFactor={14} className="pointer-events-none select-none">
      <div 
        className="relative pointer-events-auto cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Main Badge */}
        <div 
          className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border flex flex-col items-center transition-all duration-300 shadow-xl"
          style={{
            borderColor: hovered ? layer.accentColor : `${layer.color}70`,
            boxShadow: hovered ? `0 0 25px ${layer.color}60` : `0 0 10px ${layer.color}30`
          }}
        >
          <div className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full animate-pulse" 
              style={{ backgroundColor: layer.accentColor }} 
            />
            <span className="text-[11px] font-bold font-mono tracking-wider uppercase text-white whitespace-nowrap">
              {layer.name}
            </span>
          </div>
          <span 
            className="text-[9px] font-mono tracking-tight whitespace-nowrap mt-0.5"
            style={{ color: layer.accentColor }}
          >
            {layer.badge}
          </span>
        </div>

        {/* Hover Tooltip Card */}
        {hovered && (
          <div 
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-zinc-950/95 border rounded-xl text-left shadow-2xl backdrop-blur-xl z-50 transition-all pointer-events-none"
            style={{ borderColor: `${layer.color}80` }}
          >
            <div className="text-[8px] uppercase tracking-widest font-mono font-bold mb-1" style={{ color: layer.accentColor }}>
              Neural Architecture
            </div>
            <div className="text-white text-xs font-bold mb-1">{layer.name}</div>
            <p className="text-zinc-400 text-[10px] leading-relaxed mb-2 font-sans">
              {layer.description}
            </p>
            <div className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-zinc-300 text-center">
              {layer.formula}
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}

function NeuronNode({ 
  node 
}: { 
  key?: any;
  node: NodeData;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Activation ripple wave moving across layers
    const phase = time * 3.2 - node.layerIndex * 1.4 + node.nodeIndex * 0.4;
    const pulse = Math.sin(phase);

    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.2 + pulse * 0.9;
      }
    }

    if (haloRef.current) {
      const scale = 1.0 + pulse * 0.22;
      haloRef.current.scale.set(scale, scale, scale);
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.2 + pulse * 0.15;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.6 + node.nodeIndex;
      ringRef.current.rotation.y = time * 0.9 + node.layerIndex;
    }
  });

  return (
    <group position={node.position}>
      {/* Central Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial 
          color={node.color} 
          emissive={node.color}
          emissiveIntensity={1.5}
          roughness={0.15}
          metalness={0.25}
        />
      </mesh>

      {/* Outer Halo Sphere */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial 
          color={node.accentColor} 
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbiting Synaptic Quantum Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.46, 0.016, 8, 32]} />
        <meshBasicMaterial 
          color={node.accentColor} 
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SignalParticles({ 
  signals 
}: { 
  signals: SignalData[] 
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    signals.forEach((sig, i) => {
      meshRef.current!.setColorAt(i, sig.color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [signals]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < signals.length; i++) {
      const sig = signals[i];
      // Progress along synaptic connection: 0 -> 1 (left to right)
      const progress = (time * sig.speed + sig.offset) % 1.0;
      dummy.position.lerpVectors(sig.p1, sig.p2, progress);

      // Pulse size: peak intensity in the middle of transit
      const sizePulse = Math.sin(progress * Math.PI);
      const scale = sig.size * (0.6 + sizePulse * 0.9);
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[undefined, undefined, signals.length]}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial 
        blending={THREE.AdditiveBlending} 
        transparent 
        opacity={0.9} 
        depthWrite={false} 
      />
    </instancedMesh>
  );
}

export function NeuralNetworkModel({ showLabels = true }: { showLabels?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Compute all neurons by layer
  const { nodes, connections, signals } = useMemo(() => {
    const allNodes: NodeData[] = [];
    const layersNodes: THREE.Vector3[][] = [];

    LAYERS_CONFIG.forEach((layer, layerIdx) => {
      const currentLayerPoints: THREE.Vector3[] = [];
      const totalHeight = (layer.count - 1) * layer.ySpacing;
      const startY = totalHeight / 2;

      for (let n = 0; n < layer.count; n++) {
        const y = startY - n * layer.ySpacing;
        // Subtle forward curvature on outer layers for 3D depth
        const z = -Math.abs(layer.x) * 0.08;
        const pos = new THREE.Vector3(layer.x, y, z);
        currentLayerPoints.push(pos);

        allNodes.push({
          id: `node-${layerIdx}-${n}`,
          position: pos,
          layerIndex: layerIdx,
          nodeIndex: n,
          color: layer.color,
          accentColor: layer.accentColor
        });
      }
      layersNodes.push(currentLayerPoints);
    });

    // Compute all synaptic connections between adjacent layers
    const allConnections: ConnectionData[] = [];
    for (let l = 0; l < layersNodes.length - 1; l++) {
      const fromNodes = layersNodes[l];
      const toNodes = layersNodes[l + 1];
      const fromColor = new THREE.Color(LAYERS_CONFIG[l].color);
      const toColor = new THREE.Color(LAYERS_CONFIG[l + 1].color);
      const blendedColor = fromColor.clone().lerp(toColor, 0.5);

      for (let i = 0; i < fromNodes.length; i++) {
        for (let j = 0; j < toNodes.length; j++) {
          const p1 = fromNodes[i];
          const p2 = toNodes[j];
          const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
          const dir = new THREE.Vector3().subVectors(p2, p1);
          const length = dir.length();
          dir.normalize();
          const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

          allConnections.push({
            id: `conn-${l}-${i}-${j}`,
            p1,
            p2,
            midpoint,
            length,
            quaternion,
            colorHex: `#${blendedColor.getHexString()}`,
            fromLayer: l,
            toLayer: l + 1
          });
        }
      }
    }

    // Compute animated signal particles traveling left-to-right
    const allSignals: SignalData[] = [];
    allConnections.forEach((conn, idx) => {
      // 1 primary forward signal per connection
      const fromColor = new THREE.Color(LAYERS_CONFIG[conn.fromLayer].accentColor);
      const toColor = new THREE.Color(LAYERS_CONFIG[conn.toLayer].accentColor);
      const signalColor = fromColor.clone().lerp(toColor, 0.4);

      allSignals.push({
        p1: conn.p1,
        p2: conn.p2,
        speed: 0.6 + ((idx * 17) % 11) * 0.05,
        offset: ((idx * 23) % 100) / 100,
        color: signalColor,
        size: 0.08
      });

      // Additional secondary fast signals on selective paths
      if (idx % 2 === 0) {
        allSignals.push({
          p1: conn.p1,
          p2: conn.p2,
          speed: 0.9 + ((idx * 7) % 9) * 0.06,
          offset: (((idx * 41) + 50) % 100) / 100,
          color: toColor,
          size: 0.065
        });
      }
    });

    return {
      nodes: allNodes,
      connections: allConnections,
      signals: allSignals
    };
  }, []);

  // Smooth slow rotation on Y axis
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.09;
      // Gentle natural breathing inclination
      groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.035;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={groupRef} scale={1.05}>
        {/* Ambient Neural Sparkles */}
        <Sparkles 
          count={100} 
          scale={[14, 9, 5]} 
          size={1.6} 
          speed={0.35} 
          opacity={0.3} 
          color="#818cf8" 
        />

        {/* Synaptic Connection Cylinders */}
        <group>
          {connections.map((conn) => (
            <mesh 
              key={conn.id} 
              position={conn.midpoint} 
              quaternion={conn.quaternion}
            >
              <cylinderGeometry args={[0.016, 0.016, conn.length, 8]} />
              <meshStandardMaterial 
                color={conn.colorHex}
                emissive={conn.colorHex}
                emissiveIntensity={0.5}
                transparent 
                opacity={0.32}
                depthWrite={false}
              />
            </mesh>
          ))}
        </group>

        {/* Fast-flowing Signal Particles */}
        <SignalParticles signals={signals} />

        {/* Pulsing Neurons */}
        <group>
          {nodes.map((node) => (
            <NeuronNode key={node.id} node={node} />
          ))}
        </group>

        {/* Bottom Layer Labels */}
        {showLabels && (
          <group position={[0, -3.9, 0]}>
            {LAYERS_CONFIG.map((layer) => (
              <LayerHtmlLabel 
                key={layer.name} 
                layer={layer} 
                position={[layer.x, 0, 0]} 
              />
            ))}
          </group>
        )}
      </group>
    </Float>
  );
}
