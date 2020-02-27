
class Dino {
  constructor(){
    this.height = 0;
    this.jump_speed = 0;
  }
  check_jump(){
    if (this.jump_speed > 0 ){
      this.do_jump();
    }
  }
  do_jump(){
    this.height = this.jump_speed + this.height;
    this.jump_speed = this.jump_speed - 1;
  }
  jump(x){
    this.jump_speed = x;
  }
}


let dino = new Dino()

document.addEventListener('keydown', async function (event) {
  if (event.code == 'Space') {
    // Call jump method
      dino.jump(5);
}})


function gravity(obj){
  if (obj.height > 0) {
    obj.height = obj.height - 1;
  }

}


function myMainLoop() {
  dino.check_jump();
  console.log(dino);
}

setInterval(myMainLoop, 1000);
