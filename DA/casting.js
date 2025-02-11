function updateEnemy(){
    // Update the enemyID for the next enemy
    lastEnemy = enemies[enemies.length - 1];
    if (!lastEnemy) {
        console.log("No enemies left to attack!");
        return;
    }

    enemyID = lastEnemy.enemyID;
    console.log("Attempting to activate enemy ${enemyID}");
    const lastEnemyElement = document.querySelector(`#enemy-container #enemy-${enemyID}`);

    // Remove the 'faded' class from the parent div
    if (lastEnemyElement) {
        const parentDiv = lastEnemyElement.closest('.skill'); // Get the parent div with class 'skill'
        if (parentDiv) {
            parentDiv.classList.remove('faded'); // Remove the 'faded' class

            // Reload the 'animate' class to restart the animation
            parentDiv.classList.remove('animate');
            void parentDiv.offsetWidth; // Trigger reflow to reset the animation
            parentDiv.classList.add('animate');
        }
    }
}

// Function to display damage
function displayDamage(damageAmount, enemyID) {
    const healthCol = document.querySelector(`#enemy-${enemyID}-health`).closest('.health-col');
    if (!healthCol) {
        console.error(`Health column for enemy ${enemyID} not found.`);
        return;
    }

    const damageContainer = healthCol.querySelector(`#\\3${enemyID}-damages`);
    if (!damageContainer) {
        console.error(`Damage container for enemy ${enemyID} not found.`);
        return;
    }
        
    playNotificationSound(4);  // Play the sound when level-up is achieved
    saveSkillsToStorage();
    const newDamageElement = document.createElement('div');
    newDamageElement.classList.add('damage');
    newDamageElement.textContent = `-${damageAmount * 100}`;

    damageContainer.appendChild(newDamageElement);
    newDamageElement.classList.add('show-damage');

    setTimeout(() => {
        newDamageElement.classList.remove('show-damage');
        damageContainer.removeChild(newDamageElement); 
    }, 1000); // Duration of animation
}

// Function to attack the last enemy
function attackLastEnemy(skillID) {
    let lastEnemy = enemies[enemies.length - 1];
    if (!lastEnemy) {
        console.log("No enemies left to attack!");
        return;
    }
    let enemyID = lastEnemy.enemyID;

    //// NOTE: (Make the enemy flash on damage)
    // Get all the enemies in the container
    //const enemies = document.querySelectorAll("#enemy-container .skill");
    //const lastEnemy = enemies[enemies.length - 1];
    //lastEnemy.classList.remove('damage-overlay');
    //void lastEnemy.offsetWidth; // Force reflow
    //lastEnemy.classList.add('damage-overlay');
    const debug_damage=2;
    const damageValue = skillLevels[skillID] * (skillID + 1) * 2 * debug_damage; // Calculate damage based on skill

    // Animation
    sprite_index=Math.floor(Math.random() * 20) + 1;
    const spriteName = `attack${sprite_index}.png`; // Interpolating the variable
    animation(spriteName, 'attack-animation', 10);


    // Apply damage logic
    //let currentHealth = window.enemyHp[enemyID] || lastEnemy.current_hp;
    let currentHealth = lastEnemy.current_hp;
    currentHealth -= damageValue;
    currentHealth = Math.max(0, currentHealth); // Ensure health doesn't go below 0
    //window.enemyHp[enemyID] = currentHealth;
    lastEnemy.current_hp = currentHealth;

    // Update health bar
    const enemyContainer = document.getElementById('enemy-container');
    const healthElement = enemyContainer.querySelector(`#enemy-${enemyID}-health`);
    if (healthElement) {
        const healthPercentage = (currentHealth / lastEnemy.max_hp) * 100;
        healthElement.style.width = `${healthPercentage}%`; // Update health bar width
        //healthElement.innerHTML = `${healthPercentage.toFixed(0)}`; // Update health percentage text
        healthElement.innerHTML = `${Math.round(currentHealth * 100)} / ${Math.round(lastEnemy.max_hp * 100)}`; // Update health bar text to show scaled integer values
    }

    // Show damage animation
    displayDamage(damageValue, enemyID);

    // Handle enemy defeat
    if (currentHealth === 0) {
        console.log(`${lastEnemy.name} is defeated.`);
        let lastEnemyElement = document.querySelector(`#enemy-container #enemy-${enemyID}`);
        if (lastEnemyElement) {
            
            const skillParent = lastEnemyElement.closest('.skill');
            skillParent.classList.add('fade-out');
            setTimeout(() => {
                let reward = level * Math.floor(Math.random() * (90 - 10 + 1)) + 10;
                gold += reward;
                showNotification(lastEnemy.name + " was defeated! +" + String(reward) + "G");
                updatePlayerInfo()
                lastEnemyElement?.remove();
                enemies.pop(); // Remove the defeated enemy
                updateEnemy()            
                addEnemy(level*2);
                //gold+=level*10;
            }, 500);
        }
    }
}

