// GLOBAL VARIABLES

let level = 1;
let xp = 0;
let xpGoal = 2;
let gold = 0;

// Global variable to track if sounds are allowed
let soundEnabled = true;
let progressDelay = 2;
let ascension_level = 1;
let enemyID=1

// Skills
let skillLevels = [];
let skillProgress = [];
let skillGoals = [];
let skillNames = [];
let skillActive = [];
let skillTrainingActive = [];  // To track if training is active for a skill
let skillIcons = [];
let skillHueShifts = [];
let skillAction=[]; 

function reset_skills() {
            skillAction = [];
            skillLevels = [];
            skillProgress = [];
            skillGoals = [];
            skillNames = [];
            skillTrainingActive = [];  // To track if training is active for a skill
            skillIcons = [];
            skillHueShifts = [];
            if( level > ascension_level){
                // Increase player progress speed
                ascension_level+=level;
            }
            level = 1;
            xp = 0;
            xpGoal = 2;
            gloal=0;
            soundEnabled = true;
}
