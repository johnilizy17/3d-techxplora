
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import * as THREE from "three";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const collectiblesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 5, 15);
    sceneRef.current = scene;

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    cameraRef.current = camera;

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Lighting setup for premium look
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa6b1ff, 1.2);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xc7aff8, 0.8, 20);
    fillLight.position.set(-5, 0, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffb585, 0.6, 15);
    rimLight.position.set(0, -3, -3);
    scene.add(rimLight);

    // <!-- 3D COLLECTIBLE FIGURE PLACEHOLDER -->
    // Create floating collectible capsules (replace with actual GLB models later)
    const createCollectible = (position, color, size = 1) => {
      const group = new THREE.Group();

      // Glass capsule container
      const capsuleGeometry = new THREE.CylinderGeometry(0.4 * size, 0.4 * size, 1.8 * size, 32);
      const capsuleMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        roughness: 0,
        metalness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      });
      const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
      capsule.castShadow = true;
      capsule.receiveShadow = true;
      group.add(capsule);

      // Inner collectible figure (placeholder geometry)
      const figureGeometry = new THREE.BoxGeometry(0.5 * size, 0.7 * size, 0.5 * size, 2, 2, 2);
      const figureMaterial = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        metalness: 0.7,
        roughness: 0.3,
      });
      const figure = new THREE.Mesh(figureGeometry, figureMaterial);
      figure.castShadow = true;
      group.add(figure);

      // Pedestal ring with glow
      const ringGeometry = new THREE.TorusGeometry(0.45 * size, 0.08 * size, 16, 32);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffb585,
        emissive: 0xffb585,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1 * size;
      group.add(ring);

      // Position light for each collectible
      const spotLight = new THREE.SpotLight(color, 0.5, 10, Math.PI / 6, 0.5);
      spotLight.position.set(0, 2 * size, 0);
      spotLight.target = figure;
      group.add(spotLight);

      group.position.set(position.x, position.y, position.z);
      group.userData = {
        baseY: position.y,
        rotationSpeed: 0.002 + Math.random() * 0.001,
        floatOffset: Math.random() * Math.PI * 2
      };

      return group;
    };

    // Create 8 floating collectibles at various positions
    const collectiblePositions = [
      { x: -2.5, y: 0.5, z: -1, color: 0xa6b1ff, size: 1 },
      { x: 2.5, y: -0.5, z: -2, color: 0xc7aff8, size: 0.9 },
      { x: 0, y: 1, z: 0, color: 0xffb585, size: 1.1 },
      { x: -1.5, y: -1, z: 1, color: 0xa6b1ff, size: 0.8 },
      { x: 3, y: 0.8, z: 0.5, color: 0xc7aff8, size: 0.85 },
      { x: -3, y: 0, z: -0.5, color: 0xffb585, size: 0.95 },
      { x: 1.2, y: -0.8, z: -1.5, color: 0xa6b1ff, size: 0.9 },
      { x: -0.8, y: 0.3, z: 2, color: 0xc7aff8, size: 0.8 },
    ];

    // Reduce collectibles on mobile
    const isMobile = window.innerWidth < 768;
    const currentCollectiblePositions = isMobile ? collectiblePositions.slice(0, 4) : collectiblePositions;

    currentCollectiblePositions.forEach(pos => {
      const collectible = createCollectible(pos, pos.color, pos.size);
      scene.add(collectible);
      collectiblesRef.current.push(collectible);
    });

    // Create subtle particle field
    const particleCount = 150;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 15;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xa6b1ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Breathing float animation for collectibles
      collectiblesRef.current.forEach((collectible, index) => {
        const userData = collectible.userData;

        // Slow spin (≤ 0.2 rad/s)
        collectible.rotation.y += userData.rotationSpeed;

        // Breathing float (±18px ≈ ±0.18 units)
        const floatY = Math.sin(time * 0.8 + userData.floatOffset) * 0.18;
        collectible.position.y = userData.baseY + floatY;

        // Subtle parallax response to cursor (only on desktop)
        if (!isMobile) {
          collectible.position.x += (mousePos.x * 0.1 - collectible.position.x) * 0.02;
          collectible.rotation.x = mousePos.y * 0.05;
        }
      });

      // Slow particle drift
      particles.rotation.y = time * 0.02;

      // Camera parallax to mouse (subtle)
      if (!isMobile) {
        camera.position.x += (mousePos.x * 0.3 - camera.position.x) * 0.05;
        camera.position.y += (-mousePos.y * 0.2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [mousePos]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1520] to-[#0a0a0a]" />

      {/* 3D Canvas with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a] pointer-events-none" />

      {/* Hero content with parallax */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        {/* Premium badge */}
        <div className="mb-8 inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full animate-in fade-in slide-in-from-top duration-700">
          <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
          <span className="text-sm text-gray-300 tracking-[0.2em] uppercase font-medium">Play Smart</span>
        </div>

        {/* Main headline with gradient shine */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="gradient-text-shine block mb-2">
            Join the Challenge
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-3xl text-gray-400/90 mb-14 max-w-3xl font-light tracking-wide leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Quiz. Play. Win.
        </p>

        {/* CTA with halo effect */}
        <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
          <Button
            onClick={scrollToNext}
            className="interactive halo-click relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-full overflow-hidden group hover:scale-105 hover:shadow-[0_0_40px_rgba(166,177,255,0.5)] transition-all duration-500 animate-in fade-in zoom-in duration-1000 delay-300"
          >
            <span className="relative z-10 tracking-wide">For Teacher</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Button>
          <Button
            onClick={scrollToNext}
            className="interactive halo-click relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-full overflow-hidden group hover:scale-105 hover:shadow-[0_0_40px_rgba(166,177,255,0.5)] transition-all duration-500 animate-in fade-in zoom-in duration-1000 delay-300"
          >
            <span className="relative z-10 tracking-wide">For Student</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Button>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-16 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#a6b1ff] drop-shadow-[0_0_12px_rgba(166,177,255,0.6)]" />
        </div>
      </div>
    </div>
  );
}
