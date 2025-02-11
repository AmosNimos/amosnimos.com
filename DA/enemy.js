let enemies = []

// Function to add a new enemy
function addEnemy(level=1, current_hp="None", name="None", max_hp="None") {
    // Generate a unique enemy ID based on existing enemies
    const enemyID = enemies.length + 1;
    if (name === "None") {
        let index = level % opponents.length;
        name = opponents[index];    
    }
    if (current_hp=="None"){
        current_hp=level*50;
    }
    if (max_hp=="None"){
        max_hp=current_hp
    }
    const newEnemy = {
        enemyID,
        name,
        level,
        current_hp,
        max_hp, // Keeping max_hp for later reference
    };
    enemies.push(newEnemy);

    // Initialize the global health array if it doesn't exist
    if (!window.enemyHp) {
        window.enemyHp = [];
    }

    // Update the enemy's health
    window.enemyHp[enemyID] = current_hp;

    // Now call the render function to update the DOM
    renderEnemies();
}

// Function to render enemies and their DOM elements
function renderEnemies() {
    const enemyContainer = document.getElementById("enemy-container");
    enemyContainer.innerHTML = ""; // Clear the container before re-rendering

    // Iterate through the enemies array and create DOM elements for each enemy
    enemies.forEach((enemy, index) => {
        const newEnemyElement = document.createElement("div");

        // Add the 'faded' class to all but the most recent enemy
        if (index !== enemies.length - 1) {
            newEnemyElement.classList.add("skill", "animate", "faded"); // Add faded class for previous enemies
        } else {
            newEnemyElement.classList.add("skill", "animate"); // No faded class for the most recent enemy
        }

        newEnemyElement.innerHTML = `
            <div id="enemy-${enemy.enemyID}" class="SkillHeader">
                <div class="mid">
                    <div class="iconBorder">
                        <img class="SkillIcon" src="enemy/${enemy.enemyID}.png" alt="Enemy Image">
                    </div>
                    <h3 id="enemy-${enemy.enemyID}-name">${enemy.name} LV: ${enemy.level}</h3>
                </div>
                <div class="health-col">
                    <div class="progress-container">
                        <div id="enemy-${enemy.enemyID}-health" 
                             class="health-bar" 
                             style="width: ${(enemy.current_hp / enemy.max_hp) * 100}%">
                             ${Math.round(enemy.current_hp * 100)}/${Math.round(enemy.max_hp * 100)}
                        </div>
                        <div id="${enemy.enemyID}-damages"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Append the new enemy element to the container
        enemyContainer.appendChild(newEnemyElement);
    });
}

