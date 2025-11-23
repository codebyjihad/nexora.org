"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";

function NetworkingGlobe() {
  const groupRef = useRef<THREE.Group>(null!);

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const nodes: THREE.Mesh[] = [];

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      opacity: 0.6,
      transparent: true,
    });
    const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff });

    const radius = 2.2;
    const nodeCount = 60;

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        nodeMaterial
      );
      node.position.set(x, y, z);
      group.add(node);
      nodes.push(node);
    }

    // Create random connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.04) {
          const points = [
            nodes[i].position.clone(),
            nodes[j].position.clone(),
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, edgeMaterial);
          group.add(line);
        }
      }
    }
  }, []);

  return <group ref={groupRef} />;
}

export default function RegisterPage() {
  
  // const context = useContext(AuthContext)
  // if(!context) new Error('Something is rong !')
  // const { registerWithEmailAndPassword} = context;
  

  return (
    <div className="container mx-auto h-screen relative text-white overflow-hidden">
      {/* Space Background */}
      <div className="fixed inset-0 -z-20">
        <Canvas>
          <color attach="background" args={["#000"]} />
          <Stars radius={200} count={5000} factor={4} fade speed={1} />
        </Canvas>
      </div>

      {/* Left Half – Interactive Networking Globe */}
      <div className="absolute left-0 top-0 h-full w-1/2 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <NetworkingGlobe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            rotateSpeed={0.6}
          />
        </Canvas>
      </div>

      {/* Right Side – Login Card */}
      <div className="flex w-full h-full justify-end items-center pr-20 relative z-10 pointer-events-none">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-cyan-500/30 shadow-2xl pointer-events-auto">
          <CardHeader className="text-center space-y-3 pb-8">
            
            <CardDescription className="text-cyan-200 text-lg">
              Create Now Account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/90 text-sm">First Name</Label>
              <Input
                type="text"
                placeholder="example Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/90 text-sm">Last Name</Label>
              <Input
                type="text"
                placeholder="example Name"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/90 text-sm">Email Address</Label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-white/90 text-sm">Password</Label>
                <a className="text-cyan-400 text-sm hover:text-cyan-300 cursor-pointer">
                  Forgot?
                </a>
              </div>
              <Input
                type="password"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-6">
            <Button className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg h-14 rounded-xl shadow-lg">
              Sign In
            </Button>

            <p className="text-center text-white/60 text-sm mt-4">
              Already have an account?{" "}
              <a className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                Sign In
              </a>
            </p>
            
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}