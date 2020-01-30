let list_random = []
let number_index = 0
let number_index2 = 0
let number = 10
let i;
let list_heights = []
let list = []

let status = document.getElementById('status');
let buttonS = document.getElementById('Sort');
let buttonR = document.getElementById('Randomize');

buttonS.disabled = "disabled"
buttonR.disabled = ""

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function AddNumbers() {
  for (i = 10; i < 110; i++) {
    list_random.push(i);
  }
}

let x = document.querySelectorAll("#rectup");
let y = document.querySelectorAll("#rectdown");

function MyFunc() {
  buttonS.disabled = ""

  document.getElementById('status').innerHTML = 'Randomized'
  AddNumbers()
  for (const rctx of x) {
    let random_nr = list_random[Math.floor(Math.random() * list_random.length)];
    rctx.style.height = random_nr
    list_random.splice(list_random.indexOf(random_nr), 1);
  }
}

async function GetLowest() {
  number_index3 = 0
  number = 10
  list = []

  document.getElementById('status').innerHTML = 'Sorting';
  for (i of y) {
    list.push(i)
  }

  let z;
  for (z = 0; z < 100; z++) {
  for (rctx of x) {
      if (rctx.style.height == number + 'px') {
        console.log(rctx)

        let index_lowest = list_heights.indexOf(rctx.style.height);
        let first_lowest = x[number_index3];
        let first_lowest_index = x[number_index3].style.height;
        let smallest_number = rctx.style.height;

        console.log(index_lowest)
        console.log(first_lowest)
        console.log(smallest_number)

        let first_nr = first_lowest.style.height
        console.log(first_nr)
        first_lowest.style.height = smallest_number
        rctx.style.height = first_nr

        for (rcty of list) {
          document.getElementById('status').innerHTML = 'Analyzing';
          rcty.style = 'fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,0)';
          await sleep(1);
          rcty.style = 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)';
        }
        list.shift()

        number += 1
        number_index3 += 1
      }
  }
}
  ChangeColorGreen()
  document.getElementById('status').innerHTML = 'Sorted';

}

function NewFunc() {
  number_index = 0
  list_heights = []
  for (element of x) {
    let element1_h = x[number_index];
    list_heights.push(element.style.height);

    number_index += 1
  }
  GetLowest();
}

async function ChangeColorRed() {
    // Red
    buttonR.disabled = "disabled"
    buttonS.disabled = "disabled"

    for (const rcty of y) {
      document.getElementById('status').innerHTML = 'Analyzing';
      rcty.style = 'fill:rgb(255,0,0);stroke-width:1;stroke:rgb(0,0,0)';
      await sleep(10);
    }
    for (const rcty of y) {
      rcty.style = 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)';
    }
    NewFunc();
  }

async function ChangeColorGreen() {
    // Green
    for (const rcty of y) {
      rcty.style = 'fill:rgb(0,255,0);stroke-width:1;stroke:rgb(0,0,0)';
      await sleep(10);
    }
    for (const rcty of y) {
      rcty.style = 'fill:rgb(255,255,255);stroke-width:1;stroke:rgb(0,0,0)';
    }
    buttonR.disabled = ""
  }
