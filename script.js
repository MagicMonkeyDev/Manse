document.addEventListener('DOMContentLoaded', () => {
    // Initialize vortex after intro sequence
    setTimeout(() => {
        const introSequence = document.querySelector('.intro-sequence');
        const cyberContainer = document.querySelector('.cyber-container');
        
        // Hide intro sequence
        introSequence.classList.add('hide-intro');
        
        // Show main container and initialize vortex
        cyberContainer.classList.add('show-container');
        initVortex();
        initializeTerminal();
    }, 6000);

    // Boot sequence texts
    const bootTexts = [
        'INITIALIZING NEURAL NETWORK...',
        'LOADING CHARACTER DATA...',
        'CALIBRATING VISUAL MATRIX...',
        'ESTABLISHING QUANTUM LINK...',
        'WAIFU.EXE ACTIVATED'
    ];

    // Start boot sequence
    const bootTextElement = document.querySelector('.boot-text');
    typeWriterEffect(bootTextElement, bootTexts);

    // Add glitch effect to ASCII art
    addGlitchEffect();

    // Create background effects after intro sequence
    setTimeout(() => {
        createBackgroundEffects();
    }, 6000);
});

// Terminal initialization
function initializeTerminal() {
    const terminal = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    let commandHistory = [];
    let historyIndex = -1;

    // Available commands
    const commands = {
        help: 'Available commands:\n' +
              '  help     - Show this help message\n' +
              '  clear    - Clear terminal\n' +
              '  system   - Display system information\n' +
              '  network  - Show network status\n' +
              '  scan     - Run security scan\n' +
              '  hack     - Attempt system hack\n' +
              '  date     - Show current date and time\n' +
              '  echo     - Echo a message',

        clear: () => output.innerHTML = '',

        system: 'SYSTEM STATUS:\n' +
                'Kernel: CyberOS 3.1.4\n' +
                'CPU: QUANTUM-X\n' +
                'MEM: 32GB QUANTUM-RAM\n' +
                'SECURITY: ACTIVE',

        network: 'NETWORK STATUS:\n' +
                'Connection: QUANTUM-LINK\n' +
                'Encryption: AES-4096\n' +
                'Signal: STRONG\n' +
                'Nodes: 256',

        scan: () => {
            let output = 'INITIATING SECURITY SCAN...\n';
            for(let i = 0; i < 5; i++) {
                output += `Scanning sector ${i}... OK\n`;
            }
            return output + 'Scan complete. No threats detected.';
        },

        hack: () => {
            return 'INITIALIZING HACK SEQUENCE...\n' +
                   '[ERROR] Access denied.\n' +
                   'Nice try. ;)';
        },

        date: () => new Date().toLocaleString(),

        echo: (args) => args.join(' ')
    };

    // Terminal input handling
    terminal.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = this.value.trim();
            const [command, ...args] = input.toLowerCase().split(' ');
            
            // Add to output
            output.innerHTML += `\nroot@cyber:~$ ${input}\n`;
            
            // Process command
            if (command) {
                commandHistory.push(input);
                historyIndex = commandHistory.length;
                
                const response = commands[command];
                if (response) {
                    const result = typeof response === 'function' ? response(args) : response;
                    output.innerHTML += result + '\n';
                } else {
                    output.innerHTML += `Command not found: ${command}\n`;
                }
            }
            
            this.value = '';
            output.scrollTop = output.scrollHeight;
        }
        
        // Command history navigation
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                this.value = commandHistory[historyIndex];
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                this.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                this.value = '';
            }
        }
    });

    // Virtual keyboard handling
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.getAttribute('data-key');
            handleKeyPress(keyValue, terminal);
        });
    });

    // Update time in header
    setInterval(updateTime, 1000);
    updateTime();
}

// Helper functions
function typeWriterEffect(element, texts, index = 0, charIndex = 0) {
    if (!element || index >= texts.length) return;

    if (charIndex < texts[index].length) {
        element.textContent = texts[index].substring(0, charIndex + 1);
        setTimeout(() => {
            typeWriterEffect(element, texts, index, charIndex + 1);
        }, 50);
    } else {
        setTimeout(() => {
            element.textContent = '';
            typeWriterEffect(element, texts, index + 1, 0);
        }, 1000);
    }
}

