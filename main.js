const $tablero = document.querySelector('.tablero');

const desordenar = () => {
  let matrizMezclada = [
    [],
    [],
    []
  ]

  let arreglo = ['1', '2', '3', '4', '5', '6', '7', '8', ''];
  let arregloMezclado = arreglo.sort(() => Math.random() - .5)
  
  let columna = 0,
      fila = 0;

  arregloMezclado.map(elemento => {
    matrizMezclada[fila].push(elemento)
    if(columna < 2){
      columna++;
    }else{
      columna = 0;
      fila++
    }
  })
  return matrizMezclada

}

const matriz = desordenar();

const dibujarFichas = () => {
  $tablero.innerHTML = '';
  matriz.forEach(fila => fila.forEach(e => {
    e == '' 
    ? $tablero.innerHTML += `<div class='vacio'>${e}</div>` 
    : $tablero.innerHTML += `<div class='elemento'>${e}</div>`
  }));
}

const buscarPosicion = (elemento) => {

  let filaIndex = 0,
      columnIndex = 0;

  matriz.forEach((fila, index) => {
    let elementoFila = fila.findIndex(item => item == elemento);
    if(elementoFila != -1){
      filaIndex = index;
      columnIndex = elementoFila;
    }
  })
  return [filaIndex, columnIndex];
}

const validarMovimiento = (posicionActual, posicionVacia) => {
  if(posicionActual[1] == posicionVacia[1]){ 
    if(posicionActual[0] - posicionVacia[0] > 1 || posicionActual[0] - posicionVacia[0] < -1){
      return false
    }     
    // if(posicionActual[0] - posicionVacia[0] === -1){
    //   return 'abajo';
    // } else if(posicionActual[0] - posicionVacia[0] === 1){
      
    //   return 'arriba';
    // } else {
    //   return false
    // }
  }else if(posicionActual[0] == posicionVacia[0]){
    if(posicionActual[1] - posicionVacia[1] > 1 || posicionActual[1] - posicionVacia[1] < -1)
    return false  
    //   if(posicionActual[1] - posicionVacia[1] === -1){
  //     return 'derecha';
  //   } else if(posicionActual[1] - posicionVacia[1] === 1){
  //     return 'izquierda';
  //   } else {
  //     return false
  //   }
  } else {
    return false
  }
  
}

const actualizarMatriz = (elemento, posicionActual, posicionVacia) => {
  matriz[posicionActual[0]][[posicionActual[1]]] = '';
  matriz[posicionVacia[0]][posicionVacia[1]] = elemento;
}

const compararMatriz = () => {
  let contador = 0;
  let matrizFinal = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '']
  ];
  matriz.map((fila, indexFila) => {
    fila.forEach((elemento, indexCol) => {
      if(elemento == matrizFinal[indexFila][indexCol]){
        contador++
      }
    })
  })
  if(contador == 9){
    return true
  }else {
    return false
  }
}

const agregarEscuchas = () => {
  const $elementos = document.querySelectorAll('.elemento');
  $elementos.forEach(e => e.addEventListener('click', () => {
    let posicionActual = buscarPosicion(e.innerText);
    let posicionVacia = buscarPosicion('');
    let movimiento = validarMovimiento(posicionActual, posicionVacia);
    
    if(movimiento != false){
      actualizarMatriz(e.innerText, posicionActual, posicionVacia);
      let resultado = compararMatriz()
      if(resultado){
        confetti({
          particleCount: 150,
          spread: 180
        });
      }
      dibujarFichas();
      agregarEscuchas();
    }
  }))
}



dibujarFichas();
agregarEscuchas();

