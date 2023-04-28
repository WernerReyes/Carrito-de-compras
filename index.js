const carrito = document.getElementById("carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrritoBtn = document.getElementById("vaciar-carrito");
const contenedorAbuelo = document.querySelector("#contenedorAbuelo");

let  precioTotal = document.querySelector(".precioTotal");
let  cantidadTotal = document.querySelector(".cantidadTotal");
let precioT = 0;
let cont = 0;


let articulosCarrito = [];

cargarEventosListerners();
function cargarEventosListerners() {

   // Agregando juegos
    contenedorAbuelo.addEventListener("click", agregarJuegos);
   
   // Eliminando juegos del carrito
   carrito.addEventListener("click", eliminarJuego)

   // Vaciar todo el carrito
   vaciarCarrritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el carrito
    
    precioT = 0; // Reiniciamos la suma
    cont = 0;
    cantidadTotal.textContent = 0;

    limpiarHTML(); // Eliminamos todo el HTML

   
    
   })
}


function agregarJuegos(e) {
    e.preventDefault();

    if(e.target.classList.contains("comprar")){
      const juegoSeleccionado = e.target.parentElement.parentElement;

      leerDatosJuegos(juegoSeleccionado);
      cont++;
      cantidadTotal.textContent = cont;
    }
    precioTotal.innerHTML = `$${precioT}`;
}

function eliminarJuego(e){
    if(e.target.classList.contains("borrar-juego")){
       const juegoId = e.target.getAttribute("data-id");


       // Buscar el objeto correspodiente
       const juegoIndex = articulosCarrito.findIndex( juego => juego.id === juegoId);
       const juego = articulosCarrito[juegoIndex];
       
       let acum = 0 
       acum += parseInt(juego.precio.replace("$",""));
       cont -= juego.cantidad;
       
       precioT = acum*cont;

       precioTotal.textContent = precioT;
       cantidadTotal.textContent = cont;
       
       
       if(articulosCarrito.length === 1){
          carrito.firstElementChild.style.boxShadow = "";
       } // Si el articulo es igual a 1 se elimina el borde


       articulosCarrito.splice(juegoIndex, 1);

       carritoHTMl() // Volvemos a iterar sobre el carrito y mostramos el HTML
    }

}


function leerDatosJuegos(juego) {
  // console.log(juego)

  // Creamos un objeto con el contenido actual
  const infoJuego =  {
    imagen: juego.querySelector("img").src,
    titulo: juego.querySelector("h4").textContent,
    precio: juego.querySelector(".precio").textContent,
    id: juego.querySelector(".comprar").getAttribute("data-id"),
    cantidad: 1
    
  }
  
  // Revisamos si el elemento ya existe en el carrito
  const existe = articulosCarrito.some( juego => juego.id === infoJuego.id);
  if(existe){
    // Actualizamos la cantidad
    const juegos = articulosCarrito.map (juego => {
        if(juego.id === infoJuego.id) {
            juego.cantidad++;
            precioT += parseInt(juego.precio.replace("$",""));
            return juego; // Retorna el objeto actualizado
        }
        return juego; // Retorna el objeto no duplicado
    })
   
    articulosCarrito = [...juegos];

  } else {
    precioT += parseInt(infoJuego.precio.replace("$",""));
    // Agregamos elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoJuego];
  }

  carritoHTMl();
}



function carritoHTMl() {
    
    // Limpiamos el HTML
    limpiarHTML();

    // Recorremos el carrito y generamos el HTML
articulosCarrito.forEach( juego => {

    const {imagen, titulo, precio, cantidad, id} = juego;
    const row = document.createElement("TR");
    row.innerHTML = `
    <td> <img src="${imagen}" width="150"> </td>
    <td> ${titulo} </td>
    <td> ${precio} </td>
    <td> ${cantidad} </td>
    <td> <a href="#" class="borrar-juego" data-id="${id}"> X </a> </td>
    `;

    contenedorCarrito.appendChild(row);
})


}

// Eliminar los juegos del tbody
function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}