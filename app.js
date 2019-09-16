const boxes = document.querySelectorAll(".box");
const shell = document.querySelector(".wrapper");

shell.addEventListener("mousemove", evt => {
  if (evt.target.className.includes("ring")) {
    if (evt.target.previousElementSibling === null) {
      evt.target.setAttribute("draggable", "true");
    } else {
      evt.target.setAttribute("draggable", "false");
    }
  }
});

const dragStart = evt => {
  // evt.dataTransfer.dropEffect = "move";
  //console.log(evt.dataTransfer.dropEffect);
  evt.dataTransfer.setData("text", evt.target.classList);
};

const dragOver = evt => {
  evt.preventDefault();
};
const dragEnter = evt => {
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
};

shell.addEventListener("dragover", dragOver);
shell.addEventListener("dragstart", dragStart);
shell.addEventListener("dragenter", dragEnter);
shell.addEventListener("drop", drop);
