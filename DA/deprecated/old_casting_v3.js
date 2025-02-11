function displayDamage(damageAmount, enemyID) {
    // Find the container where damage elements will be appended
    const damageContainer = document.getElementById('damages'); // This should be a container that holds all damage elements

    // Create a new damage element
    const newDamageElement = document.createElement('div');
    newDamageElement.classList.add('damage'); // Add a class for styling and animation
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

// Function to attack the last enemy
function attackLastEnemy(skillID) {
    // Get the last enemy from the array
    const lastEnemy = enemies[enemies.length - 1]; // Correct way to get the last element
    if (!lastEnemy) {
        console.log("No enemies left to attack!");
        return;
    }
    
    const enemyID = lastEnemy.enemyID;

    // Handle DOM animations
    const lastEnemyElement = document.querySelector(`#enemy-container #enemy-${enemyID}`);
    if (lastEnemyElement) {
        lastEnemyElement.classList.remove('damage-overlay');
        void lastEnemyElement.offsetWidth; // Force reflow
        lastEnemyElement.classList.add('damage-overlay');
    }

    // Apply damage logic
    let currentHealth = window.enemyHp[enemyID] || lastEnemy.current_hp;
    const damageValue = skillLevels[skillID] * (skillID + 1);
    lastEnemy.current_hp-=damage

    // Subtract damage and update the health
    currentHealth = Math.max(0, currentHealth - damageValue);
    window.enemyHp[enemyID] = currentHealth;
    displayDamage(damageValue, enemyID);

    // Update the health bar in DOM if exists
    const enemyContainer = document.getElementById('enemy-container');
    const healthElement = enemyContainer.querySelector(`#enemy-${enemyID}-health`);    
    console.log(document.getElementById("enemy-container").innerHTML);

    
    if (healthElement) {
        healthElement.style.width = `${currentHealth}%`;
        healthElement.innerHTML = `${currentHealth}%`;
    }

    // Handle defeat logic
    if (currentHealth === 0) {
        console.log(`${lastEnemy.name} is defeated.`);
        lastEnemyElement?.classList.add('fade-out');
        setTimeout(() => {
            lastEnemyElement?.remove();
            enemies.pop(); // Remove the enemy from the array
        }, 2000);
    }
}


// Example of casting a skill
function startCasting(skillID) {


    const trainButton = document.getElementById(`train-btn-${skillID}`);
    const castButton = document.getElementById(`cast-btn-${skillID}`);
    // Check if the skill is not on cooldown or training
    if (trainButton.disabled) return; // Prevent starting training if already completed
    if (castButton.disabled) return; // Prevent starting casting if already completed

    // Get the last enemy from the array
    const lastEnemy = enemies[enemies.length - 1]; // Assuming `enemies` is the array of enemy objects
    if (!lastEnemy) {
        console.error('No enemies left to attack!');
        return;
    }
    const enemyID = lastEnemy.enemyID;

    const healthElement = document.querySelector(`#enemy-${enemyID}-health`);
    
    if (!healthElement) {
        console.error(`Health element for #enemy-${enemyID}-health not found.`);
        return;
    }

    let currentHealth = parseFloat(healthElement.innerHTML.replace('%', ''));
    if (currentHealth <= 0) return; // Enemy is already dead

    if (!skillTrainingActive[skillID]) {
        attackLastEnemy(skillID);
    }

    // Select the element by ID
    const skillHeader = document.getElementById(`head-${skillID}`);
    // Find the closest parent with the class 'skill' and add the 'cooldown' class
    if (skillHeader) {
        const skillParent = skillHeader.closest('.skill');
        if (skillParent) {
            skillParent.classList.add('coolDown');
        }
    }

    // Attack the last enemy with the selected skill
    skillAction[skillID] = "Casting";

    // Cooldown (similar to training)
    skillTrainingActive[skillID] = true;
    castButton.disabled = true; // Disable the cast button during casting
    trainButton.disabled = true; // Disable the cast button during casting

    const interval = setInterval(() => {
        if (skillProgress[skillID] >= skillGoals[skillID]) {
            clearInterval(interval); // Stop casting once it reaches 100%
            setTimeout(() => {
                skillTrainingActive[skillID] = false; // Cooldown ends, allow next skill usage
                // Handle the cooldown after casting (no level up, just reset progress bar)
                skillProgress[skillID] = 0; // Reset progress after casting
                updateProgressBar(skillID); // Call to update the skill progress bar
                castButton.disabled = false; // Re-enable cast button after cooldown
                trainButton.disabled = false; // Re-enable cast button after cooldown
                playNotificationSound(3);  // Play the sound when level-up is achieved
                //Attempt at removing the cooldown effect
                const skillParent = skillHeader.closest('.skill');
                skillParent.classList.remove('coolDown');

                // This whole xp handling could be a separate function
                xp++; // Increase player's XP
                if (xp >= xpGoal) {
                    xp = 0;
                    xpGoal *= 1.6;
                    level++;
                    addNewSkill(); // Automatically add a new skill when level up
                }

            }, 100); // Example cooldown of 100 ms
        } else {
            skillProgress[skillID] += ascension_level / 10; // Increase progress over time
            updateProgressBar(skillID); // Update progress bar
        }
    }, 100); // Update progress every 100ms
}
