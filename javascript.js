let jump = false
let dinosaur = document.getElementById('dinosaur')
let jumpheight = 400
let floor = document.getElementById('floor')
let floorpos = 360
let floorwidth = 600
let backlen = 0
let speedmove = 1
let x = true
let start = false
let keydown = true
let keydown2 = true

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveSide() {
  if (start == false) {
    start = true
  while (x) {
    floorpos -= 1
    backlen += 1
    floor.style.left = floorpos + 'px'
    floor.style.clip = 'rect(0px,600px,200px,' + backlen + 'px)'
    if (backlen >= 600) { floor.style.display = 'none' }
    await sleep(1)
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

      keydown = true
      keydown2 = true

      // Check if key up
      document.addEventListener('keyup', async function (event) {
        if (event.code == 'Space' && keydown) {
          keydown2 = false
          keydown = false
          console.log(event.code + 'bigjump')
        }})

      document.addEventListener('keydown', async function (event) {
        if (event.code == 'Space' && keydown2) {
          keydown = false
          keydown2 = false
          console.log(event.code + 'smalljump')
        }})

      await sleep(10)
      for (let i = 0; i < 20; i++) {
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
      jump = false
  }
}
