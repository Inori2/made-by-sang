'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeText() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --------------------
    // Scene
    // --------------------
    const scene = new THREE.Scene();

    // --------------------
    // Camera
    // --------------------
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 0.45;

    // --------------------
    // Renderer
    // --------------------
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // --------------------
    // Canvas Text
    // --------------------
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1920;
    canvas.height = 1080;

    const texture = new THREE.CanvasTexture(canvas);

    function drawText() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 120px Saans'; // your custom font
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText('MADEBY©SANG', canvas.width / 2, canvas.height / 2);

      texture.needsUpdate = true;
    }

    // wait for font
    document.fonts.ready.then(drawText);

    // --------------------
    // Mesh
    // --------------------
    const geometry = new THREE.PlaneGeometry(2, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --------------------
    // Animation
    // --------------------
    let animationId;

    function animate() {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // --------------------
    // Resize
    // --------------------
    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', handleResize);

    // --------------------
    // CLEANUP (VERY IMPORTANT)
    // --------------------
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // --------------------
  // JSX
  // --------------------
  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
}
