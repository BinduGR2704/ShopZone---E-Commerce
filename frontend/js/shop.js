
// const API = "http://127.0.0.1:5000/shop";


// //////////////////////////////////////////
// // LOAD PRODUCTS
// //////////////////////////////////////////

// async function loadProducts(){

// try{

// let res = await fetch(API + "/products");

// let products = await res.json();

// let container = document.getElementById("products");

// container.innerHTML="";

// products.forEach(p=>{

// container.innerHTML +=`

// <div class="product-card">

// <img src="images/${p.image}" >

// <h3>${p.name}</h3>

// <p>Rs ${p.price}</p>

// <button onclick="addToCart(${p.id})">

// Add To Cart

// </button>

// </div>

// `;

// });

// }catch(e){

// console.log("Product Load Error:",e);

// alert("Failed loading products");

// }

// }



// //////////////////////////////////////////
// // ADD TO CART
// //////////////////////////////////////////

// async function addToCart(product_id){

// let token = localStorage.getItem("token");

// if(!token){

// alert("Login First");

// window.location.href="login.html";

// return;

// }

// let res = await fetch(API+"/add-cart",{

// method:"POST",

// headers:{

// "Content-Type":"application/json",

// "Authorization":"Bearer "+token

// },

// body:JSON.stringify({

// product_id:product_id

// })

// });

// let result = await res.json();

// alert(result.msg);

// }



// //////////////////////////////////////////
// // AUTO LOAD
// //////////////////////////////////////////

// window.onload = loadProducts;

const API = "http://127.0.0.1:5000/shop";

async function loadProducts() {
  try {
    const res = await fetch(API + "/products");
    const products = await res.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
      container.innerHTML += `
        <div class="product-card">
          <img src="images/${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>Rs ${p.price}</p>
          <button onclick="addToCart(${p.id})">Add To Cart</button>
        </div>
      `;
    });

  } catch (e) {
    console.log(e);
    alert("Failed to load products");
  }
}

// async function addToCart(product_id) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first to add items to cart");
//     window.location.href = "login.html";
//     return;
//   }

//   try {
//     const res = await fetch(API + "/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + token
//       },
//       body: JSON.stringify({ product_id })
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.msg || "Add to cart failed");
//       return;
//     }

//     alert("Added to cart ✅");

//   } catch (e) {
//     console.log(e);
//     alert("Add to cart failed");
//   }
// }

async function addToCart(product_id) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const quantity = 1; // default add 1

  const res = await fetch(API + "/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      product_id: product_id,
      quantity: quantity
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg);  // 🔥 shows quantity exceeded message
    return;
  }

  alert("Added to cart ✅");
}

// window.onload = loadProducts;
window.addEventListener("DOMContentLoaded", () => {
  loadProducts();

  const btn = document.getElementById("searchBtn");
  if (btn) {
    btn.addEventListener("click", searchProducts);
  }
});

async function searchProducts() {
  const query = document.getElementById("searchInput").value;

  let url = API + "/products";

  if (query) {
    url += "?search=" + query;
  }

  const res = await fetch(url);
  const products = await res.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="images/${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Rs ${p.price}</p>
        <button onclick="addToCart(${p.id})">Add To Cart</button>
      </div>
    `;
  });
}