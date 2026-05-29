// 1. Configuración de la fecha
const fechaInicio = new Date(2026, 3, 8, 0, 0); 

// 2. Rotación de frases superiores
const frases = [
    "Juntos es mi lugar feliz ✨", 
    "Eres mi persona favorita 🌹", 
    "Cada día te elijo a ti ❤️", 
    "Contigo todo es mejor 💖", 
    "Gracias por existir 🥰"
];
let fraseIndex = 0;
setInterval(() => {
    const phraseEl = document.getElementById('phrases');
    if (phraseEl) {
        fraseIndex = (fraseIndex + 1) % frases.length;
        phraseEl.innerText = frases[fraseIndex];
    }
}, 3500);

// 3. emojis como hojas del arbol 
function buildTree() {
    const tree = document.getElementById('tree');
    if (!tree) return; 

    const tiposCorazon = ['❤️', '💖', '💕', '🌸', '✨', '💝', '💘', '🧸', '🌹', '🕊️','❤️', '💖', '💕', '🌸', '✨', '💝', '💘', '🧸', '🌹', '🕊️'];
    const totalEmojis = 150; 

    for (let i = 0; i < totalEmojis; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('tree-heart');
            heart.innerText = tiposCorazon[Math.floor(Math.random() * tiposCorazon.length)];
            
            // Copa del arbol
            const angle = Math.random() * Math.PI * 3;
            const radiusX = (Math.random() * 100) + 10; 
            const radiusY = (Math.random() * 60) + 10; 
            
            const centroX = tree.offsetWidth / 2;
            const centroY = 90; 
            
            const x = Math.cos(angle) * radiusX + centroX - 12; 
            const y = Math.sin(angle) * radiusY + centroY;
            
            heart.style.left = `${x}px`; 
            heart.style.top = `${y}px`;
            heart.style.fontSize = `${Math.random() * 8 + 15}px`; 
            
            tree.appendChild(heart);
        }, i * 55); 
    }
}

// 4. Contador de tiempo 
function updateCounter() {
    const d = document.getElementById('days');
    if(!d) return;
    
    const diferencia = new Date() - fechaInicio;
    document.getElementById('days').innerText = Math.floor(diferencia / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor((diferencia % (1000 * 60)) / 1000).toString().padStart(2, '0');
}
setInterval(updateCounter, 1000);

// 5. Carrusel de fotos 
let currentSlide = 0;
setInterval(() => {
    const track = document.getElementById('track');
    if (track) {
        const totalImages = track.getElementsByTagName('img').length;
        if (totalImages > 0) {
            currentSlide = (currentSlide + 1) % totalImages;
            const percentage = -(currentSlide * (100 / totalImages));
            track.style.transform = `translateX(${percentage}%)`;
        }
    }
}, 5000);


// --- texto de escritura en la carta ---
const tituloCarta = "Hola, mi amor... ❤️";
const parrafosCarta = [
    "Solo quería recordarte lo especial que eres para mí y hacerte saber lo mucho que te amo. ❤️",
    "Usted se volvio un pieza fundamental ahora en mi vida y espero que se sienta tan bien conmigo como yo me siento contigo. 🥺♥️",
    "Nuestro tiempo juntos ha sido un regalo maravilloso, lleno de risas y momentos que guardaré por siempre en lo más profundo de mi corazón. 🌹💕",
    "Cada día a tu lado es una nueva aventura y una razón hermosa para sonreír. Gracias por existir y por hacerme tan feliz ✨",
    "Te amo muchísimo. 💕"
];

let titleIndex = 0;
let currentParagraph = 0;
let charIndex = 0;
let typingTimeout;

function typeWriter() {
    const titleContainer = document.getElementById('typing-title');
    const contentContainer = document.getElementById('typing-content');

    if (titleIndex < tituloCarta.length) {
        titleContainer.innerHTML += tituloCarta.charAt(titleIndex);
        titleIndex++;
        typingTimeout = setTimeout(typeWriter, 50);
    } 
    else if (currentParagraph < parrafosCarta.length) {
        if (charIndex === 0) {
            const p = document.createElement('p');
            p.id = `p-type-${currentParagraph}`;
            p.classList.add('typing-effect');
            contentContainer.appendChild(p);
        }

        const currentPElement = document.getElementById(`p-type-${currentParagraph}`);
        if (charIndex < parrafosCarta[currentParagraph].length) {
            currentPElement.innerHTML += parrafosCarta[currentParagraph].charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(typeWriter, 30);
        } else {
            currentPElement.classList.remove('typing-effect');
            currentParagraph++;
            charIndex = 0;
            typingTimeout = setTimeout(typeWriter, 400);
        }
    }
}

// Control del Modal Abierto/Cerrado
function toggleModal(show) {
    const modal = document.getElementById('modal');
    const titleContainer = document.getElementById('typing-title');
    const contentContainer = document.getElementById('typing-content');
    
    if (show) { 
        clearTimeout(typingTimeout);
        titleContainer.innerHTML = "";
        contentContainer.innerHTML = "";
        titleIndex = 0;
        currentParagraph = 0;
        charIndex = 0;

        modal.style.display = 'flex'; 
        setTimeout(() => {
            modal.classList.add('active');
            typeWriter(); 
        }, 15); 
    } else { 
        modal.classList.remove('active'); 
        clearTimeout(typingTimeout);
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}
function closeModalOutside(e) { if (e.target.id === 'modal') toggleModal(false); }


// 6. EFECTO: CORAZÓN 
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let animationFrameId;
let particles = [];

function toggleMagicHeart(show) {
    const container = document.getElementById('canvasContainer');
    if (show) {
        container.style.display = 'flex';
        setTimeout(() => container.classList.add('active'), 10);
        initCanvas();
    } else {
        container.classList.remove('active');
        cancelAnimationFrame(animationFrameId);
        setTimeout(() => container.style.display = 'none', 500);
    }
}

function initCanvas() {
    canvas.width = Math.min(window.innerWidth, 650);
    canvas.height = Math.min(window.innerHeight, 650);
    particles = [];
    
    const totalParticles = 500;
    
    for (let i = 0; i < totalParticles; i++) {
        let t = (i / totalParticles) * Math.PI * 2;
        
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        
        particles.push({
            baseX: x * (canvas.width / 32) + (canvas.width / 2),
            baseY: -y * (canvas.height / 32) + (canvas.height / 2) - 30,
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: 2.2, 
            speed: 0.008 + (Math.random() * 0.004), 
            progress: 0,
            angleOffset: Math.random() * Math.PI * 2 
        });
    }
    animateHeart();
}

function animateHeart() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        if (p.progress < 1) {
            p.progress += p.speed;
            p.x = p.x + (p.baseX - p.x) * p.progress;
            p.y = p.y + (p.baseY - p.y) * p.progress;
        } else {
            p.x = p.baseX + Math.sin(Date.now() * 0.0025 + p.angleOffset) * 0.6;
        }

        ctx.fillStyle = '#ff4d6d';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Texto Central 
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText("TE AMO", canvas.width / 2, canvas.height / 2 - 5);

    // Subtexto 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 15px Courier New';
    ctx.fillText("FOR YOU MY GIRL", canvas.width / 2, canvas.height / 2 + 35);

    animationFrameId = requestAnimationFrame(animateHeart);
}

// Carga Inicial Automática
window.onload = () => { buildTree(); updateCounter(); };