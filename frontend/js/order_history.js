const API = "http://127.0.0.1:5000/shop";

function getToken(){
  return localStorage.getItem("token");
}

async function loadOrders(){
  const token = getToken();
  if(!token){
    alert("Please login first");
    window.location.href="login.html";
    return;
  }

  const res = await fetch(API + "/orders", {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();
  const box = document.getElementById("orders");
  box.innerHTML = "";

  if(!res.ok){
    alert(data.msg || "Failed to load orders");
    return;
  }

  if(data.orders.length === 0){
    box.innerHTML = "<p style='text-align:center;'>No orders yet</p>";
    return;
  }

  data.orders.forEach(o => {
    box.innerHTML += `
      <div class="order-card" id="order-${o.order_id}">
        <h3>Order ID: ${o.order_id}</h3>
        <p>Total: Rs ${o.total_amount}</p>
        <p>Status: ${o.status}</p>
        <p>Date: ${o.created_at}</p>
        <button onclick="viewDetails(${o.order_id})">View Items</button>
        <div class="items" id="items-${o.order_id}" style="display:none;"></div>
      </div>
    `;
  });
}

async function viewDetails(order_id){
  const token = getToken();
  const itemsDiv = document.getElementById("items-" + order_id);

  if(itemsDiv.style.display === "block"){
    itemsDiv.style.display = "none";
    return;
  }

  const res = await fetch(API + "/orders/" + order_id, {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();
  if(!res.ok){
    alert(data.msg || "Failed to load order details");
    return;
  }

  itemsDiv.innerHTML = "";
  data.items.forEach(it => {
    itemsDiv.innerHTML += `
      <p>${it.name} | Qty: ${it.quantity} | Rs ${it.price} | Subtotal: Rs ${it.subtotal}</p>
    `;
  });

  itemsDiv.style.display = "block";
}

window.onload = loadOrders;