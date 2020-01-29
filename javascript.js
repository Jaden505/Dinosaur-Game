let jump = false
let dinosaur = document.getElementById('dinosaur')
let jumpheight = 400
let floor = document.getElementById('floor')
let floorpos = 360
let floorwidth = 600
let speedmove = 1
let x = true
let start = false

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function moveSide() {
  if (start == false) {
    start = true
  while (x) {
    floorpos -= 1
    floor.style.left = floorpos + 'px'
    floor.style.clip = 'rect(0px,600px,200px,0px)'
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
      await sleep(10)
      for (let i = 0; i < 20; i++) {
        jumpheight += 5
        dinosaur.style.top = jumpheight + 'px'
        await sleep(8)
      }
      jump = false
  }
}

window.addEventListener("keydown", function (e) {
  if (e.code == 'Space') {
    console.log(e.code)
  }
})
