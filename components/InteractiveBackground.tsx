import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const host = containerRef.current;
        const GRID_SIZE = 120;
        const DOT_OPAC = 0.12;
        const DOT_COLOR = "#FCBE26";
        const BG_COLOR = "#050505";
        const DPR = Math.min(2, window.devicePixelRatio || 1);

        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geom = new THREE.PlaneGeometry(2, 2);

        // Mouse trail via <canvas> 2D
        const trailSize = 512;
        const trailCanvas = document.createElement('canvas');
        trailCanvas.width = trailCanvas.height = trailSize;
        const trailCtx = trailCanvas.getContext('2d');
        if (!trailCtx) return;

        trailCtx.fillStyle = 'black';
        trailCtx.fillRect(0, 0, trailSize, trailSize);

        const trailTex = new THREE.Texture(trailCanvas);
        trailTex.minFilter = THREE.LinearFilter;
        trailTex.magFilter = THREE.LinearFilter;
        trailTex.needsUpdate = true;

        const fadeTrail = () => {
            trailCtx.fillStyle = 'rgba(0,0,0,0.06)';
            trailCtx.fillRect(0, 0, trailSize, trailSize);
        };

        const addTrailAt = (normX: number, normY: number) => {
            const x = normX * trailSize;
            const y = (1 - normY) * trailSize;
            const r = Math.max(8, trailSize * 0.06);
            const grad = trailCtx.createRadialGradient(x, y, 0, x, y, r);
            grad.addColorStop(0, 'rgba(255,255,255,0.4)');
            grad.addColorStop(1, 'rgba(255,255,255,0.0)');
            trailCtx.globalCompositeOperation = 'lighter';
            trailCtx.fillStyle = grad;
            trailCtx.beginPath();
            trailCtx.arc(x, y, r, 0, Math.PI * 2);
            trailCtx.fill();
            trailCtx.globalCompositeOperation = 'source-over';
            trailTex.needsUpdate = true;
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = host.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            addTrailAt(x, y);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!e.targetTouches.length) return;
            const t = e.targetTouches[0];
            const rect = host.getBoundingClientRect();
            const x = (t.clientX - rect.left) / rect.width;
            const y = (t.clientY - rect.top) / rect.height;
            addTrailAt(x, y);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);

        const vertexShader = `
            void main() {
                gl_Position = vec4(position.xy, 0.0, 1.0);
            }
        `;

        const fragmentShader = `
            precision highp float;
            uniform float time;
            uniform vec2 resolution;
            uniform vec3 dotColor;
            uniform vec3 bgColor;
            uniform sampler2D mouseTrail;
            uniform float gridSize;
            uniform float dotOpacity;

            vec2 coverUv(vec2 uv) {
                vec2 s = resolution.xy / max(resolution.x, resolution.y);
                return (uv - 0.5) * s + 0.5;
            }

            float sdfCircle(vec2 p, float r) {
                return length(p - 0.5) - r;
            }

            void main() {
                vec2 screenUv = gl_FragCoord.xy / resolution;
                vec2 uv = coverUv(screenUv);

                // Grid
                vec2 gridUv = fract(uv * gridSize);
                vec2 gridCenter = (floor(uv * gridSize) + 0.5) / gridSize;

                // Mouse trail influence
                float mouseInfluence = texture2D(mouseTrail, gridCenter).r;
                
                // Animated mask
                float circleAnimatedMask = sin(time * 1.5 + length(uv - 0.5) * 8.0) * 0.5 + 0.5;

                float baseDotSize = 0.08;
                float dotSize = baseDotSize * (1.0 + mouseInfluence * 2.0 + circleAnimatedMask * 0.2);
                
                float sdfDot = sdfCircle(gridUv, dotSize);
                float smoothDot = smoothstep(0.06, 0.0, sdfDot);

                float opacityInfluence = mouseInfluence * 2.0 + circleAnimatedMask * 0.1;
                
                vec3 finalColor = mix(bgColor, dotColor, smoothDot * dotOpacity * (1.0 + opacityInfluence));
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        const uniforms = {
            time: { value: 0.0 },
            resolution: { value: new THREE.Vector2(1, 1) },
            dotColor: { value: new THREE.Color(DOT_COLOR) },
            bgColor: { value: new THREE.Color(BG_COLOR) },
            mouseTrail: { value: trailTex },
            gridSize: { value: GRID_SIZE },
            dotOpacity: { value: DOT_OPAC }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true
        });

        const mesh = new THREE.Mesh(geom, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(DPR);
        const canvas = renderer.domElement;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        host.appendChild(canvas);

        const resize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            renderer.setSize(w, h);
            uniforms.resolution.value.set(w * DPR, h * DPR);
        };

        window.addEventListener('resize', resize);
        resize();

        let rafId: number;
        const animate = () => {
            rafId = requestAnimationFrame(animate);
            fadeTrail();
            uniforms.time.value += 0.016;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(rafId);
            geom.dispose();
            material.dispose();
            renderer.dispose();
            if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none -z-10 bg-[#050505]"
        />
    );
};

export default InteractiveBackground;
