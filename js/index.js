import { showDetails } from "./detail.js";
import { getProducts } from "./externalData.js";
import { getProductsInCart } from "./cart.js";

//Variables globales
let productos = [];
let productosEnCarrito = []
let listContainer = document.getElementById("listContainer");
let contador = document.getElementById("cart-count");

//Inicializacion Web
async function init() {
    productos = await getProducts();
    productosEnCarrito = getProductsInCart();
    crearCards()
    actualizarCardAdvice()
    actualizarCartCounter()
}

init()

//Funciones
function crearCards() {
    if (productos.length > 0) {

        listContainer.innerHTML = ""
        let newRender = ""

        productos.forEach(producto => {
            let cardStructure =
                `<div class="col" id="card-${producto.id}"> 
                    <div class="card h-100">
                        <div class="card-header h-65 overflow-hidden">
                            <span class="badge badge-custom position-absolute top-0 end-0 m-2">Nuevo</span>
                            <img src="${producto.image}" class="card-image" alt="${producto.title}">
                        </div>
                        <div class="card-body h-25">
                            <p class="card-title">${producto.title}</p>
                            <div class="card-advice">
                                <p id="cardAdvice-${producto.id}"></p>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="price">$${producto.price}</span>
                                </div>
                                <span class="badge bg-dark">${producto.rating.rate} ★</span>
                            </div>
                        </div>
                        <div class="card-footer bg-white h-10">
                            <button class="btn btn-primary btn-detail" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="${producto.id}">
                                <i class="fas fa-thin fa-basket-shopping"></i> Comprar
                            </button>
                        </div>
                    </div>
                </div>`

            newRender += cardStructure
        });
        listContainer.innerHTML = newRender

        document.querySelectorAll(".btn-detail").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.id;
                const result = productos.find(x => x.id == id)
                showDetails(result);
            });
        });
    }
}

export function actualizarCardAdvice () {
    productosEnCarrito = getProductsInCart();
    productosEnCarrito.forEach(prod => {
        let advice = document.getElementById(`cardAdvice-${prod.id}`)
        advice.innerHTML = `Cantidad: ${prod.quantity.toString()} en el carrito`
    })
}

export function actualizarCartCounter () {
    productosEnCarrito = getProductsInCart();
    console.log(productosEnCarrito)
    contador.innerHTML = productosEnCarrito.map(x => x.quantity).reduce((a,b) => a+b)
}