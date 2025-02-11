function startCasting(skillID) {
    const trainButton = document.getElementById(`train-btn-${skillID}`);
    const castButton = document.getElementById(`cast-btn-${skillID}`);

    // Check if the skill is on cooldown or training
    if (trainButton?.disabled || castButton?.disabled) return;

    // Get all enemies
    const enemies = document.querySelectorAll("#enemy-container .skill");

    // Get the last enemy added
    const lastEnemy = enemies[enemies.length - 1];
    if (!lastEnemy) return; // No enemy to attack

    // Dynamically find the health element within the last enemy
    const healthElement = lastEnemy.querySelector(".health-bar");
    if (!healthElement) return;

    // Current health as a percentage
    let currentHealthWidth = parseFloat(healthElement.style.width.replace('%', '')) || 100;

    // Attack value (customize based on skill or level)
    const attackValue = 10; // Example attack value
    const newHealthWidth = Math.max(0, currentHealthWidth - attackValue); // Calculate new width

    // Update the health bar's width and text
    healthElement.style.width = `${newHealthWidth}%`;
    healthElement.innerText = `${Math.round(newHealthWidth)}%`;

    // Check if the enemy is defeated
    if (newHealthWidth <= 0) {
        console.log("Enemy defeated!");
        return;
    }

    if (!skillTrainingActive[skillID]) {
        attackLastEnemy(skillID);
    }

    // Add cooldown effect to the skill header
    const skillHeader = document.getElementById(`head-${skillID}`);
    if (skillHeader) {
        const skillParent = skillHeader.closest('.skill');
        if (skillParent) {
            skillParent.classList.add('coolDown');
        }
    }

    // Set skill action and disable buttons
    skillAction[skillID] = "Casting";
    skillTrainingActive[skillID] = true;
    castButton.disabled = true;
    trainButton.disabled = true;

    // Progress and cooldown logic
    const interval = setInterval(() => {
        if (skillProgress[skillID] >= skillGoals[skillID]) {
            clearInterval(interval);

            // Reset cooldown after casting
            setTimeout(() => {
                skillTrainingActive[skillID] = false;
                skillProgress[skillID] = 0;
                updateProgressBar(skillID);
                castButton.disabled = false;
                trainButton.disabled = false;

                if (skillHeader) {
                    const skillParent = skillHeader.closest('.skill');
                    skillParent?.classList.remove('coolDown');
                }

                // Increase player's XP and check for level up
                xp++;
                if (xp >= xpGoal) {
                    xp = 0;
                    xpGoal *= 1.6;
                    level++;
                    addNewSkill();
                }
            }, 100); // Cooldown duration
        } else {
            skillProgress[skillID] += ascension_level / 10;
            updateProgressBar(skillID);
        }
    }, 100); // Update every 100ms
}


// Function to attack the last enemy
function attackLastEnemy(skillID) {
    // Get all the enemies in the container
    const enemies = document.querySelectorAll("#enemy-container .skill");
    // Get the last enemy
    const lastEnemy = enemies[enemies.length - 1];
    lastEnemy.classList.remove('damage-overlay');
    void lastEnemy.offsetWidth; // Force reflow
    lastEnemy.classList.add('damage-overlay');

    sprite_index=Math.floor(Math.random() * 20) + 1;
    const spriteName = `attack${sprite_index}.png`; // Interpolating the variable
    animation(spriteName, 'attack-animation');

    //animation('attack${sprite_index}.png', 'attack-animation');

    //lastEnemy.classList.add('shake');

    // Remove the class after the animation duration (0.4s)
    //setTimeout(() => {
    //    lastEnemy.classList.remove('damage-overlay');
    //}, 400);

    // Get the enemy's health element
    const healthElement = lastEnemy.querySelector(`#enemy-${enemyID}-health`);

    // If the last enemy exists, apply damage
    if (lastEnemy && healthElement) {
        playNotificationSound(4);
        // Apply the skill damage (subtract from health)
        let currentHealth = parseInt(healthElement.style.width) || 100; // Assuming full health is 100
        // Apply Damages to enemy
        damage_value=skillLevels[skillID]*(skillID+1)
        currentHealth -= damage_value;
        displayDamage(damage_value,enemyID);
        

        // Update health bar (ensure it doesn't go below 0)
        currentHealth = Math.max(0, currentHealth);
        healthElement.style.width = `${currentHealth}%`;

        // Update the text inside the progress bar with the remaining health percentage
        healthElement.innerHTML = `${currentHealth}%`;

        // Update the health text or other UI elements here
        attack_result=`Attacked ${lastEnemy.querySelector(`#enemy-${enemyID}-name`).innerText}. Remaining HP: ${currentHealth}%`
        //showNotification(attack_result);

        // Optional: Check if enemy is dead
        if (currentHealth === 0) {
            // Enemy Defeated
            // Handle enemy death, e.g., remove enemy or show a message
            playNotificationSound();
            lastEnemy.classList.add('fade-out');

            /// changing gold value should be it's own function and should also update the UI
            // Should also notify the player
            let enemy_level=100;
            gold+=enemy_level;
            showNotification(enemy_level+" Gold acquire!")
            document.getElementById('player_info').innerHTML = `Name: ${playerName} | Class: ${titles[ascension_level]} | Level: ${level} | Gold: ${gold}`;
            // After the fade-out animation completes, remove the enemy from the DOM
            setTimeout(() => {
                lastEnemy.remove();
            }, 2000);
            console.log(`${lastEnemy.querySelector(`#enemy-${enemyID}-name`).innerText} is defeated.`);
        }
    }
}

function displayDamage(damageAmount, enemyID) {
    // Find the container where damage elements will be appended
    const damageContainer = document.getElementById('damages'); // This should be a container that holds all damage elements

    // Create a new damage element
    const newDamageElement = document.createElement('div');
    newDamageElement.classList.add('damage'); // Add a class for styling and animation
    // We inflate the value to make it seem more impressive.
    newDamageElement.textContent = `-${damageAmount*100}`;

    // Append the new damage element to the container
    damageContainer.appendChild(newDamageElement);

    // Add animation class to trigger the animation
    newDamageElement.classList.add('show-damage');

    // Hide and remove the damage element after the animation duration
    setTimeout(() => {
        newDamageElement.classList.remove('show-damage');
        damageContainer.removeChild(newDamageElement); // Remove the element after animation
    }, 1000); // Duration of the animation (2 seconds)
}
