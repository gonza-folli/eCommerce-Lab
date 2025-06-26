import { actualizarCartCounter, actualizarCardAdvice } from "../js/index.js";

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Función para obtener los productos guardados en el carrito desde localStorage
export const getProductsInCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Calcula y actualiza el total del carrito en la UI
function updateTotalPrice(cart) {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("cart-total").innerText = `$${total.toFixed(2)}`;
}

// Elimina un producto del carrito por su id y actualiza la UI y contadores
function removeFromCart(id) {
    let cart = getProductsInCart();
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    renderCartItems();
    actualizarCartCounter();
    actualizarCardAdvice();
}

// Renderiza los productos dentro del carrito en el sidebar, con sus botones y eventos
function renderCartItems() {
    const itemsContainer = document.getElementById("cart-items");
    const cart = getProductsInCart();
    itemsContainer.innerHTML = "";

    // Mostrar mensaje si el carrito está vacío
    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="empty-cart-message">El carrito está vacío.</p>`;
        document.getElementById("cart-total").innerText = "$0.00";
        return;
    }

    // Crear y agregar cada producto al DOM
    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <div class="cart-item-inner">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image" />
            <div class="cart-item-details">
              <p class="cart-item-title">${item.title}</p>
              <div class="quantity-control">
                <button class="btn btn-sm btn-secondary btn-qty" data-id="${item.id}" data-action="decrease">-</button>
                <input type="text" class="quantity-input" value="${item.quantity}" readonly />
                <button class="btn btn-sm btn-secondary btn-qty" data-id="${item.id}" data-action="increase">+</button>
              </div>
              <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
              <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">Eliminar</button>
            </div>
          </div>
        `;
        itemsContainer.appendChild(div);
    });

    // Añadir eventos para botones eliminar producto
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            removeFromCart(id);
        });
    });

    // Añadir eventos para botones aumentar o disminuir cantidad
    document.querySelectorAll(".btn-qty").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = Number(e.currentTarget.getAttribute("data-id"));
            const action = e.currentTarget.getAttribute("data-action");

            let cart = getProductsInCart();
            const index = cart.findIndex(item => item.id === id);
            if (index === -1) return;

            if (action === "increase") {
                cart[index].quantity += 1;
            } else if (action === "decrease") {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) {
                    // Quitar producto si la cantidad llega a 0 o menos
                    cart.splice(index, 1);
                }
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            actualizarCartCounter();
            actualizarCardAdvice();
        });
    });

    // Actualizar el total del carrito
    updateTotalPrice(cart);
}

// Eventos para abrir el carrito y mostrar overlay
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    renderCartItems();
});

// Evento para cerrar carrito y overlay con el botón de cerrar
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    actualizarCartCounter();
});

// Evento para cerrar carrito y overlay al hacer click fuera del sidebar
overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Vaciar carrito y actualizar todo
clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCartItems();
    actualizarCartCounter();
    actualizarCardAdvice();
});
