
const emptyCart = document.querySelector(".empty-cart");
const cartBody = document.getElementById("cart-body");
const totalEle = document.getElementById("total");
const cartContent =  document.querySelector(".add-rows");

let total = 0;

function showCart(){
     emptyCart.classList.add("hidden");
     cartContent.classList.remove("hidden")
}

function showEmptyCart(){
    cartContent.classList.add("hidden")
     emptyCart.classList.remove("hidden");
}

document.querySelectorAll(".toggle-btn").forEach(btn => {

    btn.addEventListener("click",function(){

        
       
        

        const service = this.closest(".service-items");

        const id = service.dataset.id;
        const name = service.dataset.name;
        const price = Number(service.dataset.price);


        // agr add state mei hai toh

        if(this.classList.contains("add")){

            // table me row add
         let newClass =  document.getElementsByClassName("add-Table");
            // emptyCart.style.display = "none";

            cartBody.innerHTML +=` <tr data-id="${id}">
                <td>${cartBody.children.length + 1}</td>
                <td>${name}</td>
                <td>₹ ${price}</td>
            </tr>
            `;

            showCart();

            //total update

            total += price;
            totalEle.innerText = total;

            this.innerText = "Remove Item ⊝";
            this.classList.remove("add");
            this.classList.add("remove");
        }
        else{

            const row = cartBody.querySelector(`tr[data-id="${id}"]`);

            if(row) row.remove();

            total -= price;
            totalEle.innerText = total;

            this.innerText = "Add Item ⊕";
            this.classList.remove("remove");
            this.classList.add("add");

            [...cartBody.children].forEach((tr,i) => {
                tr.children[0].innerText = i + 1;
            });

            if(cartBody.children.length == 0){
               showEmptyCart();
            }

        }

    })
})





