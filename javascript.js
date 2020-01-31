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
      speedmove += 0.2
    }
  }
}

async function smallJump(e) {
  let spacebar = (e.keyCode ? e.keyCode : e.which)
  if (spacebar == 32 && jump == false) {
      jump = true
      for (let i = 0; i < 20; i++) {
        jumpheight -= 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
      await sleep(10)
      for (let i = 0; i < 20; i++) {
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
      jump = false
  }
}
