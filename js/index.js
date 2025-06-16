let productos = [];

export const fetchData = async () => {
    let response = await fetch('https://fakestoreapi.com/products');
    let json = await response.json();
    console.log(json)
    productos = json;
}

let listContainer = document.getElementById("listContainer");

function crearCards() {
    if (productos.length > 0) {

        listContainer.innerHTML = ""
        let newRender = ""
        productos.forEach(producto => {
            let cardStructure =
                `<div class="col"> 
                    <div class="card h-100">
                        <div class="card-header h-65 overflow-hidden">
                            <span class="badge badge-custom position-absolute top-0 end-0 m-2">Nuevo</span>
                            <img src="${producto.image}" class="card-image" alt="${producto.title}">
                        </div>
                        <div class="card-body h-25">
                            <p class="card-title">${producto.title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="price">$${producto.price}</span>
                                </div>
                                <span class="badge bg-dark">${producto.rating.rate} ★</span>
                            </div>
                        </div>
                        <div class="card-footer bg-white h-10">
                            <button class="btn btn-primary btn-shop">
                                <i class="fas fa-cart-plus me-2"></i>Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>`

            newRender += cardStructure

        });
        listContainer.innerHTML = newRender
    }
}

async function cargarPagina() {
    await fetchData();
    crearCards()
}

cargarPagina()



const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});