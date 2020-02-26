function startScreen() {
}

function difficultyScreen() {
}

function Program() {
  let prevhigh = 0
  let socket = new WebSocket("ws://localhost:8765/")

  let jump = false
  let jumpheight = 400

  let floor = document.getElementById('floor')
  let floorpos = 360
  let backlen = 0

  let floor2 = document.getElementById('floor2')
  let floorpos2 = 960
  let frontlen = 0

  let speedmove = 1
  let start = false
  let x = true

  let timebetween = 0
  let count = null
  let double = 0
  let done = true
  let already = false
  let startops = false

  let rects = document.getElementById('first').querySelectorAll('svg')
  let random = rects[Math.floor(Math.random() * rects.length)]
  let moveob = 360
  let randnr1 = Math.floor((Math.random() * 500) + 100)

  let randomnosvg = random.querySelector('rect')
  let rect1 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
  let rect2 = {x: moveob, y: randomnosvg.getAttribute('top'), width: randomnosvg.getAttribute('width'), height: randomnosvg.getAttribute('height')} // Random obstacle
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
  rect1 = {x: 420, y: parseInt(item.style.top), width: 30, height: 55} // Dinosaur
  rect2 = {x: moveob, y: parseInt(toprand), width: randomnosvg.getAttribute('width') * .5, height: randomnosvg.getAttribute('height')} // Random obstacle

  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y &&
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

Program()


class Dino {
  constructor(){
    this.height = 0;
    this.jump_speed = 0;
  }
  check_jump(){
    if (this.jump_speed > 0 ){
      this.do_jump();
    }
  }
  do_jump(){
    this.height = this.jump_speed + this.height;
    this.jump_speed = this.jump_speed - 1;
  }
  jump(x){
    this.jump_speed = x;
  }
}

dino_item = document.getElementById('dino')
let dino = new Dino()
let dino2 = new Dino()

document.addEventListener('keydown', async function (event) {
  if (event.code == 'Space') {
    // Call jump method
      dino.jump(15);
}})

function myMainLoop() {
  dino.check_jump();
  console.log(dino)
}

function displayDinos() {
  elem = document.getElementById("dino");
  elem.style.top = (400 - dino.height) + "px";
}

setInterval(myMainLoop, 40);
setInterval(displayDinos, 40);
