// ==========================================
// 1. Localized Three.js Setup (Premium & Smooth)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

const canvasContainer = document.getElementById('canvas-container');

// Only proceed if the container exists (failsafe)
if (canvasContainer) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    canvasContainer.appendChild(renderer.domElement);

    // Smooth, high-end lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    const loader = new THREE.GLTFLoader();
    let pipeModel;

    // To handle idle floating independent of scroll
    const idleGroup = new THREE.Group();
    scene.add(idleGroup);

    loader.load('assets/cpvc-pipe.glb', function(gltf) {
        pipeModel = gltf.scene;

        const isMobile = window.innerWidth < 768;
        
        // Scale and initial position optimized for the local container
        if (isMobile) {
            pipeModel.scale.set(2.0, 2.0, 2.0); 
            pipeModel.position.set(0, 0, 0);
        } else {
            pipeModel.scale.set(2.8, 2.8, 2.8); 
            pipeModel.position.set(0, -0.5, 0);
        }
        
        pipeModel.rotation.set(0.3, -0.6, 0);
        
        idleGroup.add(pipeModel);

        // Add subtle interactive rotation based on mouse movement
        canvasContainer.addEventListener('mousemove', (e) => {
            const rect = canvasContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            gsap.to(idleGroup.rotation, {
                x: y * 0.3,
                y: x * 0.3,
                duration: 1,
                ease: "power2.out"
            });
        });

        // Reset rotation when mouse leaves
        canvasContainer.addEventListener('mouseleave', () => {
            gsap.to(idleGroup.rotation, { x: 0, y: 0, duration: 1, ease: "power2.out" });
        });
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        
        if (pipeModel) {
            const time = clock.getElapsedTime();
            // Very gentle idle breathing effect
            idleGroup.position.y = Math.sin(time * 2) * 0.05;
            
            // Continuous auto-rotation for product showcasing
            pipeModel.rotation.x += 0.003;
            pipeModel.rotation.y += 0.01;
            pipeModel.rotation.z += 0.002;
        }
        
        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize locally
    window.addEventListener('resize', () => {
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
}

// ==========================================
// 2. UI/UX Pro Max Interactions
// ==========================================

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-text, h2, .bento-card, .story-step, .glass-panel').forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 });
    observer.observe(el);
});

// Navbar shadow
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('shadow-md');
    else header.classList.remove('shadow-md');
});
