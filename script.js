document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal after intro sequence
    setTimeout(() => {
        const introSequence = document.querySelector('.intro-sequence');
        const cyberContainer = document.querySelector('.cyber-container');
        
        // Hide intro sequence
        introSequence.classList.add('hide-intro');
        
        // Show main container
        cyberContainer.classList.add('show-container');
        
        // Initialize terminal
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