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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveSide() {
  // Loop floor
  if (start == false) {
    start = true
    while (x) {
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

        await sleep(1)
      }

      floorpos = 960
      backlen = 0
      floorpos2 = 360
      frontlen = 0

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

async function Up(e, type) {
  console.log('1')
  while (x) {
    await sleep(1)
  if (jump == false && done) {
      jump = true
      done = false
      for (let i = 0; i < type; i++) {
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
      done = true
      break
  }
}
}

async function AddUp(e, type) {
  console.log('2')
  while (x) {
    await sleep(1)
  if (done) {
    console.log('5')
      done = false
      for (let i = 0; i < type; i++) {
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
    done = true
    break
  }
}
}

async function Down(e, type) {
  console.log('3')
  while (x) {
    await sleep(1)
  if (done) {
    console.log('6')
    done = false
      await sleep(10)
      for (let i = 0; i < type; i++) {
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
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

    if (double < 2) {
      Up(event, 20)
      console.log('single standard')
      already = false
      clearInterval()
      count = null
  }

  if (double > 1 && already == false && jump == false) {
    console.log('mutiple Big')
    Up(event, 30)
    Down(event, 30)
    already = true
    jump = false
    console.log(count)
    clearInterval()
    count = null
  }

    // Timer
    count = setInterval(function(){
  timebetween++;
  if (timebetween == 30 && double < 2 && already == false) {
    console.log('single big')
    AddUp(event, 10)
    Down(event, 30)
    already = true
    clearInterval()
    count = null
  }
}, 1);
}})

document.addEventListener('keyup', async function (event) {
  let left = window.getComputedStyle(document.getElementById("dinosaur")).top
  if (event.code == 'Space' && left == '400px') {
    console.log(already, double)
      // Chooses small or big jump depending on time held down
      if (already == false && double < 2) {
        console.log('single small')
        Down(event, 20)
      }
      double = 0
      clearInterval()
      count = null
      already = false

}})
