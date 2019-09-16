//variables
const boxes = document.querySelectorAll(".box");
const shell = document.querySelector(".wrapper");
const bttns = document.querySelector(".bttns");
const lvlnum = document.querySelector(".lvlnum");
let lvls = 3;

//event functions
const draggable = evt => {
  if (evt.target.className.includes("ring")) {
    if (evt.target.previousElementSibling === null) {
      evt.target.setAttribute("draggable", "true");
    } else {
      evt.target.setAttribute("draggable", "false");
    }
  }
};

const dragStart = evt => {
  // evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.setData("text", evt.target.classList);
};
const dragEnter = evt => {
  evt.preventDefault();
};

const dragOver = evt => {
  evt.preventDefault();
};

const drop = evt => {
  let cl = evt.dataTransfer.getData("text");
  let div = document.querySelector(`.${cl.split(" ")[1]}`);
  // source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
  if (
    (!evt.target.firstElementChild ||
      div.offsetWidth < evt.target.firstElementChild.offsetWidth) &&
    evt.target.className.includes("box")
  ) {
    evt.target.insertBefore(div, evt.target.firstElementChild);
  }
  //source https://www.w3schools.com/jsref/met_node_insertbefore.asp
  gameOver();
};

const press = evt => {
  evt.target.onclick;
};
//helper functions
const numUp = () => {
  if (lvls < 8) {
    lvls += 1;
    lvlnum.innerText = lvls;
    addDiv();
  }
};
const numDn = () => {
  if (lvls > 3) {
    lvls -= 1;
    lvlnum.innerText = lvls;
    lessDiv();
  }
};
const addDiv = () => {
  let div = document.createElement("div");
  div.className = `ring ring${lvls}`;
  boxes[0].appendChild(div);
};
const lessDiv = () => {
  boxes[0].firstElementChild.remove();
  let i = 1;
  for (child of boxes[0].children) {
    child.style.width = `${i * 10}%`;
    i++;
  }
};
const gameOver = () => {
  if (boxes[2].children.length === lvls) {
    console.log("Game Over");
  }
};

//Event Listeners
shell.addEventListener("mousemove", draggable);
shell.addEventListener("dragstart", dragStart);
shell.addEventListener("dragover", dragOver);
shell.addEventListener("dragenter", dragEnter);
shell.addEventListener("drop", drop);
bttns.addEventListener("click", press);
