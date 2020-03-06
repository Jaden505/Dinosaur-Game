// Doesnt change the values on restart game
let prevhigh = 0
let jump_train = []
let typejump_train = []

// Shows data on click
document.addEventListener('keypress', async function (event) {
  if (event.code == 'Space') {
    let zeros = 0
    let ones = 0

    // Checks amount of zeros and ones in list
    for (let i = 0; i <= typejump_train.length; i++) {
      if (typejump_train[i] == 0) {zeros += 1}
      else if (typejump_train[i] == 1) {ones += 1}
    };
    //console.log(zeros, ones)

    // Makes amount zeros and ones equal in list
    while (zeros > ones) {
      random_remove = Math.floor(Math.random()*((typejump_train.length - 1) - 0+1)+0)
      if (typejump_train[random_remove] == 0) {
        zeros -= 1
        jump_train.splice(random_remove, 1)
        typejump_train.splice(random_remove, 1)
      }
    }
    //console.log(zeros, ones)

    download(jump_train, 'datajump.csv', 'application/msword')
    download(typejump_train, 'datatype.csv', 'application/msword')
  };
})

// Download data
function download(strData, strFileName, strMimeType) {
var D = document,
    A = arguments,
    a = D.createElement("a"),
    d = A[0],
    n = A[1],
    t = A[2] || "text/plain";

//build download link:
a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

if (window.MSBlobBuilder) { // IE10
    var bb = new MSBlobBuilder();
    bb.append(strData);
    return navigator.msSaveBlob(bb, strFileName);
} /* end if(window.MSBlobBuilder) */

if ('download' in a) { //FF20, CH19
    a.setAttribute("download", n);
    a.innerHTML = "downloading...";
    D.body.appendChild(a);
    setTimeout(function() {
        var e = D.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        D.body.removeChild(a);
    }, 66);
    return true;
}; /* end if('download' in a) */

//do iframe dataURL download: (older W3)
var f = D.createElement("iframe");
D.body.appendChild(f);
f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
setTimeout(function() {
    D.body.removeChild(f);
}, 333);
return true;
}
//download(jump_train, 'data.txt', 'text/plain')

// Download data
function download(strData, strFileName, strMimeType) {
var D = document,
    A = arguments,
    a = D.createElement("a"),
    d = A[0],
    n = A[1],
    t = A[2] || "text/plain";

//build download link:
a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

if (window.MSBlobBuilder) { // IE10
    var bb = new MSBlobBuilder();
    bb.append(strData);
    return navigator.msSaveBlob(bb, strFileName);
} /* end if(window.MSBlobBuilder) */

if ('download' in a) { //FF20, CH19
    a.setAttribute("download", n);
    a.innerHTML = "downloading...";
    D.body.appendChild(a);
    setTimeout(function() {
        var e = D.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        D.body.removeChild(a);
    }, 66);
    return true;
}; /* end if('download' in a) */

//do iframe dataURL download: (older W3)
var f = D.createElement("iframe");
D.body.appendChild(f);
f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
setTimeout(function() {
    D.body.removeChild(f);
}, 333);
return true;
}

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
let choices = [35, 35]
let listnr = []
let dict = {}
let zerotwols = [2.5, 2.5]
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

    // Random pick jump
    rounded = Math.round(speedmove * 10 ) / 10
    details = [rounded, Math.round(parseInt(random.style.left)),
       parseInt(random.querySelector('rect').getAttribute('width')), parseInt(random.querySelector('rect').getAttribute('height'))]
    Up(choicebm, val, x, details)

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

      item.style.clip = ' rect(0px,600px,200px,200px)'
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
    await sleep(10)
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
    await sleep(10)
    }
  }

  // let zeros = 0
  // let ones = 0
  // let allowed = true
  // let allowed2 = true
  // typejump_train.forEach((item, i) => {
  //   if (item == 0) {zeros += 1}
  //   else if (item == 1) {ones += 1}
  // })
  //
  // if (zeros + 1 >= ones + 2) {allowed2 = false}
  // if (ones + 1 >= zeros + 2) {allowed = false}

  if (start && lsdinosalive.includes(y) && tf && details[1] > 450) {
    //console.log('succesfull')
    obstaclejumps.splice(obstaclejumps.indexOf(y), 1)
    jump_train.push('['+details+']')
    typejump_train.push(1)
}
else if (start && lsdinosalive.includes(y)) {
  //console.log('unsuccesfull')
  jump_train.push('['+details+']')
  typejump_train.push(0)
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
