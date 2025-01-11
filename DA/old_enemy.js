let enemies = []

// Function to add a new enemy
function addEnemy(name, level, current_hp, max_hp) {
    // Generate a unique enemy ID based on existing enemies
    const enemyID = enemies.length + 1;
    const newEnemy = {
        enemyID,
        name,
        level,
        current_hp,
        max_hp, // Keeping max_hp for later reference
    };
    enemies.push(newEnemy);

    // Initialize the health array if necessary
    if (!window.enemyHp) window.enemyHp = [];
    window.enemyHp[enemyID] = current_hp;

    // Now call the render function to update the DOM
    renderEnemies();
}

// Function to render enemies and their DOM elements
function renderEnemies() {
    const enemyContainer = document.getElementById("enemy-container");
    enemyContainer.innerHTML = ""; // Clear the container before re-rendering

    // Iterate through the enemies array and create DOM elements for each enemy
    enemies.forEach(enemy => {
        const newEnemyElement = document.createElement("div");
        newEnemyElement.classList.add("skill", "animate");
        newEnemyElement.innerHTML = `
            <div class="SkillHeader faded">
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

// Example usage
addEnemy("Goblin", 5, 120, 120);
addEnemy("Orc", 10, 300, 300);
