//global variables
const boxes = document.querySelectorAll(".box");
const shell = document.querySelector(".wrapper");
const bttns = document.querySelector(".bttns");
const lvlnum = document.querySelector(".lvlnum");
const mvCountEle = document.querySelector(".current");
const minEle = document.querySelector(".min");
const footer = document.querySelector(".footer");
const moves = document.querySelector(".moves");
const hidden = document.querySelector(".hidden");
const goScreen = document.querySelector(".gameOver");
const resetBttn = document.querySelector(".reset");
let lvls = 3;
let mvCount = 0;

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
    mvCounter();
  }
  //source https://www.w3schools.com/jsref/met_node_insertbefore.asp
  gameOver();
};

const press = evt => {
  evt.target.onclick;
};
//helper functions
const inProg = () => {
  if (boxes[1].firstChild || boxes[2].firstChild) {
    return true;
  } else {
    return false;
  }
};
const numUp = () => {
  if (lvls < 8 && !inProg()) {
    lvls += 1;
    lvlnum.innerText = lvls;
    addDiv();
    minMoves();
  }
};
const numDn = () => {
  if (lvls > 3 && !inProg()) {
    lvls -= 1;
    lvlnum.innerText = lvls;
    lessDiv();
    minMoves();
  }
};
const addDiv = (num = lvls) => {
  let div = document.createElement("div");
  div.className = `ring ring${num}`;
  boxes[0].appendChild(div);
};
const lessDiv = () => {
  boxes[0].firstElementChild.remove();
  let i = 1;
  for (child of boxes[0].children) {
    child.className = `ring ring${i}`;
    child.style.width = `${i * 10}%`;
    i++;
  }
};
const reset = () => {
  if (boxes[2].children.length === lvls) {
    bttns.append(resetBttn);
    footer.append(moves);
    hidden.style.visibility = "hidden";
  }
  for (box of boxes) {
    while (box.firstChild) {
      box.firstChild.remove();
    }
  }
  for (let i = 1; i <= lvls; i++) {
    addDiv(i);
  }
  minMoves();
  mvCounter(-1);
};
const minMoves = () => {
  let minMvs = 7;
  for (let i = 3; i < lvls; i++) {
    minMvs = minMvs * 2 + 1;
  }
  minEle.innerText = `Minimum Moves: ${minMvs}`;
};
const mvCounter = (num = null) => {
  if (num) {
    mvCount = num;
  }
  mvCount += 1;
  mvCountEle.innerHTML = `Moves: ${mvCount}`;
};
const gameOver = () => {
  if (boxes[2].children.length === lvls) {
    goScreen.append(resetBttn);
    goScreen.append(moves);
    hidden.style.visibility = "visible";
  }
};

//Event Listeners
shell.addEventListener("mousemove", draggable);
shell.addEventListener("dragstart", dragStart);
shell.addEventListener("dragover", dragOver);
shell.addEventListener("dragenter", dragEnter);
shell.addEventListener("drop", drop);
bttns.addEventListener("click", press);
