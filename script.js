const spoon = document.getElementById('draggable-spoon');
let isDragging = false;
let offsetX, offsetY;
let rotation = 0; // Initialize the rotation value
let velocityY = 0; // Vertical velocity for falling
let gravity = 0.5; // Gravity force
let falling = true; // Start in falling state
let isPickedUp = false; // Track if the spoon is picked up

// Function to get random position within the viewport
function getRandomPosition() {
    const spoonWidth = spoon.offsetWidth; // Get spoon width
    const spoonHeight = spoon.offsetHeight; // Get spoon height
    const maxX = window.innerWidth - spoonWidth; // Maximum left position
    const maxY = window.innerHeight - spoonHeight; // Maximum top position

    // Generate random positions
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
}

// Set the initial position of the spoon to a random position
const { x, y } = getRandomPosition();
spoon.style.top = `${y}px`;
spoon.style.left = `${x}px`;

// Function to start dragging
function startDragging(e) {
    isDragging = true;
    falling = false; // Stop falling while dragging
    velocityY = 0; // Reset velocity

    // Get the touch or mouse position
    const posX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const posY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    offsetX = posX - spoon.offsetLeft;
    offsetY = posY - spoon.offsetTop;
    spoon.style.cursor = 'grabbing';
    isPickedUp = true; // Mark spoon as picked up
}

// Function to stop dragging
function stopDragging() {
    isDragging = false;
    spoon.style.cursor = 'grab';
    falling = true; // Start falling when clicked again
    isPickedUp = false; // Mark spoon as dropped
}

// Function to handle dragging
function drag(e) {
    if (isDragging) {
        // Get the touch or mouse position
        const posX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const posY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        spoon.style.left = `${posX - offsetX}px`;
        spoon.style.top = `${posY - offsetY}px`;
    }
}

// Add event listeners for mouse and touch events
spoon.addEventListener('click', (e) => {
    if (!isPickedUp) {
        startDragging(e);
    } else {
        stopDragging();
    }
});

document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDragging);

// Touch events
spoon.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    startDragging(e);
});

document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDragging);

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
