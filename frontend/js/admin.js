const API = "http://127.0.0.1:5000/admin";

// const user = JSON.parse(localStorage.getItem("user"));

// if (!user || user.role !== "admin") {
//   alert("Access Denied");
//   window.location.href = "home.html";
// }

function getToken(){
  return localStorage.getItem("token");
}

function logout(){
  localStorage.clear();
  window.location.href="login.html";
}

function goShop(){
  window.location.href="home.html";
}

async function loadUsers(){
  const res = await fetch(API + "/users", {
    headers:{ "Authorization":"Bearer " + getToken() }
  });

  const users = await res.json();

  let html = "<h2>Users</h2><table><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Action</th></tr>";

  users.forEach(u=>{
    html += `
      <tr>
        <td>${u.id}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          ${u.role !== "admin" ? `<button onclick="deleteUser(${u.id})">Delete</button>` : ""}
        </td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("content").innerHTML = html;
}

async function deleteUser(id){
  await fetch(API + "/users/" + id,{
    method:"DELETE",
    headers:{ "Authorization":"Bearer " + getToken() }
  });
  loadUsers();
}

// async function deleteUser(id) {
//   try {
//     const res = await fetch(API + "/users/" + id, {
//       method: "DELETE",
//       headers: {
//         "Authorization": "Bearer " + getToken()
//       }
//     });

//     let data = {};
//     try {
//       data = await res.json();
//     } catch (e) {
//       data = {};
//     }

//     if (!res.ok) {
//       alert(data.msg ? data.msg : "Delete failed (" + res.status + ")");
//       console.log("Delete error:", res.status, data);
//       return;
//     }

//     loadUsers();

//   } catch (error) {
//     console.log("Fetch failed:", error);
//     alert("Something went wrong.");
//   }
// }

async function loadOrders(){
  const res = await fetch(API + "/orders",{
    headers:{ "Authorization":"Bearer " + getToken() }
  });

  const orders = await res.json();

  let html = "<h2>Orders</h2><table><tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Change</th></tr>";

  orders.forEach(o=>{
    html += `
      <tr>
        <td>${o.order_id}</td>
        <td>${o.user_id}</td>
        <td>${o.total_amount}</td>
        <td>${o.status}</td>
        <td>
          <select onchange="updateStatus(${o.order_id}, this.value)">
            <option value="Placed">Placed</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("content").innerHTML = html;
}

async function updateStatus(order_id, status){
  await fetch(API + "/orders/" + order_id,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + getToken()
    },
    body:JSON.stringify({status})
  });

  loadOrders();
}

function showAddProduct(){
  document.getElementById("content").innerHTML = `
    <h2>Add Product</h2>
    <input id="pname" placeholder="Name"><br><br>
    <input id="pprice" placeholder="Price"><br><br>
    <input id="pimage" placeholder="Image filename"><br><br>
    <input type="number" id="product_quantity" placeholder="Quantity"><br><br>
    <button onclick="addProduct()">Add</button>
  `;
}

// async function addProduct(){
//   await fetch(API + "/products",{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer " + getToken()
//     },
//     body:JSON.stringify({
//       name: pname.value,
//       price: pprice.value,
//       image: pimage.value
//     })
//   });

//   alert("Product Added");
// }

async function addProduct() {

  const token = localStorage.getItem("token");

  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const image = document.getElementById("pimage").value;
  const quantity = document.getElementById("product_quantity").value;

  if (!name || !price || !image || !quantity) {
    alert("All fields are required");
    return;
  }

  const res = await fetch("http://127.0.0.1:5000/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      name: name,
      price: parseFloat(price),
      image: image,
      quantity: parseInt(quantity)
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  alert(data.msg);
}