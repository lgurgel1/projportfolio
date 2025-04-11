// Animação de digitação para o texto do hero
const typingText = document.querySelector('.typing-text');
const texts = ['Desenvolvedor Full Stack', 'Desenvolvedor Mobile', 'Entusiasta de Tecnologia'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

type();

// Jogo Senha (Bulls and Cows)
class BullsAndCows {
    constructor() {
        this.secretNumber = this.generateSecretNumber();
        this.history = [];
        this.gameOver = false;
        this.setupEventListeners();
    }

    generateSecretNumber() {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const secret = [];
        
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            secret.push(numbers[randomIndex]);
            numbers.splice(randomIndex, 1);
        }
        
        return secret.join('');
    }

    checkGuess(guess) {
        if (guess.length !== 4 || !/^\d+$/.test(guess)) {
            return { valid: false, message: 'Por favor, insira um número de 4 dígitos.' };
        }

        if (new Set(guess).size !== 4) {
            return { valid: false, message: 'Todos os dígitos devem ser diferentes.' };
        }

        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < 4; i++) {
            if (guess[i] === this.secretNumber[i]) {
                bulls++;
            } else if (this.secretNumber.includes(guess[i])) {
                cows++;
            }
        }

        const result = {
            guess,
            bulls,
            cows,
            message: `${bulls}B ${cows}C`
        };

        this.history.push(result);

        if (bulls === 4) {
            this.gameOver = true;
            result.message += ' - Parabéns! Você venceu!';
        }

        return { valid: true, ...result };
    }

    setupEventListeners() {
        const guessInput = document.getElementById('guess-input');
        const guessBtn = document.getElementById('guess-btn');
        const showAnswerBtn = document.getElementById('show-answer');
        const historyList = document.getElementById('history-list');

        guessBtn.addEventListener('click', () => {
            const guess = guessInput.value;
            const result = this.checkGuess(guess);

            if (!result.valid) {
                alert(result.message);
                return;
            }

            this.updateHistory();
            guessInput.value = '';

            if (this.gameOver) {
                guessInput.disabled = true;
                guessBtn.disabled = true;
            }
        });

        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                guessBtn.click();
            }
        });

        showAnswerBtn.addEventListener('click', () => {
            alert(`O número secreto é: ${this.secretNumber}`);
        });
    }

    updateHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        this.history.slice().reverse().forEach(result => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = `${result.guess} - ${result.message}`;
            historyList.appendChild(historyItem);
        });
    }
}

// Inicializar o jogo
const game = new BullsAndCows();

// Formulário de contato
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!');
    contactForm.reset();
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
}); 