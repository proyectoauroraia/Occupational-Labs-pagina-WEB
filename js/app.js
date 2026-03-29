/**
 * Occupational Labs - Interactive Script
 * ------------------------------------
 * Manejo de menú móvil, barra de progreso y animaciones de scroll.
 */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".header-fixed");
    const mobileOverlay = document.createElement("div");
    mobileOverlay.className = "navbar-mobile-overlay";
    document.body.appendChild(mobileOverlay);

    // Clonar links para el menú móvil
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        const clonedLinks = navLinks.cloneNode(true);
        mobileOverlay.appendChild(clonedLinks);
        
        // Agregar botón de cierre opcional o simplemente cerrar al hacer click en un link
        clonedLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileOverlay.classList.remove("active");
                document.body.style.overflow = "auto";
            });
        });
    }

    // Menu Toggle Logic
    const menuToggle = document.querySelector(".menu-toggle") || createMenuToggle(navbar);
    
    menuToggle.addEventListener("click", () => {
        mobileOverlay.classList.toggle("active");
        const isActive = mobileOverlay.classList.contains("active");
        document.body.style.overflow = isActive ? "hidden" : "auto";
        menuToggle.innerHTML = isActive ? 
            '<span class="material-icons">close</span>' : 
            '<span class="material-icons">menu</span>';
    });

    function createMenuToggle(parent) {
        const btn = document.createElement("button");
        btn.className = "menu-toggle";
        btn.innerHTML = '<span class="material-icons">menu</span>';
        parent.querySelector(".nav-container")?.appendChild(btn);
        return btn;
    }

    // Scroll Progress & Navbar State
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.querySelector(".progress-bar");
        if (progressBar) progressBar.style.width = scrolled + "%";

        if (winScroll > 50) {
            navbar?.classList.add("header-scrolled");
        } else {
            navbar?.classList.remove("header-scrolled");
        }
    });

    // Lazy Loading fallback for older browsers
    // Neural Network Canvas Animation
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 102, 255, 0.7)';
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 100; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 180) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(138, 43, 226, ${0.4 * (1 - dist/180)})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    }

    // Back to top
    const backToTop = document.getElementById('backToTop') || createBackToTop();
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function createBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.id = 'backToTop';
        btn.innerHTML = '<span class="material-icons">arrow_upward</span>';
        document.body.appendChild(btn);
        return btn;
    }
});
