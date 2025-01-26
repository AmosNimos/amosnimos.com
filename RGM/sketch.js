let Size = 0;
let Cursor = [0, 0];
let Target = [2, 2];
let fx = 1;
let Start = false;
let DelayTime = 1;
let RoleTime = 0;
let clickSound, vicSound, losSound;
let spinMomentum = 0;
let money = 0;
let textScale = 65;
let win = false;
let looserAim = 9;
let maxAim = 10, minAim = 7;
let luck = true;
let prize = 20;
let winRate = 1;
let awin = 3;

//Setup the canvas and stuff.
function preload() {
  clickSound = loadSound('click.wav');
  vicSound = loadSound('victory.mp3');
  losSound = loadSound('loose2.wav');
  logo = loadImage('GAME.png');
}

// Initialize the game environment.
function setup() {
  pixelDensity(displayDensity());
  createCanvas(displayWidth, displayHeight);
  frameRate(30);

  win = round(random(1));
  looserAim = random(minAim, maxAim);

  Size = (width + height) / 17;
  strokeWeight(Size / 16);
  rectMode(CENTER);

  background(0);
  imageMode(CENTER);
  image(logo, width / 2, (height / 2) - (width / 10), width * 2, width);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textScale = Size / 2;
  textSize(textScale / 2);
  text("[CLICK TO START]", width / 2, height / 2 + (height / 5));
}

// Draw everything.
function draw() {
  if (fx > 1) {
    fx -= 0.1;
    draw_update();
  }

  if (Start === true && DelayTime <= 1) {
    roll();
    draw_update();
  } else if (Start === true && DelayTime >= 0) {
    DelayTime -= 1;
  }

  if (spinMomentum > 0) {
    spinMomentum -= 1;
    draw_update();
  }
}

// Update the visual display of the game.
function draw_update() {
  background(0);

  if (spinMomentum <= 0) {
    fill(255);
    noStroke();
  } else {
    fill(255);
    stroke(round(random(1)) * 255, 0, 0);
  }

  textSize(textScale + fx * 10);
  textFont('Helvetica');
  text(money + "$", 2 * Size * 1.5, Size / 2);

  textSize(round(textScale / 2) + fx * 10);
  textFont('Times New Roman');
  text("PRIZE: " + prize + "$", 2 * Size * 1.5, (3 * Size * 1.5) + Size);

  grid();
}

// Calculate and render the grid for the game.
function grid() {
  stroke(255);

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (x === Cursor[0] && y === Cursor[1] && (Start || spinMomentum > 0)) {
        if (x !== Target[0] || y !== Target[1]) {
          fill(255);
          rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size / fx, Size / fx, 5);
        } else {
          fill(255);
          rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size / 2, Size / 2, 5);
        }
      } else if (x === Cursor[0] && y === Cursor[1]) {
        noFill();
        rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size / 2, Size / 2, 5);
      }

      if (x === Target[0] && y === Target[1]) {
        stroke(255, 0, 0);
        noFill();
        rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size / 2, Size / 2, 5);
      }

      if (spinMomentum <= 0) {
        noFill();
        stroke(255);
        rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size, Size, 5);
      } else {
        fill(round(random(1)) * 255, 0, 0);
        stroke(255);
        rect(Size * 1.5 + x * Size * 1.5, Size * 1.5 + y * Size * 1.5, Size, Size, 5);
      }
    }
  }
}

// Event handler for mouse press.
function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  fullscreen(true);
  if (!Start && spinMomentum <= 0) {
    fx += 0.5;
    Start = true;
  }
}
