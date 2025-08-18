const interval = 7000;

const animales = ['vaca', 'cerdo', 'oveja'];
const cantidades = [1, 2, 3];

let agrupaciones;
let totalAnimales;
let varI;
let running = false;
let myInterval;

let display, startBttn, restartBttn, resultsBttn, resultText;

function obtenerNombreArchivo(cantidad, animal) {
  return `${animal}-${cantidad}.png`;
}

function generateGroupings() {
  totalAnimales = { vaca: 0, cerdo: 0, oveja: 0 };
  const groups = [];

  for (let i = 0; i < 4; i++) {
    const usados = new Set();
    const grupo = [];
    const cantidadDeGrupos = Math.floor(Math.random() * 2) + 1; 

    for (let j = 0; j < cantidadDeGrupos; j++) {
      let animal;
      do {
        animal = animales[Math.floor(Math.random() * animales.length)];
      } while (usados.has(animal));
      usados.add(animal);

      const cantidad = cantidades[Math.floor(Math.random() * cantidades.length)];
      grupo.push({ animal, cantidad });
      totalAnimales[animal] += cantidad;
    }

    groups.push(grupo);
  }

  return groups;
}

function showGrouping() {
  if (!running) {
    clearInterval(myInterval);
    return;
  }

  if (varI < agrupaciones.length) {
    display.style.opacity = 0;
    display.style.transform = 'scale(0.5)';

    setTimeout(() => {
      display.innerHTML = '';
      agrupaciones[varI].forEach(({ animal, cantidad }) => {
        const img = document.createElement('img');
        img.src = `img/${obtenerNombreArchivo(cantidad, animal)}`;
        img.alt = `${cantidad} ${animal}`;
        display.appendChild(img);
      });

      display.style.opacity = 1;
      display.style.transform = 'scale(1)';

      varI++;
    }, 500);

  } else {
    clearInterval(myInterval);
    running = false;
    resultsBttn.disabled = false;
  }
}

function start() {
  display     = document.getElementById('numberDisplay');
  startBttn   = document.getElementById('start');
  restartBttn = document.getElementById('restart');
  resultsBttn = document.getElementById('resultBtn');
  resultText  = document.getElementById('result');

  startBttn.disabled   = true;
  restartBttn.disabled = false;
  resultsBttn.disabled = true;
  resultText.textContent = 'Resultado:';

  agrupaciones = generateGroupings();
  varI    = 0;
  running = true;

  showGrouping();
  myInterval = setInterval(showGrouping, interval);
}

function restart() {
  if (running) {
    clearInterval(myInterval);
    running = false;
  }
  display.innerHTML      = '';
  resultText.textContent = 'Resultado:';
  startBttn.disabled     = false;
  restartBttn.disabled   = true;
  resultsBttn.disabled   = true;
  const img = document.createElement('img');
  img.src = 'img/dice.png';
  display.appendChild(img);
}

function showResults() {
  resultText.textContent = 
    `Resultado: ${totalAnimales.vaca} vacas, ${totalAnimales.cerdo} cerdos, ${totalAnimales.oveja} ovejas`;
  resultsBttn.disabled = true;
}