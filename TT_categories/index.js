const card = document.getElementsByClassName("card");
const leafGreen = document.getElementById("leaf-green");
const brownGreen = document.getElementById("leaf-brown");

const hover = (e) => {
  leafGreen.classList.add("anim-green");
  brownGreen.classList.add("anim-brown");
};
const unhover = () => {
  leafGreen.classList.remove("anim-green");
  brownGreen.classList.remove("anim-brown");
};

card[0].onmouseover = (e) => hover(e);
card[1].onmouseover = hover;
card[2].onmouseover = hover;
card[3].onmouseover = hover;
card[0].onmouseout = unhover;
card[1].onmouseout = unhover;
card[2].onmouseout = unhover;
card[3].onmouseout = unhover;
