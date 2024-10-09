const spoon = document.getElementById('draggable-spoon');
let isDragging = false;
let offsetX, offsetY;
let rotation = 0; // Initialize the rotation value
let velocityY = 0; // Vertical velocity for falling
let gravity = 0.5; // Gravity force
let falling = false; // Falling state

spoon.addEventListener('mousedown', (e) => {
    isDragging = true;
    falling = false; // Stop falling while dragging
    velocityY = 0; // Reset velocity
    offsetX = e.clientX - spoon.offsetLeft;
    offsetY = e.clientY - spoon.offsetTop;
    spoon.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        spoon.style.left = `${e.clientX - offsetX}px`;
        spoon.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    spoon.style.cursor = 'grab';
    falling = true; // Start falling after mouse release
});

// Add mouse wheel event listener for rotation
document.addEventListener('wheel', (e) => {
    rotation += e.deltaY > 0 ? 15 : -15; // Adjust rotation speed
    spoon.style.transform = `rotate(${rotation}deg)`;
});

// Simulate falling with gravity
function fall() {
    if (falling) {
        let spoonTop = spoon.offsetTop;
        velocityY += gravity; // Apply gravity to the velocity
        spoonTop += velocityY; // Update the spoon's position based on velocity

        // Prevent spoon from falling off the screen
        if (spoonTop + spoon.offsetHeight > window.innerHeight) {
            spoonTop = window.innerHeight - spoon.offsetHeight; // Stop at the bottom
            velocityY = 0; // Stop falling when it hits the bottom
        }

        spoon.style.top = `${spoonTop}px`;
    }
}

// Update the spoon position every 20 milliseconds to simulate smooth motion
setInterval(fall, 20);
