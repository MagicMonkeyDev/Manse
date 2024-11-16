// Matrix rain effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix rain characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Terminal functionality
const input = document.getElementById('terminal-input');
const output = document.getElementById('output');
const commands = {
    help: 'Available commands: help, clear, about, matrix',
    about: 'Cyber Terminal v1.0 - Created by [Your Name]',
    clear: () => output.innerHTML = '',
    matrix: 'Accessing the Matrix...\nConnection established.\nDecoding reality...',
    stats: 'System Statistics:\nCPU: Online\nMemory: 32GB\nNetwork: Connected',
    scan: 'Scanning network...\nFound 42 active nodes\nSecurity level: High',
    system: 'System Information:\nOS: CyberOS v3.1\nKernel: 4.19.0-cyber\nUptime: 24:00:00'
};

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = input.value.toLowerCase().trim();
        const response = typeof commands[command] === 'function' 
            ? commands[command]() 
            : commands[command] || `Command not found: ${command}`;
        
        output.innerHTML += `\n> ${input.value}`;
        output.innerHTML += `\n> ${response}`;
        input.value = '';
    }
}); 

// Update system stats periodically
function updateSystemStats() {
    const stats = {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        network: Math.random() * 100
    };

    document.querySelectorAll('.progress').forEach((bar, index) => {
        const values = Object.values(stats);
        bar.style.width = `${values[index]}%`;
    });
}

// Update network stats
function updateNetworkStats() {
    const ping = Math.floor(Math.random() * 100);
    document.querySelector('.stat-value').textContent = `${ping}ms`;
}

// Run updates
setInterval(updateSystemStats, 2000);
setInterval(updateNetworkStats, 1000);