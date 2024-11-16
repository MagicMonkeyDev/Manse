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
    matrix: 'Accessing the Matrix...\nConnection established.\nDecoding reality...'
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