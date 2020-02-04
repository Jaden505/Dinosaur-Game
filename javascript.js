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

let rects = document.getElementById('first').querySelectorAll('rect')
let random = rects[Math.floor(Math.random() * rects.length)]
let random2 = rects[Math.floor(Math.random() * rects.length)]
let moveob = 360
let moveob2 = 360
let randnr1 = Math.floor((Math.random() * 500) + 100)
let randnr2 = Math.floor((Math.random() * 500) + 100);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'block'
)

async function moveSide() {
  // Loop floor
  if (start == false) {
    start = true
    while (x) {
      AllRandoms()
      while (frontlen <= 600) {
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

        await sleep(1)
      }

      floorpos = 960
      backlen = 0
      floorpos2 = 360
      frontlen = 0
      startops = true
      moveob = 960

      while (backlen <= 600) {
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


function AllRandoms() {
  rects = document.getElementById('first').querySelectorAll('svg')
  random = rects[Math.floor(Math.random() * rects.length)]
  random2 = rects[Math.floor(Math.random() * rects.length)]
  randnr1 = Math.floor((Math.random() * 500) + 100)
  randnr2 = Math.floor((Math.random() * 500) + 100)
  while (random2 == random) {random2 = rects[Math.floor(Math.random() * rects.length)]}

  rects.forEach(element =>
    element.style.display = 'none'
  )

if (startops) {random.style.display = 'block'}
else {random.style.display = 'none'}
}

function RandomLandscape() {
  moveob -= speedmove
  if (startops) {
  random.style.left = moveob + 'px'
    }
  if (moveob < 360 || moveob > 960) {
    random.style.display = 'none'
    }
  else {
  random.style.display = 'block'
    }

  if (startops) {
  random2.style.left = moveob+ randnr1 + 'px'
    }
  if (moveob2 < 360 || moveob > 960) {
  random2.style.display = 'none'
    }
  else {
  random2.style.display = 'block'
    }
}




async function Up(e, type) {
  while (x) {
    await sleep(1)
  if (jump == false && done) {
      jump = true
      done = false
      for (let i = 0; i < type; i++) {
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(7)
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
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(7)
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
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(7)
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
