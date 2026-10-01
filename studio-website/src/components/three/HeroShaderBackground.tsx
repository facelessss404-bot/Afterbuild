"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Vertex shader — basic fullscreen quad
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader — atmospheric gradient with subtle noise
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uAccent;

  varying vec2 vUv;

  // Simplex-like noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.08;

    // Domain warping — creates organic flow
    vec2 q = vec2(fbm(uv * 3.0 + t * 0.3), fbm(uv * 3.0 + vec2(5.2, 1.3) + t * 0.2));
    vec2 r = vec2(fbm(uv * 4.0 + q * 4.0 + vec2(1.7, 9.2) + t * 0.15), fbm(uv * 4.0 + q * 4.0 + vec2(8.3, 2.8) + t * 0.1));
    float f = fbm(uv * 2.0 + r * 2.0);

    // Color mixing
    vec3 col = mix(uColor1, uColor2, f * 0.8 + 0.1);
    col = mix(col, uAccent, pow(f, 3.0) * 0.3);

    // Vignette
    float vig = 1.0 - length((uv - 0.5) * 1.5);
    vig = smoothstep(0.0, 0.7, vig);
    col *= vig * 0.6 + 0.4;

    // Subtle grain
    float grain = hash(uv * uResolution + fract(uTime * 100.0)) * 0.03;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1920, 1080) },
      uColor1: { value: new THREE.Color(0x0a0a09) }, // charcoal
      uColor2: { value: new THREE.Color(0x1a1917) }, // slightly lighter
      uAccent: { value: new THREE.Color(0xb1a696) }, // bronze
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroShaderBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ opacity: 0.35 }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1] }}
          style={{ width: "100%", height: "100%" }}
        >
          <ShaderPlane />
        </Canvas>
      </Suspense>
    </div>
  );
}
