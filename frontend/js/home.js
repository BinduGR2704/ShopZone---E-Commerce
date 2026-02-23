
// const API="http://127.0.0.1:5000";


// function toggleProfile(){

// let d=document.getElementById("dropdown");

// d.style.display=d.style.display==="block"?"none":"block";

// }


// async function loadProfile(){

// let token=localStorage.getItem("token");

// if(!token)return;


// let res=await fetch(API+"/user/profile",{

// headers:{

// Authorization:"Bearer "+token

// }

// });

// let data=await res.json();

// document.getElementById("username").innerHTML=

// "Hello "+data.username;

// }


// function logout(){

// localStorage.removeItem("token");

// alert("Logged Out");

// window.location.href="home.html";

// }


// function viewProfile(){

// window.location.href="profile.html";

// }


// function orderHistory(){

// alert("Order history coming next phase");

// }


// function gotoItems(){

// alert("Items page coming next");

// }



// loadProfile();

// let token = localStorage.getItem("token");


// // LOGIN CHECK

// if(token){

// document.getElementById("regLink").style.display="none";

// document.getElementById("loginLink").style.display="none";

// document.getElementById("profileArea").style.display="inline-block";

// }



// function toggleProfile(){

// let drop=document.getElementById("dropdown");

// drop.style.display=

// drop.style.display==="block"

// ? "none"

// : "block";

// }



// function logout(){

// localStorage.removeItem("token");

// alert("Logged Out");

// window.location.reload();

// }



// function checkItems(){

// if(!token){

// alert("Login First");

// window.location.href="login.html";

// return;

// }

// alert("Items Page Coming Next Step 🙂");

// }



// function goProfile(){

// window.location.href="profile.html";

// }



// function orderHistory(){

// alert("Order History Coming Next 🙂");

// }


const token = localStorage.getItem("token");

const loginLink =
document.getElementById("loginLink");

const profileMenu =
document.getElementById("profileMenu");


// show profile if logged

if(token){

loginLink.style.display="none";

profileMenu.classList.remove("hidden");

}


function logout(){

localStorage.removeItem("token");

alert("Logged Out");

window.location="home.html";

}


function goItems(){

alert("Items Page Coming Next 👍");

}


function goProfile(){

alert("Profile Page Coming Next 👍");

}