const spoon = document.getElementById('draggable-spoon');
let isDragging = false;
let offsetX, offsetY;
let rotation = 0; // Initialize the rotation value

spoon.addEventListener('mousedown', (e) => {
    isDragging = true;
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
});

// Add mouse wheel event listener for rotation
document.addEventListener('wheel', (e) => {
    // Change rotation based on the direction of the scroll
    rotation += e.deltaY > 0 ? 15 : -15; // Adjust rotation speed
    spoon.style.transform = `rotate(${rotation}deg)`;
});
