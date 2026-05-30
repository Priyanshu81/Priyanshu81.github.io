let screen1;
let screen2;
let screen3;
let assignmentButton;
let backButton;

let currentScreen = 1;
let isAnimating = false; // Prevents glitching if the user scrolls multiple times quickly

const originalBackground = 'linear-gradient(135deg, #a8d8ff 0%, #ffcc99 100%)';
const plainBackground = '#ffffff';

function toggleBackground() {
    if (!screen1) return;
    if (screen1.style.background === originalBackground) {
        screen1.style.background = plainBackground;
        console.log('Background reverted to plain white');
    } else {
        screen1.style.background = originalBackground;
        console.log('Background restored to gradient');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    screen1 = document.getElementById('screen-1');
    screen2 = document.getElementById('screen-2');
    screen3 = document.getElementById('screen-3');
    assignmentButton = document.getElementById('assignment-1-btn');
    backButton = document.getElementById('back-to-home');

    window.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
            event.preventDefault();
            toggleBackground();
        }
    });

    if (assignmentButton) {
        assignmentButton.addEventListener('click', () => {
            if (isAnimating) return;
            transitionToScreen(3);
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            if (isAnimating) return;
            transitionToScreen(1);
        });
    }

    window.addEventListener('wheel', (event) => {
        if (isAnimating) return;

        // event.deltaY represents the scroll direction/amount
        // > 50 means scrolling down
        if (event.deltaY > 50 && currentScreen === 1) {
            transitionToScreen(2);
        }
        // < -50 means scrolling up
        else if (event.deltaY < -50 && (currentScreen === 2 || currentScreen === 3)) {
            transitionToScreen(1);
        }
    });

    let touchStartY = 0;
    window.addEventListener('touchstart', (event) => {
        touchStartY = event.changedTouches[0].screenY;
    });

    window.addEventListener('touchend', (event) => {
        if (isAnimating) return;
        let touchEndY = event.changedTouches[0].screenY;

        // Swipe Up (Equivalent to scrolling down)
        if (touchStartY - touchEndY > 50 && currentScreen === 1) {
            transitionToScreen(2);
        }
        // Swipe Down (Equivalent to scrolling up)
        else if (touchEndY - touchStartY > 50 && (currentScreen === 2 || currentScreen === 3)) {
            transitionToScreen(1);
        }
    });
});


// The function that swaps the screens
function transitionToScreen(targetScreen) {
    isAnimating = true;
    
    if (targetScreen === 2) {
        // Hide Screen 1, Show Screen 2
        screen1.classList.remove('active');
        screen1.classList.add('slide-up');
        
        screen2.classList.add('active');
        currentScreen = 2;
    } else if (targetScreen === 3) {
        // Hide Screen 1, Show Screen 3
        screen1.classList.remove('active');
        screen1.classList.add('slide-up');
        screen2.classList.remove('active');
        
        screen3.classList.add('active');
        currentScreen = 3;
    } else {
        // Hide Screen 2 and Screen 3, Show Screen 1
        screen2.classList.remove('active');
        screen3.classList.remove('active');
        
        screen1.classList.remove('slide-up');
        screen1.classList.add('active');
        currentScreen = 1;
    }

    // Unlock scrolling after 800ms (matches the CSS transition duration)
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}