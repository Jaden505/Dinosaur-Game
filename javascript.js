let jump = false
let dinosaur = document.getElementById('dinosaur')
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
let random2 = rects[Math.floor(Math.random() * rects.length)]
let moveob = 360
let moveob2 = 360
let randnr1 = Math.floor((Math.random() * 500) + 100)
let randnr2 = Math.floor((Math.random() * 500) + 100)

let randomnosvg = random.querySelector('rect')
let rect1 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
let rect2 = {x: moveob, y: randomnosvg.getAttribute('top'), width: randomnosvg.getAttribute('width'), height: randomnosvg.getAttribute('height')} // Random obstacle
let style = window.getComputedStyle(random)
let toprand = style.getPropertyValue('top')
let backlenrand = randomnosvg.getAttribute('width')
let frontlenrand = 0

let randomnosvg2 = random.querySelector('rect')
let rect12 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
let rect22 = {x: moveob, y: randomnosvg.getAttribute('top'), width: randomnosvg.getAttribute('width'), height: randomnosvg.getAttribute('height')} // Random obstacle
let style2 = window.getComputedStyle(random)
let toprand2 = style.getPropertyValue('top')
let backlenrand2 = randomnosvg.getAttribute('width')
let frontlenrand2 = 0

let score = document.getElementById('score')
let scorenr = 0
let zero = '0'
let startscore = false

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'none'
)

function CheckCollision() {
  randomnosvg = random.querySelector('rect')
  style = window.getComputedStyle(random)
  toprand = style.getPropertyValue('top')

  rect1 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
  rect2 = {x: moveob, y: parseInt(toprand), width: randomnosvg.getAttribute('width') * .5, height: randomnosvg.getAttribute('height')} // Random obstacle

  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y) {
      console.log('collision detected!')
      x = false
      start = false
  }
}

function CheckCollision2() {
  randomnosvg2 = random.querySelector('rect')
  style2 = window.getComputedStyle(random)
  toprand2 = style.getPropertyValue('top')

  rect12 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
  rect22 = {x: moveob2, y: parseInt(toprand2), width: randomnosvg2.getAttribute('width') * .5, height: randomnosvg2.getAttribute('height')} // Random obstacle

  if (rect12.x < rect22.x + rect22.width &&
     rect12.x + rect12.width > rect22.x &&
     rect12.y < rect22.y + rect22.height &&
     rect12.y + rect12.height > rect22.y) {
      console.log('collision detected!')
      x = false
      start = false
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
        RandomLandscape2()
        CheckCollision()
        CheckCollision2()

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
          RandomLandscape2()
          CheckCollision()
          CheckCollision2()

          await sleep(1)
      }
      floorpos = 360
      backlen = 0
      floorpos2 = 960
      frontlen = 0
      speedmove += 0.1
    }
  }
}

async function Score() {
  if (startscore == false) {
    startscore = true
  // Score loop
  while (x) {
    scorenr += 1
    await sleep(100)
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

async function RandomLandscape2() {
  moveob2 -= speedmove
  random2.style.left = moveob2 + 'px'

  if (moveob2 >= 360 && moveob2 <= 960) {
    frontlenrand2 += speedmove
    random2.style.clip = 'rect(0px,'+ frontlenrand2 +'px,100px,0px)'
    }

  if (moveob2 <= 360) {
    backlenrand2 += speedmove
    random2.style.clip = 'rect(0px,100px,100px,'+ backlenrand2 +'px)'
  }

  if (moveob2 <= 260) {
    // Resets values
    random22 = rects[Math.floor(Math.random() * rects.length)]
    randnr12 = Math.floor((Math.random() * 500) + 100) + 960
    moveob2 = randnr12
    random2.style.display = 'block'
    backlenrand2 = 0
    frontlenrand2 = 0
  }
  if (moveob2 > 960) {random2.style.clip = 'rect(0px,100px,100px,100px)'}
}

async function Up(e, type) {
  while (x) {
    await sleep(1)
  if (jump == false && done) {
      jump = true
      done = false
      for (let i = 0; i < type; i++) {
        if (start) {
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
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
        dinosaur.style.top = jumpheight + 'px'
        await sleep(7)
      }
      }
    done = true
    break
  }
}
}

async function Down(e, type) {
  while (x) {
    await sleep(1)
  if (done && jump) {
    done = false
      await sleep(80)
      for (let i = 0; i < type; i++) {
        if (start) {
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(7)
      }
      }
      jump = false
      done = true
      break
  }
}
}

document.addEventListener('keydown', async function (event) {
  let left = window.getComputedStyle(document.getElementById("dinosaur")).top
  if (event.code == 'Space' && left == '400px') {
    double += 1
    timebetween = 0
    already = false

    // Standerd go up
    if (double < 2) {
      Up(event, 30)
      already = false
  }

  // When spacebar is held down
  if (double > 1 && already == false && jump == false) {
    Up(event, 40)
    Down(event, 40)
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
    Down(event, 40)
    already = true
    clearInterval(count)
  }
}, 1);
}})

document.addEventListener('keyup', async function (event) {
  timebetween = 0
  let left = window.getComputedStyle(document.getElementById("dinosaur")).top
  if (event.code == 'Space') {

      // Chooses small or big jump depending on time held down
      if (already == false && double < 2) {
        Down(event, 30)
      }
      double = 0
      already = true
      clearInterval(count)
}})
