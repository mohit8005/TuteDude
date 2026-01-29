const emptyCart = document.querySelector(".empty-cart");
var cartBody = document.getElementById("cart-body");
const totalEle = document.getElementById("total");
const cartContent = document.querySelector(".add-rows");

let total = 0;

// 🔔 CART CHANGE EVENT
function notifyCartChange() {
  window.dispatchEvent(new Event("cart-change"));
}

function showCart() {
  emptyCart.classList.add("hidden");
  cartContent.classList.remove("hidden");
}

function showEmptyCart() {
  cartContent.classList.add("hidden");
  emptyCart.classList.remove("hidden");
}

function clearFullCart() {

  cartBody.innerHTML = "";
  total = 0;
  totalEle.innerText = total;

  showEmptyCart();

  document.querySelectorAll(".service-items").forEach(
    service => {

      const btn = service.querySelector(".toggle-btn");
      
      if(btn){
        btn.innerText = "Add Item ⊕";
      btn.classList.remove("remove");
      btn.classList.add("add");
      }
    });

    notifyCartChange();

}

document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", function () {

    const service = this.closest(".service-items");
    const id = service.dataset.id;
    const name = service.dataset.name;
    const price = Number(service.dataset.price);

    // ➕ ADD ITEM
    if (this.classList.contains("add")) {

      cartBody.innerHTML += `
        <tr data-id="${id}">
          <td>${cartBody.children.length + 1}</td>
          <td>${name}</td>
          <td>₹ ${price}</td>
        </tr>
      `;

      showCart();

      total += price;
      totalEle.innerText = total;

      this.innerText = "Remove Item ⊝";
      this.classList.remove("add");
      this.classList.add("remove");

      notifyCartChange(); // 🔥 IMPORTANT
    }

    // ➖ REMOVE ITEM
    else {
      const row = cartBody.querySelector(`tr[data-id="${id}"]`);
      if (row) row.remove();

      total -= price;
      totalEle.innerText = total;

      this.innerText = "Add Item ⊕";
      this.classList.remove("remove");
      this.classList.add("add");

      // serial re-order
      [...cartBody.children].forEach((tr, i) => {
        tr.children[0].innerText = i + 1;
      });

      if (cartBody.children.length === 0) {
        showEmptyCart();
      }

      notifyCartChange(); // 🔥 IMPORTANT
    }
  });
});

window.clearFullCart = clearFullCart;