function addGlitchEffect() {
    const ascii = document.querySelector('.ascii-waifu');
    if (!ascii) return;

    const originalText = ascii.innerHTML;
    const glitchChars = 'ｱｲｳｴｵｶｷｸｹｺ01';
    
    let glitchInterval = setInterval(() => {
        if (Math.random() > 0.9) {
            ascii.innerHTML = originalText.split('').map(char => {
                if (char !== ' ' && char !== '\n' && Math.random() > 0.85) {
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                }
                return char;
            }).join('');

            setTimeout(() => {
                ascii.innerHTML = originalText;
            }, 50);
        }
    }, 100);

    setTimeout(() => {
        clearInterval(glitchInterval);
        ascii.innerHTML = originalText;
    }, 3000);
}

function handleKeyPress(key, terminal) {
    const input = terminal;
    const cursorPos = input.selectionStart;
    
    switch(key) {
        case 'Backspace':
            const text = input.value;
            input.value = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
            input.selectionStart = input.selectionEnd = cursorPos - 1;
            break;
        case 'Enter':
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            break;
        case 'Space':
            input.value += ' ';
            break;
        case 'Tab':
            e.preventDefault();
            input.value += '    ';
            break;
        default:
            if (key.length === 1) {
                const text = input.value;
                input.value = text.slice(0, cursorPos) + key + text.slice(cursorPos);
                input.selectionStart = input.selectionEnd = cursorPos + 1;
            }
    }
    input.focus();
}

function updateTime() {
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-US', { 
            hour12: false 
        });
    }
}

// Add this function to create background effects
function createBackgroundEffects() {
    const shapes = [
        { class: 'cube', size: 60 },
        { class: 'pyramid', size: 80 },
        { class: 'sphere', size: 40 }
    ];
    
    const container = document.querySelector('.background-effects');
    
    // Create floating shapes
    for (let i = 0; i < 15; i++) {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const element = document.createElement('div');
        element.className = `floating-shape ${shape.class}`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.width = `${shape.size}px`;
        element.style.height = `${shape.size}px`;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * -20;
        element.style.animation = `floatAnimation ${duration}s ${delay}s infinite linear`;
        
        container.appendChild(element);
    }
    
    // Create glow effects
    for (let i = 0; i < 5; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow-effect';
        
        // Random position
        glow.style.left = `${Math.random() * 100}%`;
        glow.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * -5;
        glow.style.animation = `pulseGlow ${duration}s ${delay}s infinite ease-in-out`;
        
        container.appendChild(glow);
    }
}

// Add mouse movement effect for glow elements
document.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.glow-effect');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    glows.forEach((glow, index) => {
        const speed = 0.1 - (index * 0.02);
        const x = mouseX * speed;
        const y = mouseY * speed;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add this vortex animation code to your script.js
// Make sure this comes after your existing intro sequence code

function initVortex() {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let stars = [];
    let centerX = width / 2;
    let centerY = height / 2;

    const starCount = 1000; // Adjust for more or fewer stars
    const starBaseSize = 1;
    const starMaxSize = 2;
    const speed = 0.2;

    class Star {
        constructor() {
            this.init();
        }
    
        init() {
            this.x = Math.random() * width - width / 2;
            this.y = Math.random() * height - height / 2;
            this.z = Math.random() * 2000;
            this.size = starBaseSize;
            this.opacity = 0;
        }
    
        update() {
            this.z -= speed * 10;
            
            if (this.z <= 0) {
                this.init();
                this.z = 2000;
            }
            
            this.size = starBaseSize + (starMaxSize * (1 - this.z / 2000));
            
            // Calculate position relative to center
            let dx = this.x / (this.z * 0.001);
            let dy = this.y / (this.z * 0.001);
            
            // Rotate points
            let rot = performance.now() * 0.0001;
            let nx = dx * Math.cos(rot) - dy * Math.sin(rot);
            let ny = dx * Math.sin(rot) + dy * Math.cos(rot);
            
            this.screenX = centerX + nx;
            this.screenY = centerY + ny;
            
            // Fade stars in/out based on position
            this.opacity = Math.min(1, Math.max(0, 1 - this.z / 2000));
        }
    
        draw() {
            ctx.beginPath();
            ctx.arc(this.screenX, this.screenY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, width, height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2;
        centerY = height / 2;
    });

    animate();
}