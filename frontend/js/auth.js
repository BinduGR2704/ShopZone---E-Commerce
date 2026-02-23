// const API="http://localhost:5000/auth";


// async function register(){

// let data={

// username:document.getElementById("username").value,

// email:document.getElementById("email").value,

// password:document.getElementById("password").value,

// gender:document.getElementById("gender").value,

// phone:document.getElementById("phone").value,

// address:document.getElementById("address").value

// }

// let res=await fetch(API+"/register",{

// method:"POST",

// headers:{

// "Content-Type":"application/json"

// },

// body:JSON.stringify(data)

// })

// let result=await res.json();

// alert(result.msg);

// }



// async function login(){

// let data={

// username:document.getElementById("login_username").value,

// password:document.getElementById("login_password").value

// }

// let res=await fetch(API+"/login",{

// method:"POST",

// headers:{

// "Content-Type":"application/json"

// },

// body:JSON.stringify(data)

// })

// let result=await res.json();

// if(result.token){

// localStorage.setItem("token",result.token);

// alert("Login Success");

// }

// else{

// alert(result.msg);

// }

// }


// const API="http://127.0.0.1:5000/auth";



// /* ===================
// REGISTER
// =================== */

// async function register(){

// try{

// let data={

// username:username.value,
// email:email.value,
// password:password.value,
// gender:gender.value,
// phone:phone.value,
// address:address.value

// };

// let res=await fetch(API+"/register",{

// method:"POST",

// headers:{

// "Content-Type":"application/json"

// },

// body:JSON.stringify(data)

// });

// let result=await res.json();

// alert(result.msg);

// if(res.ok){

// window.location.href="home.html";

// }

// }catch(e){

// alert("Register Failed");

// console.log(e);

// }

// }



// /* ===================
// LOGIN
// =================== */

// async function login() {
//   try {
//     let data = {
//       username: login_username.value,
//       password: login_password.value
//     };

//     let res = await fetch(API + "/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     // If server sends non-json error page
//     if (!res.ok) {
//       const txt = await res.text();
//       console.log("Login server error:", txt);
//       alert("Login failed (server error)");
//       return;
//     }

//     let result = await res.json();
//     console.log("LOGIN RESPONSE:", result);

//     if (result.token) {
//       // clear old stored values
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       localStorage.setItem("token", result.token);

//       // ✅ IMPORTANT: only store if user exists
//       if (result.user) {
//         localStorage.setItem("user", JSON.stringify(result.user));
//       } else {
//         alert("Backend is not sending user details. Fix /auth/login to return user.");
//         console.log("Missing result.user in response:", result);
//         return;
//       }

//       alert("Login Successful");
//       window.location.href = "home.html";
//     } else {
//       alert(result.msg || "Invalid login");
//     }
//   } catch (e) {
//     console.log(e);
//     alert("Login Failed");
//   }
// }
// function toggleProfileMenu(){

// let menu=document.getElementById("profileDropdown");

// if(menu.style.display==="block"){

// menu.style.display="none";

// }
// else{

// menu.style.display="block";

// }

// }

// function logout(){

// localStorage.removeItem("token");

// alert("Logged Out Successfully");

// window.location.href="home.html";

// }

// /* ===================
// PROFILE MENU
// =================== */

// function toggleProfile(){

// let menu=document.getElementById("profileMenu");

// if(menu.style.display==="flex")

// menu.style.display="none";

// else

// menu.style.display="flex";

// }



// /* ===================
// LOGOUT
// =================== */

// function logout(){

// localStorage.clear();

// window.location.href="login.html";

// }



// /* ===================
// PROFILE DETAILS
// =================== */

// function myProfile(){

// let user=

// JSON.parse(localStorage.getItem("user"));

// alert(

// "Username:"+user.username+

// "\nEmail:"+user.email+

// "\nPhone:"+user.phone+

// "\nAddress:"+user.address

// );

// }

// ===================
// PROFILE DROPDOWN (home.html)
// ===================

// function toggleProfileMenu(){
//   const menu = document.getElementById("profileDropdown");
//   if(!menu){
//     console.log("profileDropdown not found on this page.");
//     return;
//   }

//   menu.style.display = (menu.style.display === "block") ? "none" : "block";
// }


// // ===================
// // LOGOUT (keep ONLY ONE logout function)
// // ===================

// function logout(){
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   alert("Logged Out Successfully");
//   window.location.href="home.html";
// }


// // ===================
// // PROFILE DETAILS (fix undefined issue)
// // ===================

// function myProfile(){

//   const userStr = localStorage.getItem("user");

//   if(!userStr){
//     alert("User details not found. Please login again.");
//     window.location.href="login.html";
//     return;
//   }

//   const user = JSON.parse(userStr);

//   alert(
//     "Username : " + (user.username ?? "") +
//     "\nEmail : " + (user.email ?? "") +
//     "\nPhone : " + (user.phone ?? "") +
//     "\nAddress : " + (user.address ?? "") +
//     "\nRole : " + (user.role ?? "")
//   );
// }

