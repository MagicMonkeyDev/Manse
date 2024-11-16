document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal-input');
    const output = document.getElementById('output');
    const keyboard = document.querySelector('.keyboard');
    let capsLockOn = false;
    let shiftOn = false;

    // Terminal commands
    const commands = {
        help: 'Available commands: help, clear, system, network, security, about',
        clear: () => output.innerHTML = '',
        about: 'CyberHub Command Center v1.0\nSecure Terminal Access',
        system: 'System Status:\nCPU: Online\nMemory: 32GB\nStorage: 1TB\nOS: CyberOS v3.1',
        network: 'Network Status:\nIncoming: 1.2 GB/s\nOutgoing: 824 MB/s\nLatency: 23ms',
        security: 'Security Status:\nFirewall: Active\nThreats Detected: 2\nLast Scan: 13:42'
    };

    // Boot sequence
    function bootSequence() {
        const messages = [
            'Initializing CyberHub Command Center...',
            'Loading security protocols...',
            'Establishing secure connection...',
            'Access granted...',
            'Type "help" for available commands.'
        ];

        let i = 0;
        const interval = setInterval(() => {
            output.innerHTML += messages[i] + '\n';
            i++;
            if (i >= messages.length) clearInterval(interval);
        }, 500);
    }

    // Handle terminal input
    terminal.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.toLowerCase().trim();
            const response = typeof commands[command] === 'function' 
                ? commands[command]() 
                : commands[command] || `Command not found: ${command}`;
            
            output.innerHTML += `\nroot@cyber:~$ ${this.value}\n${response || ''}\n`;
            this.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });

    // Handle virtual keyboard clicks
    keyboard.addEventListener('click', (e) => {
        const key = e.target.closest('.key');
        if (!key) return;

        const keyValue = key.dataset.key;
        
        // Handle special keys
        switch(keyValue) {
            case 'CapsLock':
                capsLockOn = !capsLockOn;
                key.classList.toggle('active');
                return;
            case 'Shift':
                shiftOn = !shiftOn;
                document.querySelectorAll('.key[data-key="Shift"]')
                    .forEach(k => k.classList.toggle('active'));
                return;
            case 'Enter':
                terminal.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
                return;
            case 'Backspace':
                terminal.value = terminal.value.slice(0, -1);
                return;
            case 'Tab':
                e.preventDefault();
                terminal.value += '    ';
                return;
        }

        // Handle regular keys
        let char = keyValue;
        if (capsLockOn || shiftOn) {
            char = char.toUpperCase();
        } else {
            char = char.toLowerCase();
        }

        // Handle shift + number keys for symbols
        if (shiftOn && '1234567890-=[]\\;\',./`'.includes(keyValue)) {
            const symbolMap = {
                '1': '!', '2': '@', '3': '#', '4': '$', '5': '%',
                '6': '^', '7': '&', '8': '*', '9': '(', '0': ')',
                '-': '_', '=': '+', '[': '{', ']': '}', '\\': '|',
                ';': ':', '\'': '"', ',': '<', '.': '>', '/': '?',
                '`': '~'
            };
            char = symbolMap[keyValue] || char;
        }

        terminal.value += char;
        terminal.focus();

        // Visual feedback
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 100);

        // Reset shift if it's on
        if (shiftOn && keyValue !== 'Shift') {
            shiftOn = false;
            document.querySelectorAll('.key[data-key="Shift"]')
                .forEach(k => k.classList.remove('active'));
        }
    });

    // Handle physical keyboard input for visual feedback
    document.addEventListener('keydown', (e) => {
        const key = document.querySelector(`.key[data-key="${e.key}"]`);
        if (key) {
            key.classList.add('active');
        }
    });

    document.addEventListener('keyup', (e) => {
        const key = document.querySelector(`.key[data-key="${e.key}"]`);
        if (key) {
            key.classList.remove('active');
        }
    });

    // Start boot sequence
    bootSequence();
});