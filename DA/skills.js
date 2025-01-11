// Function to create a skill element
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


///////////////// --- >>> NEW <<< --- ///////////////////
