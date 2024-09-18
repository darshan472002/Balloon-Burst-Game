let balloonSize = 10;
let maxBalloonSize = 150;
let currentBalloonIndex = 0;
const totalBalloons = 26;
let balloons = [];
const balloonContainer = document.getElementById('balloon-container');
const pump = document.getElementById('pump');
const container = document.getElementById('container');
const pipe = document.getElementById('pipe');

// Array of balloon image sources
const balloonImages = [
    'Graphics/Symbol 100001.png', 'Graphics/Symbol 100002.png', 'Graphics/Symbol 100003.png', 'Graphics/Symbol 100004.png', 'Graphics/Symbol 100005.png',
    'Graphics/Symbol 100006.png', 'Graphics/Symbol 100007.png', 'Graphics/Symbol 100008.png', 'Graphics/Symbol 100009.png', 'Graphics/Symbol 100010.png', 'Graphics/Symbol 100001.png', 'Graphics/Symbol 100002.png', 'Graphics/Symbol 100003.png', 'Graphics/Symbol 100004.png', 'Graphics/Symbol 100005.png',
    'Graphics/Symbol 100006.png', 'Graphics/Symbol 100007.png', 'Graphics/Symbol 100008.png', 'Graphics/Symbol 100009.png', 'Graphics/Symbol 100010.png', 'Graphics/Symbol 100001.png', 'Graphics/Symbol 100002.png', 'Graphics/Symbol 100003.png', 'Graphics/Symbol 100004.png', 'Graphics/Symbol 100005.png',
    'Graphics/Symbol 100006.png'
];

// Array of alphabet image sources
const alphabetImages = [
    'Graphics/A.png', 'Graphics/B.png', 'Graphics/C.png', 'Graphics/D.png', 'Graphics/E.png',
    'Graphics/F.png', 'Graphics/G.png', 'Graphics/H.png', 'Graphics/I.png', 'Graphics/J.png',
    'Graphics/K.png', 'Graphics/L.png', 'Graphics/M.png', 'Graphics/N.png', 'Graphics/O.png',
    'Graphics/P.png', 'Graphics/Q.png', 'Graphics/R.png', 'Graphics/S.png', 'Graphics/T.png',
    'Graphics/U.png', 'Graphics/V.png', 'Graphics/W.png', 'Graphics/X.png', 'Graphics/Y.png',
    'Graphics/Z.png'
];

// Image source for thread
const threadImage = 'Graphics/Symbol 100011.png';

// Create balloon elements dynamically and hide them initially
for (let i = 0; i < totalBalloons; i++) {
    const balloonWrapper = document.createElement('div');
    balloonWrapper.classList.add('balloon');
    balloonWrapper.style.display = 'none';

    const balloon = document.createElement('img');
    balloon.src = balloonImages[i];
    balloonWrapper.appendChild(balloon);

    // Create and append the thread image element, initially hidden
    const thread = document.createElement('img');
    thread.src = threadImage;
    thread.classList.add('thread');
    thread.style.display = 'none';
    balloonWrapper.appendChild(thread);

    // Create and append the alphabet image element
    const alphabet = document.createElement('img');
    alphabet.classList.add('alphabet');
    alphabet.style.display = 'none'; // Hide initially
    balloonWrapper.appendChild(alphabet);

    balloonWrapper.addEventListener('click', burstBalloon);
    balloons.push(balloonWrapper);
    balloonContainer.appendChild(balloonWrapper);
}

// Pump click event: Inflate balloons one by one
pump.addEventListener('click', () => {
    pump.classList.add('pump-active');
    container.classList.add('pump-active');
    pipe.classList.add('pump-active');
    setTimeout(() => {
        pump.classList.remove('pump-active');
        container.classList.remove('pump-active');
        pipe.classList.remove('pump-active');
    }, 200);

    inflateBalloon();
});

function inflateBalloon() {
    const balloon = balloons[currentBalloonIndex];
    balloon.style.display = 'block';
    balloon.style.bottom = '0em';
    balloon.style.left = '92.5%';
    balloon.style.transform = 'translateX(-50%)';

    // Set the alphabet image for the current balloon
    const alphabet = balloon.querySelector('.alphabet');
    alphabet.src = alphabetImages[currentBalloonIndex];
    alphabet.style.display = 'block'; // Show the alphabet image

    if (balloonSize < maxBalloonSize) {
        balloonSize += 30;
        balloon.style.width = `${balloonSize}px`;
    } else {
        attachThread(balloon); // Attach thread when balloon is fully inflated
        floatBalloon(balloon);
        currentBalloonIndex = (currentBalloonIndex + 1) % totalBalloons; 
        balloonSize = 10;
    }
}

function attachThread(balloon) {
    const thread = balloon.querySelector('.thread');
    thread.style.display = 'block'; // Show the thread when the balloon is fully inflated
}

function floatBalloon(balloon) {
    const randomHorizontalOffset = Math.random() * -900 - 500;
    balloon.style.transition = 'transform 8s ease, bottom 8s ease';
    balloon.style.bottom = '20%';
    balloon.style.transform = `translate(${randomHorizontalOffset}px, -200px)`;
}

function burstBalloon(event) {
    const balloon = event.currentTarget;
    const balloonRect = balloon.getBoundingClientRect();
    
    // Set the burst image and hide the balloon
    balloon.src = 'Graphics/Symbol 100011.png';
    
    // Create the particle effect container
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    particleContainer.style.left = `${balloonRect.left}px`;
    particleContainer.style.top = `${balloonRect.top}px`;
    particleContainer.style.width = `${balloonRect.width}px`;
    particleContainer.style.height = `${balloonRect.height}px`;
    document.body.appendChild(particleContainer);
    
    // Delay the particle effect to allow the burst image to be visible
    setTimeout(() => {
        // Generate particles
        for (let i = 0; i < 50; i++) { // Increased number of particles
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`; // Brighter colors
            particle.style.left = `${Math.random() * 20}px`; // Adjusted range for better spread
            particle.style.top = `${Math.random() * 20}px`; // Adjusted range for better spread
            
            // Set particle animation properties
            particle.style.setProperty('--tx', `${Math.random() * 300 - 150}px`); // Increased spread
            particle.style.setProperty('--ty', `${Math.random() * 300 - 150}px`); // Increased spread
            particle.style.animation = `particleBurst 1s forwards`;
            
            particleContainer.appendChild(particle);
        }
        
        // Remove particle container after animation
        setTimeout(() => {
            document.body.removeChild(particleContainer);
        }, 1000); // Match the duration with the animation time
    }, 300); // Delay for burst image to show before particle effect starts

    // Hide balloon after burst
    setTimeout(() => {
        balloon.style.display = 'none';
        balloon.classList.remove('float');
    }, 300); // Match this duration with the burst image display
}
