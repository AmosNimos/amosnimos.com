function triggerScreenFlash() {
    if (document.querySelector(".screen_flash")) return; // Prevent multiple flashes

    let flashOverlay = document.createElement("div");
    flashOverlay.classList.add("screen_flash");

    document.body.appendChild(flashOverlay);

    // Remove the flash element after animation ends
    setTimeout(() => {
        flashOverlay.remove();
    }, 1000); // Matches the animation duration
}


function createSkillElement(skillID, skillName, skillLevel, skillProgressValue, skillGoal, skillIcon, hueShift) {
    const newSkill = document.createElement("div");
    newSkill.classList.add("skill");

    newSkill.innerHTML = `
        <div class="SkillHeader" id="head-${skillID}">
            <div class="col">
                <button class="nav-button" id="train-btn-${skillID}" onclick="startTraining(${skillID})">Refine</button>
                <button class="nav-button" id="cast-btn-${skillID}" onclick="startCasting(${skillID})">Cast</button>
            </div>
            <div class="mid">
                <div class="iconBorder">
                    <img class="SkillIcon" src="${skillIcon}" alt="${skillName} icon" style="filter: hue-rotate(${hueShift}deg);">
                </div>
                <h3 id="skill-${skillID}-name">${skillName} LV: ${skillLevel}</h3>
            </div>
            <div class="col">
                <div class="progress-container">
                    <div id="skill-${skillID}" class="progress-bar" style="width: ${Math.round((skillProgressValue / skillGoal) * 100)}%;">${Math.round((skillProgressValue / skillGoal) * 100)}%</div>
                    <div id="damages"></div>
                </div>
            </div>
        </div>
    `;

    return newSkill;
}

// Render skills from the loaded data
function renderSkills() {
    const skillsContainer = document.getElementById("skills-container");
    skillsContainer.innerHTML = ''; // Clear existing skills

    for (let skillID = 0; skillID < skillLevels.length; skillID++) {
        const skillName = skillNames[skillID];
        const skillLevel = skillLevels[skillID];
        const skillGoal = skillGoals[skillID];
        const skillProgressValue = skillProgress[skillID];
        const skillIcon = skillIcons[skillID];
        const hueShift = skillHueShifts[skillID] || 0;

        // Use the createSkillElement function to generate the skilskillsprogression is more than 0 you can l element
        const newSkill = createSkillElement(skillID, skillName, skillLevel, skillProgressValue, skillGoal, skillIcon, hueShift);

        // Append the new skill to the container
        skillsContainer.appendChild(newSkill);

        // Handle training or casting actions
        if (skillProgress[skillID] > 0){
            skillTrainingActive[skillID] = true;
            if (skillAction[skillID] == "Training") {
                skillTrainingActive[skillID] = true;
                startTraining(skillID);
            } else if (skillAction[skillID] == "Casting") {
                skillTrainingActive[skillID] = true;
                startCasting(skillID);
            }
        }
    }
}

// Add new skill
function addNewSkill() {
    const skillID = skillLevels.length;
    let skillName = generateSkillName();
    let attempts = 0;

    // Keep generating a new name if it exists in the list, up to 100 times
    if (Array.isArray(skillNames) && skillNames.length > 0) {
        while (skillNames.includes(skillName) && attempts < 100) {
            skillName = generateSkillName();
            attempts++;
        }
    }
    const skillGoal = 1;

    if (skillID > 0) {
        playNotificationSound();  // Play the sound when level-up is achieved
        showNotification("[" + skillName + "] Acquired!");
        speakNotification(skillName + " Acquired!");
    }

    skillNames[skillID] = skillName;
    skillLevels[skillID] = 1;
    skillGoals[skillID] = skillGoal + skillID;
    skillProgress[skillID] = 0;
    skillAction[skillID] = "None";
    skillTrainingActive[skillID] = false;  // Start with training inactive

    const icon_count = 299;
    const randomIconNumber = String(Math.floor(Math.random() * icon_count + 1)).padStart(3, '0');
    skillIcons[skillID] = iconsDir + randomIconNumber + ".png";

    // Generate random hue shift (between 0 and 360 degrees)
    const randomHueShift = Math.floor(Math.random() * 360);

    // Store the hue shift in skill data
    skillHueShifts[skillID] = randomHueShift;

    // Use the createSkillElement function to generate the new skill element
    const newSkill = createSkillElement(skillID, skillName, skillLevels[skillID], skillProgress[skillID], skillGoals[skillID], skillIcons[skillID], randomHueShift);

    document.getElementById("skills-container").appendChild(newSkill);

    saveSkillsToStorage();
}

let cost_of_boost = 1

function executeBoost() {
    if (gold < cost_of_boost) return; // Do nothing if gold is below cost
    
    let boosted = false; // Track if any skills were boosted
    
    for (let skillID = 0; skillID < skillLevels.length; skillID++) {
        if (skillTrainingActive[skillID]) { // Only boost skills that are actively training
            skillTrainingActive[skillID] = false;
            skillProgress[skillID] = 0; // Reset progress to 0
            skillLevels[skillID]++; // Level up the skill
            skillGoals[skillID] *= progressDelay; // Update skill goal
            boosted = true;
            
            // Update the UI
            const progressBar = document.getElementById(`skill-${skillID}`);
            if (progressBar) {
                progressBar.style.width = "0%";
                progressBar.textContent = "0%";
                //progressBar.classList.remove("overdrive_animation");
                //void progressBar.offsetWidth; // Force reflow
                //progressBar.classList.add("overdrive_animation");
                
                const parentElement = progressBar.closest(".skill"); // Get parent element
                if (parentElement) {
                    parentElement.classList.remove("overdrive_animation"); // Apply animation to parent
                    void parentElement.offsetWidth; // Force reflow
                    parentElement.classList.add("overdrive_animation"); // Apply animation to parent
                    parentElement.classList.remove("trainingDelay"); // Remove cooldown effect
                }
            }
            
            // Update skill level display
            const skillNameElement = document.getElementById(`skill-${skillID}-name`);
            if (skillNameElement) {
                skillNameElement.innerText = `${skillNames[skillID]} LV: ${skillLevels[skillID]}`;
            }
            
            // Re-enable training and casting buttons
            const trainButton = document.getElementById(`train-btn-${skillID}`);
            const castButton = document.getElementById(`cast-btn-${skillID}`);
            if (trainButton) trainButton.disabled = false;
            if (castButton) castButton.disabled = false;
        }
    }
    
    if (boosted) {
        triggerScreenFlash(); // Flash screen when a skill is boosted
        playNotificationSound(6); // Play notification sound only if skills were boosted
        gold -= cost_of_boost; // Reduce gold by cost amount
        updatePlayerInfo();
        saveSkillsToStorage(); // Save changes only, no reloading
    } else {
        showNotification("Warning: No skills to Overdrive", 5);
        playNotificationSound(5); // Play error sound
    }
}
