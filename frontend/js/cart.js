const API = "http://127.0.0.1:5000/shop";

function getToken(){
  return localStorage.getItem("token");
}

async function loadCart(){
  const token = getToken();
  if(!token){
    alert("Please login first");
    window.location.href="login.html";
    return;
  }

  const res = await fetch(API + "/cart", {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  if(!res.ok){
    alert(data.msg || "Failed to load cart");
    return;
  }

  if(data.items.length === 0){
    container.innerHTML = "<p style='text-align:center;'>Cart is empty</p>";
    document.getElementById("totalAmount").innerText = "Rs 0";
    return;
  }

  data.items.forEach(item => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="images/${item.image}">
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Price: Rs ${item.price}</p>
          <p>Subtotal: Rs ${item.subtotal}</p>
          <div class="qty-box">
            <button onclick="changeQty(${item.product_id}, ${item.quantity - 1})">-</button>
            <b>${item.quantity}</b>
            <button onclick="changeQty(${item.product_id}, ${item.quantity + 1})">+</button>
            <button class="remove-btn" onclick="removeItem(${item.product_id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("totalAmount").innerText = "Rs " + data.total;
}

async function changeQty(product_id, qty){
  const token = getToken();

  const res = await fetch(API + "/cart/update", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body: JSON.stringify({ product_id: product_id, quantity: qty })
  });

  const data = await res.json();
  if(!res.ok){
    alert(data.msg || "Update failed");
    return;
  }
  loadCart();
}

async function removeItem(product_id){
  const token = getToken();

  const res = await fetch(API + "/cart/remove", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body: JSON.stringify({ product_id: product_id })
  });

  const data = await res.json();
  if(!res.ok){
    alert(data.msg || "Remove failed");
    return;
  }
  loadCart();
}

async function placeOrder(){
  const token = getToken();

  const res = await fetch(API + "/order/place", {
    method:"POST",
    headers:{
      "Authorization":"Bearer " + token
    }
  });

  const data = await res.json();
  if(!res.ok){
    alert(data.msg || "Order failed");
    return;
  }

  alert("Order placed! Order ID: " + data.order_id);
  window.location.href = "order_history.html";
}

window.onload = loadCart;