const API = "http://127.0.0.1:5000/auth";


/* ===================
REGISTER
=================== */
async function register() {
  try {
    const data = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value
    };

    const res = await fetch(API + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // Handle non-json responses
    let result;
    try {
      result = await res.json();
    } catch {
      const txt = await res.text();
      console.log("Register non-JSON response:", txt);
      alert("Register failed (server error)");
      return;
    }

    alert(result.msg || "Registered");

    if (res.ok) {
      window.location.href = "home.html";
    }
  } catch (e) {
    console.log(e);
    alert("Register Failed");
  }
}


/* ===================
LOGIN
=================== */
async function login() {
  try {
    const data = {
      username: document.getElementById("login_username").value,
      password: document.getElementById("login_password").value
    };

    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log("LOGIN RESPONSE:", result);

    if (!result.token) {
      alert(result.msg || "Invalid login");
      return;
    }

    // Clear old storage
    localStorage.clear();

    // Save token + user
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    alert("Login Successful");

    // 🔥 STRICT ROLE CHECK
    if (result.user && result.user.role === "admin") {
      console.log("Redirecting to admin...");
      window.location.replace("admin.html");
    } else {
      console.log("Redirecting to home...");
      window.location.replace("home.html");
    }

  } catch (e) {
    console.log(e);
    alert("Login Failed");
  }
}

/* ===================
LOGOUT
=================== */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("Logged Out Successfully");
  window.location.href = "home.html";
}



/* ===================
FETCH PROFILE USING JWT
=================== */
async function myProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(API + "/profile", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Failed to fetch profile");
      return;
    }

    // Save user for later use (optional)
    localStorage.setItem("user", JSON.stringify(data.user));

    const user = data.user;

    alert(
      "Username : " + (user.username ?? "") +
      "\nEmail : " + (user.email ?? "") +
      "\nPhone : " + (user.phone ?? "") +
      "\nAddress : " + (user.address ?? "") +
      "\nRole : " + (user.role ?? "")
    );
  } catch (e) {
    console.log(e);
    alert("Profile fetch failed");
  }
}

/* ===================
PROFILE DROPDOWN (HOME)
=================== */
function toggleProfileMenu() {
  const menu = document.getElementById("profileDropdown");
  if (!menu) return;

  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
}

/* ===================
AUTH GUARD (OPTIONAL)
Use this on protected pages (profile/cart)
Add in HTML: <body onload="requireLogin()">
=================== */
function requireLogin() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
  }
}

// async function loadProfilePage() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("Please login first");
//     window.location.href = "login.html";
//     return;
//   }

//   try {
//     const res = await fetch("http://127.0.0.1:5000/auth/profile", {
//       method: "GET",
//       headers: {
//         "Authorization": "Bearer " + token
//       }
//     });

//     const data = await res.json();
//     console.log("PROFILE RESPONSE:", data);

//     if (!res.ok) {
//       alert(data.msg || "Failed to load profile");
//       return;
//     }

//     const user = data.user;

//     document.getElementById("profile").innerHTML = `
//       <p><b>Username :</b> ${user.username ?? ""}</p>
//       <p><b>Email :</b> ${user.email}</p>
//       <p><b>Phone :</b> ${user.phone}</p>
//       <p><b>Address :</b> ${user.address}</p>
//       <p><b>Role :</b> ${user.role}</p>
//       <button onclick="logout()">Logout</button>
//     `;
//   } catch (e) {
//     console.log(e);
//     alert("Profile fetch failed");
//   }
// }

async function loadProfilePage() {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch("http://127.0.0.1:5000/auth/profile", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  const user = data.user;

  document.getElementById("profileView").innerHTML = `
    <p><b>Username:</b> ${user.username}</p>
    <p><b>Email:</b> ${user.email}</p>
    <p><b>Phone:</b> ${user.phone || ""}</p>
    <p><b>Address:</b> ${user.address || ""}</p>
    <p><b>Role:</b> ${user.role}</p>
  `;

  // Pre-fill edit fields
  document.getElementById("edit_phone").value = user.phone || "";
  document.getElementById("edit_address").value = user.address || "";
}

function goOrderHistory(){
  window.location.href = "order_history.html";
}

/* ===================
ENABLE EDIT MODE
=================== */
function enableEdit() {
  document.getElementById("editSection").style.display = "block";
  document.getElementById("editBtn").style.display = "none";
}

/* ===================
CANCEL EDIT MODE
=================== */
function cancelEdit() {
  document.getElementById("editSection").style.display = "none";
  document.getElementById("editBtn").style.display = "inline-block";
}

async function updateProfile() {

  const token = localStorage.getItem("token");

  const phone = document.getElementById("edit_phone").value;
  const address = document.getElementById("edit_address").value;

  const res = await fetch("http://127.0.0.1:5000/auth/update-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      phone: phone,
      address: address
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  alert("Profile Updated Successfully ✅");

  cancelEdit();
  loadProfilePage();
}