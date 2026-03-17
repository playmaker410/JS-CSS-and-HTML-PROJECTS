const generateBtn = document.getElementById("generate-btn");
// const paletteContainer = document.querySelector(".pallete-container")

generateBtn.addEventListener("click", generatecolor);


// paletteContainer.addEventListener("click", function(e){
//     if(e.target.classList.contains("copy-btn")){
//         const hexValue = e.target.PreviousElementSibling.textContent;

//         navigator.clipboard
//         .writeText(hexValue)
//         .then(()=> Copysuccesful(e.target))
//         .catch((err) => console.log(err))
//     } else if (e.target.classList.contains("color")){
//         const hexValue = e.target.nextElementSibling.textContent;
//         navigator.clipboard;
//         writeText(hexValue)
//         .then(() => Copysuccesful(e.target.nextElementSibling.querySelector(".copy-btn"))) 
//         .catch((err) => console.log(err))
//     }
// });

function generatecolor(){
    const colors = [];
    for(let i = 0; i < 10; i++){
        colors.push(generateRadomColors())
    }
    updatePaletteDisplay(colors);
}

 


function generateRadomColors(){
    const letters = "123456789abcdefghiijk";
    let color = "#";

    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}






function updatePaletteDisplay(colors){
    const colorBoxes = document.querySelectorAll(".indiv-color")

    colorBoxes.forEach((box,index)=>{
        const color = colors[index]
        const colorDiv = box.querySelector(".color");
        const hexvalue = box.querySelector(".hexvalue")

        colorDiv.style.backgroundColor= color;
        hexvalue.textContent = color;
    });


}
generatecolor();


