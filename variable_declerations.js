let prevhigh = 0
let socket = new WebSocket("ws://localhost:8765/")

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

function init() {
   jump = false
   jumpheight = 400

   floor = document.getElementById('floor')
   floorpos = 360
   backlen = 0

   floor2 = document.getElementById('floor2')
   floorpos2 = 960
   frontlen = 0

   speedmove = 1
   start = false
   x = true

   timebetween = 0
   count = null
   double = 0
   done = true
   already = false
   startops = false

   rects = document.getElementById('first').querySelectorAll('svg')
   random = rects[Math.floor(Math.random() * rects.length)]
   moveob = 360
   randnr1 = Math.floor((Math.random() * 500) + 100)

   randomnosvg = random.querySelector('rect')
   rect1 = {x: 420, y: jumpheight, width: 30, height: 55} // Dinosaur
   rect2 = {x: moveob, y: randomnosvg.getAttribute('top'), width: randomnosvg.getAttribute('width'), height: randomnosvg.getAttribute('height')} // Random obstacle
   style = window.getComputedStyle(random)
   toprand = style.getPropertyValue('top')
   backlenrand = randomnosvg.getAttribute('width')
   frontlenrand = 0

   score = document.getElementById('score')
   scorenr = 0
   zero = '0'
   startscore = false

   data = []
   choices = [25, 35]
   listnr = []
   dict = {}
   zerotwols = [0, 2.5]
   zerotwo = zerotwols[Math.floor(Math.random() * zerotwols.length)]
   colors = ['255,0,0', '0,255,0', '0,0,255', '165, 3, 252', '252, 3, 240', '252, 144, 3']
   randcolor = colors[Math.floor(Math.random() * colors.length)]

   lsdinosdown = []
   lsdinosalive = []
   obstaclejumps = []
   numberdown = 0
   highscore = document.getElementById('highscore')
   tf = false
   details = []
   optionsls = [1, 2, 3]
   rounded = Math.round(speedmove * 10 ) / 10

   dino = document.getElementById('dino')
   dino_ai = document.getElementById('dino_ai')
   both_dinos = [dino, dino_ai]
   dino_ai_ls = [dino_ai]

   gravity = 5
}
