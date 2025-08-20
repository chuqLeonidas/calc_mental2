const rutasImagenes = [
  "img/0.png",
  "img/1.png",
  "img/2.png",
  "img/3.png",
  "img/4.png",
  "img/5.png",
  "img/6.png",
  "img/7.png",
  "img/8.png",
  "img/9.png",
  "img/mas.png",
  "img/menos.png"
];

var interval = 3000;

var min = 3;

var maxim = 20;

var running = false;
var myInterval;

var display;
var startBttn;
var restartBttn;
var resultsBttn;

var resultText;

var result;

let varI;
let numbers;
let boolSign; // Variable que indica si se va a mostrar el signo o no

function generateNumbers(){
    let numbers = [];
    let resultado = 0;
    for (let i = 0; i < 6; i++){
        let number = Math.floor(Math.random() * (maxim - min)) + min;
        if (i === 0)
            numbers.push(number);
        else {
            booli = true;
            if(i < 2)
                booli = false;

            let lastNumber = Math.abs(numbers[i-1]);
            

            while (number === lastNumber || booli === true){
                if (number !== numbers[i-2]) booli = false;
                number = Math.floor(Math.random() * (maxim - min)) + min;
            }
            if (resultado > number){
                if(Math.random() < 0.5) {
                    number = number * -1;
                }
                
            }
            numbers.push(number);
        }
        resultado += number;
        console.log("resultado temporal:"+resultado + " / numero actual:" + number);
    }
    console.log(numbers);
    return numbers;
}

function showNumbers() {

    
    let num = numbers[varI];
    if(!running) {
    
        clearInterval(myInterval);
        return;

    }

    if(varI < numbers.length){

        display.style.opacity = 0;
        display.style.transform = 'scale(0.5)';

        

        setTimeout(() => {

            if(boolSign === false) {
                console.log("es falso")
                result = result + num;
                boolSign = true;
                showNumber(Math.abs(num));
                display.style.opacity = 1; // Restaurar opacidad
                display.style.transform = 'scale(1)'; // Restaurar tamaño
                varI++;
            } else{
                console.log("es verdadero")
                if(num > 0){
                    display.innerHTML = ''; // Limpiar el contenido anterior
                    //display.textContent = "+";
                    showImage("mas");
                }
                    
                else {
                    display.innerHTML = ''; // Limpiar el contenido anterior
                    //display.textContent = "-";
                    showImage("menos");
                }
                    

                display.style.opacity = 1; // Restaurar opacidad
                display.style.transform = 'scale(1)'; // Restaurar tamaño
                boolSign = false;
            }
            console.log(boolSign)
            
        }, 500);        

    } else {

        clearInterval(myInterval);
        
        setTimeout(() => {
            display.style.opacity = 0;
            display.style.transform = 'scale(0.5)';
            setTimeout(() => {
                display.innerHTML = `<h2>El resultado es: <br> <br></h2>`;
                display.style.opacity = 1;
                display.style.transform = 'scale(1)';
                resultsBttn.disabled = false;
            }, 500);
        }, interval);
        console.log("resultado finallll:" + result)

        
    }

}

function start() {

    display = document.getElementById("numberDisplay");
    startBttn = document.getElementById("start");
    restartBttn = document.getElementById("restart");
    resultsBttn = document.getElementById("resultBtn");
    
    resultText = document.getElementById("result");

    startBttn.disabled = true;
    restartBttn.disabled = false;
    resultsBttn.disabled = true;

    numbers = generateNumbers();
    running = true;
    result = 0;

    varI = 0;
    boolSign = false; 
    showNumbers();

    myInterval = setInterval(showNumbers, interval);

    //document.getElementById("numberDisplay").textContent = display;

}

function restart() {
    console.log("se reinicia")
    if (running) {
        clearInterval(myInterval);
        running = false; 
    }

    display.innerHTML = ''; // Limpiar el contenido anterior
    const img = document.createElement('img');
    img.src = 'img/dice.png';
    display.appendChild(img);
    
    startBttn.disabled = false;
    restartBttn.disabled = true;
    resultsBttn.disabled = true;
}

function showResults(){

    console.log("resultado final:" + result)
    resultsBttn.disabled = true;
    /*
    display.style.opacity = 0;
    display.style.transform = 'scale(0.5)';
    */

    setTimeout(() => {
        display.innerHTML = `<h2>
        El resultado es: ${result} <br> <br>
        </h2>`; // Mostrar el número actual
/*

        display.style.color = "#003267";  // Cambiar color del resultado
        display.style.opacity = 1; // Restaurar opacidad
        display.style.transform = 'scale(1)'; // Restaurar tamaño

        */
        
    }, 500); // Retardar para que la animación ocurra primero
}

function showNumber(numero) {
    
    display.innerHTML = ''; // Limpiar el contenido anterior
    const digitos = numero.toString().split('');

    // Crear y agregar una imagen por cada dígito
    digitos.forEach(digito => {
    showImage(digito);
  });
}

function showImage(name){
    
    const img = document.createElement('img');
    img.src = `img/${name}.png`;
    img.alt = name;
    display.appendChild(img);
}



window.onload = function () {
  preloadImages(rutasImagenes)
    .then(() => {
      console.log("Todas las imágenes están precargadas");
    })
    .catch((error) => {
      console.error("Error al cargar las imágenes:", error);
    });
};

function preloadImages(rutas) {
  const promesas = rutas.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  return Promise.all(promesas);
}