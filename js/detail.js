import { actualizarCardAdvice } from "../js/index.js";

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

closeModal.addEventListener('click', () => {
    clearDetail();
})

addToCart.addEventListener('click', () => {
    addProduct();
})


export const showDetails = (producto) => {
    openedProduct = producto
    image.src = producto.image
    image.alt = producto.id
    category.innerHTML = producto.category.toUpperCase()
    title.innerHTML = producto.title
    description.innerHTML = producto.description
    price.innerHTML = `$ ${producto.price}`
    rating.innerHTML = `${producto.rating.rate} ★`
}

function addProduct() {
    if (Number(quantity.value) < 0) return alert("No se ingresó una cantidad válida")
    let object = {
        id: openedProduct.id,
        price: openedProduct.price,
        quantity: Number(quantity.value)
    }
    let oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingIndex = oldCart.findIndex(item => item.id === object.id);

    if (existingIndex !== -1) {
        oldCart[existingIndex].quantity += object.quantity;
    } else {
        oldCart.push(object);
    }

    localStorage.setItem("cart", JSON.stringify(oldCart));
    closeModal.click();
    clearDetail();

}

function clearDetail() {
    openedProduct = null;
    image.src = ""
    image.alt = ""
    category.innerHTML = ""
    title.innerHTML = ""
    description.innerHTML = ""
    price.innerHTML = ""
    rating.innerHTML = ""
    quantity.value = 0
    console.log("entre al detail")
    actualizarCardAdvice()  
}
