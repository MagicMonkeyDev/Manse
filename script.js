document.addEventListener('DOMContentLoaded', () => {
    const bootTexts = [
        'INITIALIZING NEURAL NETWORK...',
        'LOADING CHARACTER DATA...',
        'CALIBRATING VISUAL MATRIX...',
        'ESTABLISHING QUANTUM LINK...',
        'WAIFU.EXE ACTIVATED'
    ];

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

        // Stop glitch effect after animation
        setTimeout(() => {
            clearInterval(glitchInterval);
            ascii.innerHTML = originalText;
        }, 3000);
    }

    // Start the effects
    const bootTextElement = document.querySelector('.boot-text');
    setTimeout(() => {
        typeWriterEffect(bootTextElement, bootTexts);
    }, 500);

    addGlitchEffect();
});