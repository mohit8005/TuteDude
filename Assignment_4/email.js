// 🔹 EmailJS init
(function () {
  emailjs.init({
    publicKey: "m-n_VmnkidcjOOiF_",
  });
})();

var   cartBody = document.getElementById("cart-body");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");


function getCartItemsText(){

    const rows = cartBody.querySelectorAll("tr");
    let itemsText = "";

    rows.forEach((row, index) => {
        const name = row.children[1].innerText.trim();
        const price = row.children[2].innerText.trim();

        itemsText += `${index + 1}. ${name} - ${price} \n`;
    });

    return itemsText;

}



// 🔹 MAIN VALIDATION FUNCTION
function checkFormValidity() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const cartHasItem = cartBody.children.length > 0;

  submitBtn.disabled = !(name && email && phone && emailValid && cartHasItem);
}

// 🔹 INPUT CHANGE
[nameInput, emailInput, phoneInput].forEach(input => {
  input.addEventListener("input", checkFormValidity);
});

// 🔹 CART CHANGE LISTENER (FROM script.js)
window.addEventListener("cart-change", () => {
  checkFormValidity();
});


// form reset

// function cartReset(){

// }



// 🔹 FORM SUBMIT
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (submitBtn.disabled) {
    statusMsg.innerText =
      "Please fill all details and select at least one service.";
    statusMsg.style.color = "red";
    return;
  }

  const itemsBooked = getCartItemsText()
// console.log("ITEMS SENT:", itemsBooked);

  emailjs.send("service_8risi6s", "template_a4q6ywj", {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    bookedItems : itemsBooked
  })
  .then(() => {
    statusMsg.innerText = "ⓘ Email has been sent successfully";
    statusMsg.style.color = "green";

    document.getElementById("bookingForm").reset();
    document.getElementsByClassName("table").reset();
    submitBtn.disabled = true;

  })
//   .catch(() => {
//     statusMsg.innerText = "ⓘ Failed to send email. Try again.";
//     statusMsg.style.color = "#e77b95";
//   });
  .catch(err => {
  console.log(err);
});
});
