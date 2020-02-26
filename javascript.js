// Doesnt change the values on restart game
let prevhigh = 0
let jump_train = []
let typejump_train = []
let jump_test = []
let typejump_test = []
let socket = new WebSocket("ws://localhost:8765/")

async function Program() {
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'none'
)

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

async function Neurons() {
  numberdown = 0
  lsdinosdown = []

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

     start = async () => {
    await asyncForEach(dino_ai_ls, async (val, x) => {
      if (val.tagName != 'rect' && val.style.clip == 'inherit' && start) {
      choicebm = choices[Math.floor(Math.random() * choices.length)]
      console.log(x)

      obstaclejumps.push(x)

    // Random pick jump
    rounded = Math.round(speedmove * 10) / 10
    details = [x, rounded, Math.round(parseInt(random.style.left)),
       parseInt(random.querySelector('rect').getAttribute('width')), parseInt(random.querySelector('rect').getAttribute('height'))]

      SendRecieve(val, x, details)
      await sleep(50 / speedmove)
      }
    })
  }
  start();
}

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

async function Up(type, who, y, details) {
  for (let i = 0; i < type; i++) {
    if (start && lsdinosalive.includes(y)) {

      currentheight = parseInt(who.style.top)
    who.style.top = (currentheight - 5) + 'px'
    await sleep(7)
    }
  }
  Down(type, who, y, details)
}

async function Down(type, who, y, details) {
  await sleep(80)
  for (let i = 0; i < type; i++) {
    if (start && lsdinosalive.includes(y)) {

      currentheight = parseInt(who.style.top)
    who.style.top = (currentheight + 5) + 'px'
    await sleep(7)
    }
  }

  if (start && lsdinosalive.includes(y)) {
  lsdinosdown.push(y)
}

// Restart all dino jumps when all down
  if (lsdinosdown.length == lsdinosalive.length && start) {Neurons()}
}

async function SendRecieve(val, x, details) {
  // Send
  socket = new WebSocket("ws://localhost:8765/")

  socket.onopen = function(e) {
    socket.send(details)
  }

  // Receieve
  socket.onmessage = async function(event) {
    if (event.data == 1) {Up(25, val, x, details)}
    else if (event.data == 2) {Up(35, val, x, details)}
    else {
      await sleep(300)
      if (start && lsdinosalive.includes(x)) {
      lsdinosdown.push(x)
    }
      if (lsdinosdown.length == lsdinosalive.length && start) {Neurons()}
    }
  }
}


async function Up2(e, type) {
  while (x) {
    await sleep(1)
  if (jump == false && done) {
      jump = true
      done = false
      for (let i = 0; i < type; i++) {
        if (start) {
        jumpheight -= 5
        dino.style.top = jumpheight + 'px'
        await sleep(7)
      }
      }
      done = true
      break
  }
}
}

async function AddUp(e, type) {
  while (x) {
    await sleep(1)
  if (done) {
      done = false
      for (let i = 0; i < type; i++) {
        if (start) {
        jumpheight -= 5
        dino.style.top = jumpheight + 'px'
        await sleep(7)
      }
      }
    done = true
    break
  }
}
}

async function Down2(e, type) {
  while (x) {
    await sleep(1)
  if (done && jump) {
    done = false
      await sleep(80)
      for (let i = 0; i < type; i++) {
        if (start) {
        jumpheight += 5
        dino.style.top = jumpheight + 'px'
        await sleep(7)
      }
      }
      jump = false
      done = true

      if (start && lsdinosalive.includes(y)) {
      lsdinosdown.push(y)
    }

      break
  }
}
}

document.addEventListener('keydown', async function (event) {
  let left = window.getComputedStyle(document.getElementById("dino")).top
  if (event.code == 'Space' && left == '400px') {
    double += 1
    timebetween = 0
    already = false

    // Standerd go up
    if (double < 2) {
      Up2(event, 30)
      already = false
  }

  // When spacebar is held down
  if (double > 1 && already == false && jump == false) {
    Up2(event, 40)
    Down2(event, 40)
    already = true
    jump = false
    clearInterval(count)
  }

    // Timer
    timebetween = 0
    count = setInterval(function(){
  timebetween++;
  if (timebetween == 30 && double < 2 && already == false && jump) {
    AddUp(event, 10)
    Down2(event, 40)
    already = true
    clearInterval(count)
  }
}, 1);
}})

document.addEventListener('keyup', async function (event) {
  timebetween = 0
  let left = window.getComputedStyle(document.getElementById("dino")).top
  if (event.code == 'Space') {

      // Chooses small or big jump depending on time held down
      if (already == false && double < 2) {
        Down2(event, 30)
      }
      double = 0
      already = true
      clearInterval(count)
}})

moveSide()
Score()
Neurons()
}

Program()
