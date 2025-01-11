function animation(spriteName, divId) {
    const SPRITE_SIZE = 192; // Width and height of each sprite
    const container = document.getElementById(divId);

    // Create sprite overlay
    const sprite = document.createElement('div');
    sprite.classList.add('sprite');
    sprite.style.backgroundImage = `url('Animations/${spriteName}')`;

    container.appendChild(sprite);

    const spriteImage = new Image();
    spriteImage.src = `Animations/${spriteName}`;

    let currentX = 0;
    let currentY = 0;

    spriteImage.onload = () => {
        const sheetWidth = spriteImage.width;
        const sheetHeight = spriteImage.height;

        sprite.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;

        setInterval(() => {
            // Set the new background position
            sprite.style.backgroundPosition = `-${currentX}px -${currentY}px`;

            // Move to the next frame
            currentX += SPRITE_SIZE;
            if (currentX >= sheetWidth) {
                currentX = 0;
                currentY += SPRITE_SIZE;
                if (currentY >= sheetHeight) {
                    currentY = 0; // Reset to the start
                }
            }
        }, 100); // Adjust timing for speed (100ms = 10fps)
    };
}
