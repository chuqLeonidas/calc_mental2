const rutasImagenes = [
  "img/vaca-1.png",
  "img/vaca-2.png",
  "img/vaca-3.png",
  "img/cerdo-1.png",
  "img/cerdo-2.png",
  "img/cerdo-3.png",
  "img/oveja-1.png",
  "img/oveja-2.png",
  "img/oveja-3.png"
];

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

  for (let i = 0; i < 5; i++) {
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
    setTimeout(() => {
      display.style.opacity = 0;
      display.style.transform = 'scale(0.5)';
      setTimeout(() => {
        display.innerHTML = `<h2>El resultado es: <br><br><br></h2>`;
        display.style.opacity = 1;
        display.style.transform = 'scale(1)';
        resultsBttn.disabled = false;
      }, 500);
    }, interval);
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
  const img = document.createElement('img');
  img.src = 'img/dice.png';
  display.appendChild(img);

  startBttn.disabled     = false;
  restartBttn.disabled   = true;
  resultsBttn.disabled   = true;
}

function showResults() {
  display.innerHTML = `<h2>
    El resultado es: <br>
    ${totalAnimales.vaca} Vaquitas <br>
    ${totalAnimales.cerdo} Chanchitos <br>
    ${totalAnimales.oveja} Ovejitas <br>
  </h2>`;
  resultsBttn.disabled = true;
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


