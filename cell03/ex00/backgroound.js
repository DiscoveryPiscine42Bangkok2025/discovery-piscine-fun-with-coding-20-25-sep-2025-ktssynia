function randomColor(){
    const randomcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomcolor;
}
const btn = document.getElementById("btn");
btn.addEventListener("click", randomColor);