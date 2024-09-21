let inputEmail=document.getElementById("login-email");
let inputPassword=document.getElementById("inputPassword");
let userList;
//////localstorage//////////
if(localStorage.getItem("userList") == null){
    userList=[]
}
else{
    userList=JSON.parse(localStorage.getItem("userList"))
    console.log(userList)
}



////////login/////
// let groupForm=document.getElementById("groupForm")
// groupForm.addEventListener("submit",function(e){
//  e.preventDefault();
const login=()=>{
  if(emptyInputs()== true){
      document.getElementById("exist").innerHTML='<span class="text-danger my-3">All inputs is required</span>'
  }
  else if(validationsite()==false){
    document.getElementById("exist").innerHTML='<span class="text-danger my-3">put valid email "@" </span>'
  }else{
    var user={
        email:inputEmail.value,
        password:inputPassword.value
    }
        userList.push(user);
        localStorage.setItem("userList",JSON.stringify(userList));
        console.log(userList);
        window.location.href='home.html';
        console.log(userList);
        alert("Welcome To Our Shop App");
}}

//validation email//
const validationsite = () => /@gmail/.test(inputEmail.value);
///Empty inputs////
const emptyInputs = () => !inputEmail.value || !inputPassword.value;

///Exist Email/////////
// function isExist(){
//  for(let i=0;i<userList.length;i++){
//     if(userList[i].email == inputEmail.value){
//         return true;
//     }
//  }
// }
/////logoutBtn/////////
const logout=()=>{
    localStorage.removeItem("userList");
    window.location.href='index.html';
}


///////Home Page////////////
let cartBtn=document.getElementById('cart-btn');
let homeBtn=document.getElementById('home-btn')
let cartContainer=document.getElementById("cart")
let homeContainer = document.getElementById("home");
// //homeBtn in nav//
homeBtn.addEventListener("click", ()=>{
    cartContainer.classList.replace("d-block","d-none");
    homeContainer.classList.remove("d-none");
    cartBtn.classList.remove("active");
    homeBtn.classList.add("active");
})
// //cart-btn in nav////
cartBtn.addEventListener("click",()=>{
    homeContainer.classList.add("d-none");
    cartContainer.classList.replace("d-none","d-block");
    cartBtn.classList.add("active");
    homeBtn.classList.remove("active");
})
////our products/////////
const products = [
    { id: 1, name: 'Green striped dress', desc: "Women's Clothes", price: "$180", img: "images/women/80s-dress.jpg" },
    { id: 2, name: 'Gray dress', desc: "Women's Clothes", price: "$120", img: "images/women/go-to-dress.jpg" },
    { id: 3, name: 'tie-dyed dress', desc: "Women's Clothes", price: "$280", img: "images/women/tie-dyed-dress (1).jpg" },
    { id: 4, name: 'loose-striped', desc: "Men's Clothes", price: "$300", img: "images/men/80s-loose-striped-tee.jpg" },
    { id: 5, name: 'training-tee', desc: "Men's Clothes", price: "$340", img: "images/men/training-supply-sport-tee-1.jpg" },
    { id: 6, name: 'campus-orange', desc: "Men's shoes", price: "$140", img: "images/shoes/campus-00s-shoes (4).jpg" },
    { id: 7, name: 'campus-black', desc: "Men's shoes", price: "$140", img: "images/shoes/campus-00s-shoes (6).jpg" }
];
////display this prouducts/////
let myRow=document.getElementById("myrow");
 const display=()=>{
   let myproduct=products.map((item) => {
    return` <div class="col-md-3">
                        <div class="card caard" style="width: 18rem;">
                            <img src="${item.img}" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${item.name}</h5>
                              <p class="card-text">${item.desc}</p>
                              <div class="price-addbutton d-flex  bg-white align-items-center">
                                <p class="price  bg-white">${item.price}</p>
                                <a href="#" class=" btn btn-Add " onclick="addToCart(${item.id})"><i class="fa-solid fa-plus bg-transparent"></i>Add Cart</a>
                              </div>
                            </div>
                          </div>
                    </div>`
   }).join("")
   myRow.innerHTML= myproduct;
}
display();

//////local storage of cartList///////
let cartList
if(localStorage.getItem("cartList")==null){
    cartList=[]
}
else{
    cartList=JSON.parse(localStorage.getItem("cartList"))
    console.log(cartList)
}
///////ADD To Cart////////
const addToCart=(itemId)=>{
    let productToAdd=products.find(product => product.id === itemId);
    let existingProduct = cartList.find(item => item.id === itemId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if the product exists in the cart
    } else {
        let newProduct = { ...productToAdd, quantity: 1 }; // Set quantity to 1 for new product
        cartList.push(newProduct); // Add new product to the cart
    }
    localStorage.setItem("cartList",JSON.stringify(cartList));
    displayCart()
}
///display CartList in cart page////
let cartRow = document.getElementById("cart-row");
const displayCart=()=>{
    if(cartList.length == 0){
        document.getElementById("emptycart").innerHTML="<p>Your Cart is Empty</p>";
        cartRow.innerHTML = ''; 
    }
    else{
        let cartProducts=cartList.map((product)=>{
            return`<div class="col-md-6">
                     <div class="card">
                     <div class="card-body d-flex item-info">
                           <div class="item-img d-flex">
                            <img src="${product.img}">
                            <div class="item-text">
                             <h5>${product.name}</h5>
                               <p>${product.price}</p>
                             </div>
                           </div>
                           <div class="anther-side d-flex align-items-center">
                 <div class="item-number d-flex">
                  <div onclick="decreaseProduct(${product.id})"><i class="fa-solid fa-minus"></i></div>
                   <span>${product.quantity}</span>
                  <div  onclick="increaseProduct(${product.id})"><i class="fa-solid fa-plus"></i></div>
               </div>
                <div class="removebtn">
                  <button class="btn btn-outline-danger" onclick="deleteBtn(${product.id})"><i class="fa-solid fa-trash"></i>Remove</button>
               </div>
                  </div>
                     </div>
               </div>
               </div>`
         }).join("")
        cartRow.innerHTML= cartProducts;
        document.getElementById("emptycart").innerHTML = "";
        calculateToltal()
        localStorage.setItem("cartList",JSON.stringify(cartList))
    } 
}
////DeleteBtn in cart page///////
const deleteBtn= (productId) =>{
    let deletProduct = cartList.findIndex(item => item.id === productId);
    cartList.splice(deletProduct,1)
    localStorage.setItem("cartList",JSON.stringify(cartList))
    calculateToltal()
    displayCart()
}

////Calculate the Total Price///////
function calculateToltal(){
    let total = cartList.reduce((sum, product) => {
        let price = parseFloat(product.price.replace('$', '')); // Remove $ and convert to number
        return sum + (price * product.quantity);
    }, 0);
    
    document.getElementById("totalprice").innerText = `$${total.toFixed(2)}`;
}
/////////increase the quantity of product//////////
function increaseProduct(productId){
    let product = cartList.find(item => item.id === productId)
    product.quantity +=1
    localStorage.setItem("cartList", JSON.stringify(cartList));
    calculateToltal()
    displayCart();
 
}
///decrease the quantity of product//////////////
function decreaseProduct(productId){
    let product = cartList.find(item => item.id === productId)
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        deleteBtn(productId); // Remove product if quantity is 1 and minus is clicked
    }
    localStorage.setItem("cartList", JSON.stringify(cartList));
    calculateToltal()
    displayCart();

}
// Initial Cart Display
displayCart();