let jump_train = []
let typejump_train = []

let diff_easy_button = document.getElementById('diff_easy_button')
let diff_medium_button = document.getElementById('diff_medium_button')
let diff_hard_button = document.getElementById('diff_hard_button')
let start_button = document.getElementById('start')
let floor2 = document.getElementById('floor2')

diff_easy_button.style.display = 'none'
diff_medium_button.style.display = 'none'
diff_hard_button.style.display = 'none'
floor2.style.display = 'none'

function difficultyScreen() {
  start_button.style.display = 'none'

  diff_easy_button.style.display = 'inline-block'
  diff_medium_button.style.display = 'inline-block'
  diff_hard_button.style.display = 'inline-block'
}

function BeginGame(diff) {
  diff_easy_button.style.display = 'none'
  diff_medium_button.style.display = 'none'
  diff_hard_button.style.display = 'none'
  floor2.style.display = 'block'

  Program()
  EventHandlers(diff)
}

let prevhigh = 0

let speedmove = 1
let rects = document.getElementById('first').querySelectorAll('svg')
let random = rects[Math.floor(Math.random() * rects.length)]
let moveob = 360

function Program() {
  let jump = false
  let jumpheight = 400

  let floor = document.getElementById('floor')
  let floorpos = 360
  let backlen = 0

  let floor2 = document.getElementById('floor2')
  let floorpos2 = 960
  let frontlen = 0

  speedmove = 1
  let start = false
  let x = true

  let player_jump_timer = 0
  let player_count = null
  let ai_count = null
  let double = 0
  let done = true
  let already = false
  let startops = false

  rects = document.getElementById('first').querySelectorAll('svg')
  random = rects[Math.floor(Math.random() * rects.length)]
  moveob = 360
  let randnr1 = Math.floor((Math.random() * 500) + 100)

  let randomnosvg = random.querySelector('rect')
  let style = window.getComputedStyle(random)
  let toprand = style.getPropertyValue('top')
  let backlenrand = randomnosvg.getAttribute('width')
  let frontlenrand = 0

  let score = document.getElementById('score')
  let scorenr = 0
  let zero = '0'
  let startscore = false

  let data = []
  let choices = [25, 35]
  let listnr = []
  let dict = {}
  let zerotwols = [0, 2.5]
  let zerotwo = zerotwols[Math.floor(Math.random() * zerotwols.length)]
  let colors = ['255,0,0', '0,255,0', '0,0,255', '165, 3, 252', '252, 3, 240', '252, 144, 3']
  let randcolor = colors[Math.floor(Math.random() * colors.length)]

  let lsdinosdown = []
  let lsdinosalive = []
  let obstaclejumps = []
  let numberdown = 0
  let highscore = document.getElementById('highscore')
  let tf = false
  let details = []
  let optionsls = [1, 2, 3]
  let rounded = Math.round(speedmove * 10 ) / 10

  let dino = document.getElementById('dino')
  let dino_ai = document.getElementById('dino_ai')
  let both_dinos = [dino, dino_ai]
  let dino_ai_ls = [dino_ai]

  both_dinos.forEach((item, i) => {
  item.style.left = '420px'
  item.style.top = '400px'
  randcolor = colors[Math.floor(Math.random() * colors.length)]
  item.style.fill = 'rgb(' + randcolor + ')'
  item.style.clip = 'inherit'

  if (item.tagName != 'rect') {
    lsdinosalive.push(i)
  }
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'none'
)

async function CheckCollision(item, i) {
  randomnosvg = random.querySelector('rect')
  style = window.getComputedStyle(random)
  toprand = style.getPropertyValue('top')
  rect_dino = {x: 420, y: parseInt(item.style.top), width: 30, height: 55} // Dinosaur
  rect_wall = {x: moveob, y: parseInt(toprand), width: randomnosvg.getAttribute('width') * 1, height: randomnosvg.getAttribute('height') * 1} // Random obstacle

  if (rect_dino.x < rect_wall.x + rect_wall.width &&
     rect_dino.x + rect_dino.width > rect_wall.x &&
     rect_dino.y < rect_wall.y + rect_wall.height &&
     rect_dino.y + rect_dino.height > rect_wall.y &&
     lsdinosalive.includes(i)) {

      item.style.clip = 'rect(0px,600px,200px,200px)'
      item.style.top = '0px'

      // Checks if all dinos died and restart if so
      lsdinosalive.splice(lsdinosalive.indexOf(i), 1)
      lsdinosdown.splice(lsdinosdown.indexOf(item), 1)

      if (lsdinosalive.length == 0) {
        // Update highscore
        if (scorenr > prevhigh) {
        highscore.innerHTML = 'HI:  ' + scorenr
        prevhigh = scorenr
  }

        x = false
        start = false

        Program()
      }
  }
}

async function moveSide() {
  // Loop floor
  if (start == false) {
    start = true
    // Movement loop
    while (x) {
      while (frontlen <= 600 && start) {
        // Move line 1 to left and keep in same place
        floorpos -= speedmove
        backlen += speedmove
        floor.style.left = floorpos + 'px'
        floor.style.clip = 'rect(0px,600px,200px,' + backlen + 'px)'

        // Move line 2 to left and keep in same place
        floorpos2 -= speedmove
        frontlen += speedmove
        floor2.style.clip = 'rect(0px,' + frontlen + 'px,200px,0px)'
        floor2.style.left = floorpos2 + 'px'

        RandomLandscape()
        both_dinos.forEach((item, i) => {
          CheckCollision(item, i)
        })
        await sleep(1)
      }

      floorpos = 960
      backlen = 0
      floorpos2 = 360
      frontlen = 0
      startops = true
      while (backlen <= 600 && start) {
        // Repeat but line 1 and 2 switched position
          floorpos -= speedmove
          backlen += speedmove

          floor.style.left = floorpos + 'px'
          floor.style.clip = 'rect(0px,' + backlen + 'px,200px,0px)'

          floorpos2 -= speedmove
          frontlen += speedmove
          floor2.style.left = floorpos2 + 'px'
          floor2.style.clip = 'rect(0px,600px,200px,' + frontlen + 'px)'

          RandomLandscape()
          both_dinos.forEach((item, i) => {
            CheckCollision(item, i)
          })
          await sleep(1)
      }

      floorpos = 360
      backlen = 0
      floorpos2 = 960
      frontlen = 0
      speedmove += 0.2
  }
}
}

async function Score() {
  if (startscore == false) {
    startscore = true
  // Score loop
  while (x) {
    scorenr += 1
    await sleep(70)
    amountzeros = 5 - scorenr.toString().length
    score.innerHTML = zero.repeat(amountzeros) + scorenr
    }
  }
}

async function RandomLandscape() {
  moveob -= speedmove
  random.style.left = moveob + 'px'

  if (moveob >= 360 && moveob <= 960) {
    frontlenrand += speedmove
    random.style.clip = 'rect(0px,'+ frontlenrand +'px,100px,0px)'
    }

  if (moveob <= 360) {
    backlenrand += speedmove
    random.style.clip = 'rect(0px,100px,100px,'+ backlenrand +'px)'
  }

  if (moveob <= 260) {
    // Resets values
    random = rects[Math.floor(Math.random() * rects.length)]
    randnr1 = Math.floor((Math.random() * 500) + 100) + 960
    moveob = randnr1
    random.style.display = 'block'
    backlenrand = 0
    frontlenrand = 0
  }
  if (moveob > 960) {random.style.clip = 'rect(0px,100px,100px,100px)'}
}

moveSide()
Score()
}

async function EventHandlers(diff) {
class Dino {
  constructor() {
    this.height = 0;
    this.jump_speed = 0;
    this.dino_acc = 1
  }
  check_jump() {
    if (this.jump_speed > 0 ){
      this.do_jump();
    } else {
      this.dino_acc = 1;
    }
  }
  do_jump() {
    this.height = this.jump_speed + this.height;
    this.jump_speed = this.jump_speed - this.dino_acc;
    if (this.jump_speed < 0) { this.jump_speed = 0; }
  }
  jump(x) {
    if (!this.isJumping()) { return false; }

    this.dino_acc = 1;
    this.jump_speed = x;
    return true;
  }
  gravity() {
    if (this.height > 0) {this.height -= 10}
    if (this.height < 0) {this.height = 0}
  }
  isJumping() {
    return this.height == 0 && this.jump_speed == 0;
  }
}

let dino = new Dino()
let dino_ai = new Dino()
let player_jump_timer = 0
let ai_jump_timer = 0
let dino_ai_state = 0
let player_count = null
let ai_count = null
let ai_refresh_rate = 20;

function myMainLoop() {
  dino.check_jump();
  dino.gravity()

  dino_ai.check_jump();
  dino_ai.gravity()
}

function displayDinos() {
  document.getElementById("dino").style.top = (400 - dino.height) + "px";

  document.getElementById('dino_ai').style.top = (400 - dino_ai.height) + "px";
}

setInterval(myMainLoop, 20);
setInterval(displayDinos, 20);

document.addEventListener('keydown', async function (event) {
  if (event.code == 'Space') {
    if (!dino.jump(24)) {return}
    //console.log('Time: ' + (moveob - 420) / speedmove)

      // Timer
    player_jump_timer = 0
    player_count = setInterval(function(){
      player_jump_timer++;
      if (player_jump_timer > 30) {
        dino.dino_acc = 0.6
        clearInterval(player_count)
      }
    }, 1);
}})

document.addEventListener('keyup', async function (event) {
  if (event.code == 'Space') {
    clearInterval(player_count);
    player_count = null;
}})

  if (diff == 'easy') {

  }

  else if (diff == 'medium') {

  }

  else if (diff == 'hard') {
    // Every sec check jump
    check_time = setInterval(function () {
      if (((moveob - 420) / speedmove) > 50 && ((moveob - 420) / speedmove) < 70) {if (!dino_ai.jump(26)) {return}}
    }, 1)
  }

}
