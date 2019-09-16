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
shell.addEventListener("drag", evt => {
  evt.target.classList.add("drag");
});
