import { actualizarCardAdvice, actualizarCartCounter } from "../js/index.js";

let image = document.getElementById("detailCardImage");
let category = document.getElementById("detailCardCategory");
let title = document.getElementById("staticBackdropLabel");
let description = document.getElementById("detailCardDescription");
let price = document.getElementById("detailCardPrice");
let rating = document.getElementById("detailCardRating");
let quantity = document.getElementById("productQuantityInput");
let addToCart = document.getElementById("detailCardAddToCart");
let closeModal = document.getElementById("detailCardClose");

let openedProduct = null;

// Event listeners para cerrar modal y agregar producto
closeModal.addEventListener("click", clearDetail);
addToCart.addEventListener("click", addProduct);

// Mostrar detalles del producto en el modal
export const showDetails = (producto) => {
    openedProduct = producto;

    // Actualizar contenido del modal
    image.src = producto.image;
    image.alt = producto.id;
    category.textContent = producto.category.toUpperCase();
    title.textContent = producto.title;
    description.textContent = producto.description;
    price.textContent = `$ ${producto.price}`;
    rating.textContent = `${producto.rating.rate} ★`;
    quantity.value = 1;

    // Botones para aumentar o disminuir cantidad
    setupQuantityButtons();
};

// Función para configurar los eventos de los botones + y -
function setupQuantityButtons() {
    const increaseBtnOld = document.getElementById("btn-increase");
    const decreaseBtnOld = document.getElementById("btn-decrease");

    // Clonamos para eliminar event listeners previos y evitar duplicados
    const increaseBtn = increaseBtnOld.cloneNode(true);
    const decreaseBtn = decreaseBtnOld.cloneNode(true);

    increaseBtnOld.replaceWith(increaseBtn);
    decreaseBtnOld.replaceWith(decreaseBtn);

    increaseBtn.addEventListener("click", () => {
        quantity.value = Number(quantity.value) + 1;
    });

    decreaseBtn.addEventListener("click", () => {
        const current = Number(quantity.value);
        if (current > 1) quantity.value = current - 1;
    });
}

// Función que agrega el producto con la cantidad seleccionada al carrito
function addProduct() {
    const cantidad = Number(quantity.value);
    if (isNaN(cantidad) || cantidad < 1) {
        alert("No se ingresó una cantidad válida");
        return;
    }

    const productToAdd = {
        id: openedProduct.id,
        price: openedProduct.price,
        quantity: cantidad,
        title: openedProduct.title,
        image: openedProduct.image
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productToAdd.id);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += productToAdd.quantity;
    } else {
        cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    closeModal.click();
    clearDetail();
}

// Limpia el modal y actualiza el contador y consejos
function clearDetail() {
    openedProduct = null;
    image.src = "";
    image.alt = "";
    category.textContent = "";
    title.textContent = "";
    description.textContent = "";
    price.textContent = "";
    rating.textContent = "";
    quantity.value = 0;

    actualizarCardAdvice();
    actualizarCartCounter();
}