// Example of casting a skill
function startCasting(skillID) {
    const trainButton = document.getElementById(`train-btn-${skillID}`);
    const castButton = document.getElementById(`cast-btn-${skillID}`);
    if (trainButton.disabled || castButton.disabled) return;

    const lastEnemy = enemies[enemies.length - 1];
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
        attackLastEnemy(skillID); // Apply damage on skill cast
    }

    // Start cooldown for the skill
    const skillHeader = document.getElementById(`head-${skillID}`);
    const skillParent = skillHeader.closest('.skill');
    skillParent.classList.add('coolDown');

    skillAction[skillID] = "Casting"; // Set skill action to "Casting"
    skillTrainingActive[skillID] = true; 
    castButton.disabled = true; // Disable cast button during casting
    trainButton.disabled = true; 

    // Show damage overlay
    const enemyElement = document.querySelector(`#enemy-${enemyID}`);
    if (enemyElement) {
        enemyElement.classList.remove('damage-overlay');
        void enemyElement.offsetWidth; // Trigger reflow to reset the animation
        enemyElement.classList.add('damage-overlay');
    }

    const interval = setInterval(() => {
        if (skillProgress[skillID] >= skillGoals[skillID]) {
            clearInterval(interval);
            setTimeout(() => {

                enemyElement.classList.remove('damage-overlay');
                skillTrainingActive[skillID] = false; // End of cooldown
                skillProgress[skillID] = 0; // Reset progress bar
                updateProgressBar(skillID);
                castButton.disabled = false; // Re-enable cast button after cooldown
                trainButton.disabled = false;
                playNotificationSound(3); 

                skillParent.classList.remove('coolDown'); // Remove cooldown class

                // Handle XP gain
                xp++;
                if (xp >= xpGoal) {
                    xp = 0;
                    xpGoal *= 1.6;
                    level++;
                    addNewSkill(); 
                }
            }, 100); 
        } else {
            skillProgress[skillID] += ascension_level / 10; 
            updateProgressBar(skillID);
        }
    }, 100); 
}

// Only execute boost on skills currently in training
function executeCastingBoost() {
    if (gold < cost_of_boost) return; // Not enough gold, do nothing

    let boosted = false; // Track if any skills were boosted

    for (let skillID = 0; skillID < skillLevels.length; skillID++) {
        if (skillTrainingActive[skillID] && skillAction[skillID] === "Casting") { // Only boost actively training skills
            skillTrainingActive[skillID] = false;
            skillProgress[skillID] = 0; // Reset progress to 0
            skillLevels[skillID]++; // Level up the skill
            skillGoals[skillID] *= progressDelay; // Update skill goal
            boosted = true;

            // Update the progress bar UI
            const progressBar = document.getElementById(`skill-${skillID}`);
            if (progressBar) {
                progressBar.style.width = "0%";
                progressBar.textContent = "0%";

                const parentElement = progressBar.closest(".skill"); // Get parent element
                if (parentElement) {
                    parentElement.classList.remove("overdrive_animation"); // Remove existing animation
                    void parentElement.offsetWidth; // Force reflow
                    parentElement.classList.add("overdrive_animation"); // Reapply animation
                    parentElement.classList.remove("coolDown"); // Remove cooldown effect
                    document.querySelectorAll(".overdrive_animation").forEach(element => {
                        element.addEventListener("animationend", () => {
                            element.classList.remove("overdrive_animation");
                        });
                    });
                }
            }

            // Update skill level display
            const skillNameElement = document.getElementById(`skill-${skillID}-name`);
            if (skillNameElement) {
                skillNameElement.innerText = `${skillNames[skillID]} LV: ${skillLevels[skillID]}`;
            }

            // Re-enable training and casting buttons
            document.getElementById(`train-btn-${skillID}`)?.removeAttribute("disabled");
            document.getElementById(`cast-btn-${skillID}`)?.removeAttribute("disabled");
        }
    }

    if (boosted) {
        gold -= cost_of_boost; // Deduct gold only if at least one skill was boosted
        updatePlayerInfo();
        saveSkillsToStorage(); // Save without reloading

        triggerScreenFlash(); // Flash screen to indicate boost
        playNotificationSound(6); // Play success sound
    } else {
        showNotification("Warning: No skills in training to Overdrive", 5);
        playNotificationSound(5); // Play error sound
    }
}
