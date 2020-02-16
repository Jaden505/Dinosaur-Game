// Doesnt change the values on restart game
let prevhigh = 0
let maindata = []
let prevdinodata = []

// Shows data on click
let nr = 0
let average = 0
document.addEventListener('keypress', async function (event) {
  if (event.code == 'Space') {
    maindata.forEach((obsjump) => {
      console.log(obsjump)
      average += parseInt(obsjump[2])
      nr += 1
    })
    console.log(average / nr)
  }
})

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

rects.forEach(element =>
  element.style.display = 'none'
)

document.querySelectorAll('.rep').forEach((item, i) => {
  item.style.left = '420px'
  item.style.top = '400px'
  randcolor = colors[Math.floor(Math.random() * colors.length)]
  item.style.fill = 'rgb(' + randcolor + ')'
  item.style.clip = 'inherit'

  if (item.tagName != 'rect') {
    lsdinosalive.push(i)
  }
})




var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;
};





async function Neurons() {
  numberdown = 0
  lsdinosdown = []

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

     start = async () => {
    await asyncForEach(document.querySelectorAll('.rep'), async (val, x) => {
      if (val.tagName != 'rect' && val.style.clip == 'inherit' && start) {
      choicebm = choices[Math.floor(Math.random() * choices.length)]

      obstaclejumps.push(x)
      tf = false

    let maindatarepp = maindata.map(function(elem) {
      // If in previous dino data
      rounded = Math.round(speedmove * 10 ) / 10
      details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, 1]
      if (isEqual(elem, details)) {console.log('!!!!!!!')}
      details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, 2]
      if (isEqual(elem, details)) {console.log('!!!!!!!')}
      details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, 3]
      if (isEqual(elem, details)) {console.log('!!!!!!!')}
    })

    // Random pick jump
    rounded = Math.round(speedmove * 10 ) / 10
    details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random]
    if (start) {optionpick = optionsls[Math.floor(Math.random() * optionsls.length)]}

      if (optionpick == 1 && start) {
        // Push data
        rounded = Math.round(speedmove * 10 ) / 10
        details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, optionpick]
        data.push(details)

        Up(25, val, x, details)
      }
      else if (optionpick == 2 && start) {
        // Push data
        rounded = Math.round(speedmove * 10 ) / 10
        details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, optionpick]
        data.push(details)

        Up(35, val, x, details)
      }
      else if (optionpick == 3 && start) {
        // Push data
        rounded = Math.round(speedmove * 10 ) / 10
        details = [x, rounded, (Math.round(parseInt(random.style.left))) + 'px', random, optionpick]
        data.push(details)

        if (start && lsdinosalive.includes(x)) {lsdinosdown.push(x)}
        if (lsdinosdown.length == lsdinosalive.length && start) {Neurons()}
      }

      await sleep(50 / speedmove)
      }
    });
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

      item.style.clip = ' rect(0px,600px,200px,200px)'
      item.style.top = '0px'

      // Checks if all dinos died and restart if so
      lsdinosalive.splice(lsdinosalive.indexOf(i), 1)
      lsdinosdown.splice(lsdinosdown.indexOf(item), 1)

      if (lsdinosalive.length == 0) {
        // Replace all previous bestdino data
        prevdinodata = []
        data.forEach((item) => {
        if (item[0] == i) {prevdinodata.push(item), maindata.push(item)}
      })
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
        document.querySelectorAll('.rep').forEach((item, i) => {
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
          document.querySelectorAll('.rep').forEach((item, i) => {
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

      if (parseInt(random.style.left) < 450 && parseInt(random.style.left) > 450 - (random.querySelector('rect').getAttribute('width'))) {tf = true}

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

      if (parseInt(random.style.left) < 450 && parseInt(random.style.left) > 450 - (random.querySelector('rect').getAttribute('width'))) {tf = true}

      currentheight = parseInt(who.style.top)
    who.style.top = (currentheight + 5) + 'px'
    await sleep(7)
    }
  }

  // Checks if dino is still alive
  if (start && lsdinosalive.includes(y) && tf && parseInt(details[1]) > 450) {
    obstaclejumps.splice(obstaclejumps.indexOf(y), 1)
    //console.log('succesfull obstacle jump')
}

  if (start && lsdinosalive.includes(y)) {
  lsdinosdown.push(y)
}

// Restart all dino jumps when all down
  if (lsdinosdown.length == lsdinosalive.length && start) {Neurons()}
}

moveSide()
Score()
Neurons()
}

Program()
