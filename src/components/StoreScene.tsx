"use client";

import { useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

function subscribe(cb: () => void) {
  const q = window.matchMedia("(prefers-reduced-motion: reduce)");
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

function Store({ profit, orders, still }: { profit: number; orders: number; still: boolean }) {
  const ring = useRef<Group>(null);
  const count = Math.max(6, Math.min(48, Math.round(orders / 60)));
  const h = Math.max(0.15, Math.min(2.6, Math.abs(profit) / 25000));
  const color = profit >= 0 ? "#2dd4bf" : "#f87171";
  useFrame((_, dt) => {
    if (ring.current && !still) ring.current.rotation.y += dt * 0.35;
  });
  return (
    <group rotation={[0.35, 0.5, 0]}>
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[2.6, 0.12, 2.6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, -1.14 + h / 2, 0]}>
        <boxGeometry args={[1.2, h, 1.2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
      </mesh>
      <group ref={ring}>
        {Array.from({ length: count }, (_, k) => {
          const a = (k / count) * Math.PI * 2;
          const r = 1.9 + (k % 3) * 0.18;
          return (
            <mesh key={k} position={[Math.cos(a) * r, -0.2 + (k % 4) * 0.28, Math.sin(a) * r]}>
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              <meshStandardMaterial color="#e2e8f0" emissive="#94a3b8" emissiveIntensity={0.3} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function StoreScene({ profit, orders }: { profit: number; orders: number }) {
  const still = useReducedMotion();
  return (
    <Canvas camera={{ position: [0, 1.2, 6], fov: 40 }} frameloop={still ? "demand" : "always"} dpr={[1, 1.75]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Store profit={profit} orders={orders} still={still} />
    </Canvas>
  );
}
