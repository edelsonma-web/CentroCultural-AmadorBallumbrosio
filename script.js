/* ---------- REVEAL ---------- */
const reveals = document.querySelectorAll(".reveal");
function revealScroll() {
    reveals.forEach(r => {
        if (r.getBoundingClientRect().top < window.innerHeight * 0.85) {
            r.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealScroll);
window.onload = revealScroll;

/* ---------- CARRITO ---------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartItemsDiv = document.getElementById("cartItems");
const totalPriceSpan = document.getElementById("totalPrice");
const closeCart = document.getElementById("closeCart");
const confirmOrder = document.getElementById("confirmOrder");
const cartCount = document.getElementById("cartCount");

function updateCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        cartItemsDiv.innerHTML += `
            <div>
                <strong>${item.name}</strong> — S/ ${item.price} x ${item.qty}
                <button class="btn-sm" onclick="removeItem(${index})">X</button>
            </div>
        `;
    });

    totalPriceSpan.textContent = total;
    cartCount.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(i) {
    cart.splice(i, 1);
    updateCart();
}

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const existing = cart.find(p => p.name === name);
        if (existing) existing.qty++;
        else cart.push({ name, price, qty: 1 });

        updateCart();
    });
});

cartBtn.onclick = () => cartModal.style.display = "flex";
closeCart.onclick = () => cartModal.style.display = "none";

confirmOrder.onclick = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío.");

    let message = "Hola, quiero confirmar mi pedido:%0A%0A";
    cart.forEach(item => {
        message += `• ${item.name} - S/ ${item.price} x ${item.qty}%0A`;
    });

    const total = totalPriceSpan.textContent;
    message += `%0ATotal: S/ ${total}%0A`;
    message += `%0ADirección: ____%0AObservación: ____`;

    window.open("https://wa.me/51997575306?text=" + message);
};

updateCart();
