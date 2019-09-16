const boxes = document.querySelectorAll(".box");
const rings = document.querySelectorAll(".ring");
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
  evt.dataTransfer.dropEffect = "move";
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
  evt.target.insertBefore(div, evt.target.childNodes[0]);
  //source https://www.w3schools.com/jsref/met_node_insertbefore.asp
};

shell.addEventListener("dragover", dragOver);
shell.addEventListener("dragstart", dragStart);
shell.addEventListener("dragenter", dragEnter);
shell.addEventListener("drop", drop);
