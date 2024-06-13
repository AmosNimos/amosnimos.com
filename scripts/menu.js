// script.js

// Listen for both key presses and mouse clicks
document.addEventListener('click', handleClick);

document.addEventListener('DOMContentLoaded', function() {
    document.body.focus(); // Focus on the document body when the page loads
});

//const dialogueLines = [
//    { character: 'Protagonist', image: 'protagonist.jpg', text: "Welcome to the JRPG!" },
//    { character: 'Protagonist', image: 'protagonist.jpg', text: "Press spacebar to instantly display the complete line." },
//    { character: 'Protagonist', image: 'protagonist.jpg', text: "Press enter to continue to the next line." }
//];

// Array to store dialogue lines
const dialogueLines = [];

// Function to populate the dialogueLines array with dialogue from the HTML
function populateDialogueLines() {
    const dialogueContainer = document.getElementById('dialogue');
    const characterImage = dialogueContainer.getAttribute('data-character');
    const chName = dialogueContainer.querySelector('#characterName').textContent;
    const dialogueTextElements = dialogueContainer.querySelectorAll('#dialogueText p');

    dialogueTextElements.forEach(function(element) {
        dialogueLines.push({
            character: chName,
            image: characterImage,
            text: element.textContent.trim()
        });
    });

    // Log the populated dialogueLines array
    console.log(dialogueLines);
}

// Call the populateDialogueLines function to populate the array
populateDialogueLines();

const characterImage = document.getElementById('characterImage');
const characterName = document.getElementById('characterName');
const dialogueBox = document.getElementById('dialogueBox');
let currentLine = 0;
let currentCharacter = 0;
let typingSpeed = 75; // in milliseconds
let isTyping = true; // Flag to track whether text is being typed
const cursor = '█'; // Block ASCII character for the cursor

// Preload the typing sound multiple times for overlapping play
const typingSounds = [];
const numberOfSounds = 5; // Number of overlapping sounds allowed
const actionSound = new Audio('sounds/bip_sound_01.ogg'); // Sound for actions like Enter or Spacebar

function preload() {
    for (let i = 0; i < numberOfSounds; i++) {
        typingSounds.push(new Audio('sounds/bip_sound_02.ogg'));
    }
}

// Function to play a typing sound from the preloaded sounds
function playTypingSound() {
    const sound = typingSounds.find(s => s.paused || s.ended);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function typeWriter() {
    // Play a sound when the page loads
    isTyping = true;
    const currentText = dialogueLines[currentLine].text;
    if (currentCharacter < currentText.length) {
        const currentChar = currentText.charAt(currentCharacter);
        dialogueBox.innerHTML = currentText.slice(0, currentCharacter + 1) + cursor;
        if (currentChar.trim() !== "") { // Check if current character is not a space or other symbols
            playTypingSound(); // Play sound for each character
        }
        currentCharacter++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        isTyping = false;
        dialogueBox.innerHTML = currentText + cursor; // Ensure cursor is at the end after typing
        blinkCursor();
    }
}

function blinkCursor() {
    setInterval(() => {
        if (dialogueBox.innerHTML.endsWith(cursor)) {
            dialogueBox.innerHTML = dialogueBox.innerHTML.slice(0, -1) + ' ';
            //dialogueBox.innerHTML ;
        } else {
            //dialogueBox.innerHTML += cursor;
            dialogueBox.innerHTML = dialogueBox.innerHTML.slice(0, -1) + cursor;
        }
    }, 500); // Blink interval in milliseconds
}

function printNextLine() {
    if (!isTyping && currentLine < dialogueLines.length - 1) {
        actionSound.play(); // Play action sound
        currentLine++;
        currentCharacter = 0;
        dialogueBox.innerHTML = '';
        typeWriter();
        updateCharacterInfo();
    } else if (!isTyping) {
        //dialogueBox.innerHTML = 'End of dialogue.';
        onDialogueEnd(); // Call this function to show the menu
    }
}

function updateCharacterInfo() {
    characterName.textContent = dialogueLines[currentLine].character;
    characterImage.src = dialogueLines[currentLine].image;
}

document.addEventListener('keypress', function(event) {
    if (event.key === ' ' && currentCharacter < dialogueLines[currentLine].text.length) {
        // Print the complete line instantly
        dialogueBox.innerHTML = dialogueLines[currentLine].text + cursor;
        currentCharacter = dialogueLines[currentLine].text.length;
        actionSound.play(); // Play action sound
    } else if (event.key === 'Enter') {
        // Print the next line
        printNextLine();
    }
});

function handleClick() {
    if (currentCharacter >= dialogueLines[currentLine].text.length) {
        // Print the next line if the current character is not less than the line's length
        printNextLine();
    }
}

// Function to show the menu once the dialogue ends
function onDialogueEnd() {
    displayMenu();
    dialogueBox.style.display = 'none';
}

const menu = document.getElementById('menu');
const menuItems = menu.querySelectorAll('li');
let currentSelection = 0;

// Function to update the selected menu item
function updateMenuSelection() {
    menuItems.forEach((item, index) => {
        item.classList.toggle('selected', index === currentSelection);
    });
}

// Function to handle keypresses for the menu
function handleMenuKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            playTypingSound(); // Play sound for each character
            //actionSound.play(); // Play action sound
            currentSelection = (currentSelection - 1 + menuItems.length) % menuItems.length;
            updateMenuSelection();
            break;
        case 'ArrowDown':
            playTypingSound(); // Play sound for each character
            //actionSound.play(); // Play action sound
            currentSelection = (currentSelection + 1) % menuItems.length;
            updateMenuSelection();
            break;
        case 'Enter':
            const targetPage = menuItems[currentSelection].getAttribute('data-target');
            window.location.href = targetPage;
            break;
    }
}

// Display the menu and add the event listener for key presses
function displayMenu() {
    document.addEventListener('keydown', handleMenuKeyPress);
    menu.style.display = 'block';
}

// Initialize menu with the first item selected
updateMenuSelection();
// Start typing the first line
preload();
typeWriter();
updateCharacterInfo();
