import { showDetails } from "./detail.js";
import { getProducts } from "./externalData.js";
import { getProductsInCart } from "./cart.js";

//Variables globales
const originalProducts = await getProducts();
let productos = [];
let productosEnCarrito = []
let listContainer = document.getElementById("listContainer");
let contador = document.getElementById("cart-count");
let buscador = document.getElementById("search")
let filters = document.querySelectorAll(".filter-links li")
let limpiar = document.getElementById("clean")

//Inicializacion Web
async function init() {
    productos = originalProducts;
    productosEnCarrito = getProductsInCart();
    crearCards()
    actualizarCardAdvice()
    actualizarCartCounter()
}

init()

//Funciones
function crearCards() {
    // if (productos.length > 0) {
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
    // }
}

export function actualizarCardAdvice() {
    productosEnCarrito = getProductsInCart();
    productosEnCarrito.forEach(prod => {
        let advice = document.getElementById(`cardAdvice-${prod.id}`)
        if (advice) advice.innerHTML = `Cantidad: ${prod.quantity.toString()} en el carrito`
    })
}

export function actualizarCartCounter() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    contador.textContent = totalQuantity; 
}

function actualizarFiltros(button) {
    filters.forEach(cat => {
        if (button.textContent == cat.textContent) {
            cat.classList.add("fw-bold")
            cat.classList.add("fs-6")
        } else {
            cat.classList.remove("fw-bold")
            cat.classList.remove("fs-6")
        }
    })
}

//Eventos
buscador.addEventListener("input", async (evt) => {
    if (evt.target.value.length >= 3) {
        let productosFiltrados = productos.filter(x => x.title.toLowerCase().includes(evt.target.value.toLowerCase()))
        productos = productosFiltrados;
        crearCards()
        actualizarCardAdvice()
    }
    if (evt.target.value.length == 0) {
        productos = originalProducts
        crearCards()
        actualizarCardAdvice()
    }
})

filters.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.textContent.trim();
        actualizarFiltros(button)
        productos = originalProducts
        let productosFiltrados = productos.filter(x => x.category.toLowerCase() == category.toLowerCase())
        productos = productosFiltrados;
        crearCards()
        actualizarCardAdvice()
    });
});

limpiar.addEventListener("click", () => {
    productos = originalProducts
    filters.forEach(cat => {
        cat.classList.remove("fw-bold")
        cat.classList.remove("fs-6")
    })
    crearCards()
    actualizarCardAdvice()
})