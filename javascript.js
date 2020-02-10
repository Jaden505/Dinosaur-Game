async function Program() {
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
let dict = {}
let choices = [20, 30]
let type = choices[Math.floor(Math.random() * choices.length)]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'none'
)

document.querySelectorAll('.rep').forEach((item, i) => {
  item.style.left = '420px'
  item.style.top = '400px'
})

async function Neurons() {
  while (x) {
  randtm =  Math.floor((Math.random() * 800) + 200)
  choicebm = choices[Math.floor(Math.random() * choices.length)]

  await sleep(randtm)

  document.querySelectorAll('.rep').forEach((item, i) => {
    domRectdino = item.getBoundingClientRect();
    domRectrand = random.getBoundingClientRect();
    jumppredict = ((domRectdino.x - domRectrand.x) + (domRectdino.y - domRectrand.y)) / speedmove
  })
  }
}

//Neurons()

async function CheckCollision(rec) {
  randomnosvg = random.querySelector('rect')
  style = window.getComputedStyle(random)
  toprand = style.getPropertyValue('top')
  rect1 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
  rect2 = {x: moveob, y: parseInt(toprand), width: randomnosvg.getAttribute('width') * .5, height: randomnosvg.getAttribute('height')} // Random obstacle

  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y) {
       //x = false
       //start = false
       rec.style.fill = 'rgb(255,0,0)'

       //await sleep(1000)

       //Program()
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

        document.querySelectorAll('.rep').forEach((item, x) => {
            CheckCollision(item)
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
          document.querySelectorAll('.rep').forEach((item, x) => {
              CheckCollision(item)
        })

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

async function Up() {
  while (x) {
    await sleep(1)
    for (let key in dict) {
      value = dict[key]

        if (key > 0) {
          // Substract 1 of key
          newkey = key -1
          Object.defineProperty(dict, newkey,
          Object.getOwnPropertyDescriptor(dict, key))
          delete dict[key]
          key = newkey

          currentheight = parseInt(value.style.top)
          value.style.top = (currentheight - 5) + 'px'
        }
        await sleep(7)
    }
  }
}

async function Down() {
  while (x) {
    await sleep(1)
      for (let key in dict) {
        value = dict[key]
        if (value.style.top != '401px' && key == 0) {
          currentheight = parseInt(value.style.top)
          value.style.top = (currentheight + 5) + 'px'
        }

        else if (key == 0 && value.style.top == '401px') {
          value.style.top = '400px'
          delete key
          delete dict[key]
        }

        await sleep(7)
      }
    }
}

async function UpDown() {
  while (x) {
    await sleep(1)
    document.querySelectorAll('.rep').forEach((item, i) => {
      async function asyncforEach() {
      if (item.tagName != 'rect' && item.style.top == '400px') {
        item.style.top = '401px'
        // Wait for next dino jump
        randtm =  Math.floor((Math.random() * 80) + 20)
        type = choices[Math.floor(Math.random() * choices.length)]
        dict[type] = item
        await sleep(randtm)
      }
    }
    asyncforEach()
  })
}
}

// On start functions
moveSide()
Score()
UpDown()
Up()
Down()
}
Program()
