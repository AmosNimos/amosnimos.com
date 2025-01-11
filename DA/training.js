// Start the training for a skill
function startTraining(skillID) {
    playNotificationSound(2);  // Play the sound when level-up is achieved
    const trainButton = document.getElementById(`train-btn-${skillID}`);
    const castButton = document.getElementById(`cast-btn-${skillID}`);
    if (trainButton.disabled) return; // Prevent starting training if already completed
    if (castButton.disabled) return; // Prevent starting training if already completed

    skillTrainingActive[skillID] = true;
    trainButton.disabled = true; // Disable the button during training
    castButton.disabled = true; // Disable the button during training
    skillAction[skillID] = "Training";

    // Start cooldown for the skill
    const skillHeader = document.getElementById(`head-${skillID}`);
    const skillParent = skillHeader.closest('.skill');
    skillParent.classList.add('trainingDelay');

    const interval = setInterval(() => {
        if (!skillTrainingActive[skillID]) {
            clearInterval(interval);
            return;
        }

        skillProgress[skillID] += ascension_level / 10; // Increase progress over time
        updateProgressBar(skillID); // Update the progress bar

        if (skillProgress[skillID] >= skillGoals[skillID]) {
            clearInterval(interval); // Stop training once it reaches 100%
            skillLevels[skillID]++; // Level up the skill

            // Wait a bit to allow progress bar to reach 100% before resetting
            setTimeout(() => {
                // Remove the training fade effect
                skillParent.classList.remove('trainingDelay'); // Remove cooldown class
                skillProgress[skillID] = 0; // Reset progress for next level
                skillGoals[skillID] *= progressDelay;

                // This whole xp handling could be a seperate function
                xp++; // Increase player's XP
                if (xp >= xpGoal) {
                    xp = 0;
                    xpGoal *= 1.6;
                    level++;
                    addNewSkill(); // Automatically add a new skill when level up
                }

                // Update the progress bar and re-enable the training button
                updateProgressBar(skillID); // Reset progress bar after level up
                document.getElementById(`train-btn-${skillID}`).disabled = false; // Re-enable the button
                document.getElementById(`cast-btn-${skillID}`).disabled = false; // Re-enable the button
                skillTrainingActive[skillID] = false;

                // Update skill level display
                const skillNameElement = document.getElementById(`skill-${skillID}-name`);
                skillNameElement.innerText = `${skillNames[skillID]} LV: ${skillLevels[skillID]}`;

                saveSkillsToStorage(); // Save the updated data

                // LEVEL UP!
                playNotificationSound();  // Play the sound when level-up is achieved
                //alert(`Skill [${skillNames[skillID]}] leveled up!`);
                skillNameElement.classList.remove('animate-level');
                void skillNameElement.offsetWidth; // Force reflow
                skillNameElement.classList.add('animate-level');
            }, 100); // Wait 100ms before resetting progress
        }
    }, 100); // Update progress every 100ms
}
