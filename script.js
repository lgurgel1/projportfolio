// Animação de digitação para o texto do hero
const typingText = document.querySelector('.typing-text');
const texts = ['Desenvolvedor Full Stack', 'Analista de Dados', 'Entusiasta de Tecnologia'];
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
        let secret = '';
        for (let i = 0; i < 4; i++) {
            secret += Math.floor(Math.random() * 10).toString();
        }
        return secret;
    }

    checkGuess(guess) {
        if (guess.length !== 4 || !/^\d+$/.test(guess)) {
            return { valid: false, message: 'Por favor, insira um número de 4 dígitos.' };
        }

        let bulls = 0;
        let cows = 0;

        // Cria cópias dos números para contar os bois (B)
        const secretArray = this.secretNumber.split('');
        const guessArray = guess.split('');

        // Conta os bois (posição correta)
        for (let i = 0; i < 4; i++) {
            if (guessArray[i] === secretArray[i]) {
                bulls++;
                secretArray[i] = 'x';
                guessArray[i] = 'y';
            }
        }

        // Conta as vacas (número correto em posição errada)
        for (let i = 0; i < 4; i++) {
            if (guessArray[i] !== 'y') {
                const index = secretArray.indexOf(guessArray[i]);
                if (index !== -1) {
                    cows++;
                    secretArray[index] = 'x';
                }
            }
        }

        const totalCorrect = bulls + cows;
        let correctMessage = '';
        
        if (bulls === 4) {
            correctMessage = 'Parabéns! Você venceu! 🎉';
        } else if (totalCorrect > 0) {
            const numeroTexto = ['zero', 'um', 'dois', 'três'];
            correctMessage = `${bulls}B ${cows}C - Você acertou ${numeroTexto[totalCorrect]} número${totalCorrect > 1 ? 's' : ''}!`;
        } else {
            correctMessage = `${bulls}B ${cows}C - Nenhum número correto`;
        }

        const result = {
            guess,
            bulls,
            cows,
            message: correctMessage
        };

        this.history.push(result);

        if (bulls === 4) {
            this.gameOver = true;
        }

        return { valid: true, ...result };
    }

    resetGame() {
        this.secretNumber = this.generateSecretNumber();
        this.history = [];
        this.gameOver = false;
        this.updateHistory();
        const guessInput = document.getElementById('guess-input');
        const guessBtn = document.getElementById('guess-btn');
        guessInput.value = '';
        guessInput.disabled = false;
        guessBtn.disabled = false;
    }

    setupEventListeners() {
        const guessInput = document.getElementById('guess-input');
        const guessBtn = document.getElementById('guess-btn');
        const showAnswerBtn = document.getElementById('show-answer');

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
                setTimeout(() => {
                    alert('Novo jogo começando!');
                    this.resetGame();
                }, 1000);
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
            
            const guessText = document.createElement('div');
            guessText.textContent = `Tentativa: ${result.guess}`;
            
            const resultText = document.createElement('span');
            resultText.textContent = result.message;
            
            historyItem.appendChild(guessText);
            historyItem.appendChild(resultText);
            
            historyList.appendChild(historyItem);
        });
    }
}

// Inicializar o jogo
const game = new BullsAndCows();

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