
const body =document.querySelector('body')
const menuOutline = document.querySelector('.menuOutline');
const listItem = document.querySelector('.listItem ul');
const cart = document.querySelector('.cart');
const closeicon = document.getElementById('close-icon');
const carticone = document.getElementById('cartOutline');
const day = document.querySelector('.timeday .num')
const hours = document.querySelector('.timehr .num')
const minutes = document.querySelector('.timemin .num')
const seconds = document.querySelector('.timesec .num')
const producrEl = document.querySelector(".shocareItems")
const reviewEl = document.querySelector('.customerContainer')
const cartItems = document.querySelector('.innercontainer')
const sumtotalEl =document.querySelector('.sumsection')
const cartTotalEl =document.querySelector('.itemsCount')

//count down

let dayvalue =365
let hrvalue =24
let minvalu =60
let secvalue =60

const timmer = setInterval(()=>{
  secvalue--
  if(secvalue===0){
  minvalu--
  secvalue=60
}
if(minvalu===0){
  hrvalue--
  minvalu=60
}
if(hrvalue===0){
  dayvalue--
  hrvalue=60
}
if(dayvalue===0){
  clearInterval(timmer)
}
  seconds.textContent =secvalue <10 ? `0${secvalue}`:secvalue; 
  minutes.textContent =minvalu <10 ? `0${minvalu}`:minvalu;
  hours.textContent =hrvalue <10 ? `0${hrvalue}`:hrvalue;
  day.textContent =dayvalue <10 ? `0${dayvalue}`:dayvalue;
},1000)



//activating the menu icone
menuOutline.addEventListener('click', () => {
  listItem.classList.toggle('active');
});

// shoping cart open when click on the icone & stop scrolling 
carticone.addEventListener('click',()=>{
  cart.style.display='flex';
  document.body.style.overflow='hidden';
})

// shoping cart close when click on the icone & active scrolling
closeicon.addEventListener('click', () => {
  cart.style.display = 'none'; 
  document.body.style.overflow='auto'
});



// product


function renderProduct(){
  products.forEach((product)=>{
    producrEl.innerHTML+=`
    <div class="banner">
    <div class="iteamImage">
       <a href="/product.html"> <img src="${product.imgsrc}" alt=""></a>
        <div class="tag">New</div>
        <div class="card">
            <div class="seen">
                <span class="material-symbols-outlined">
                    visibility
                    </span>
            </div>
            <div class="toCart" onclick="addToCart(${product.id})">
                <span class="material-symbols-outlined">
                    shopping_cart
                    </span>
            </div>
            <div class="like">
                <span class="material-symbols-outlined">
                favorite
                </span>
            </div>
        </div>
    </div>
    <div class="iteamDetails">
        <span>${product.iteam}</span>
        <p>${product.discription}</p>
        <span>$ ${product.price}</span>
    </div>
</div>

    `
  }) 
}
renderProduct()

let carts = JSON.parse(localStorage.getItem("CART"))
updatecart()


function addToCart(id){
  if(carts.some((item)=>item.id===id)){
    changeNumber("plus",id)
  }else{
    const item = products.find((product)=>product.id===id)
    carts.push({
      ...item,
      numberofunits:1,
    })
    
  console.log(carts)
  }
  updatecart()

}

function updatecart(){
  renderCartItems()
 renderSubtotal()

 localStorage.setItem("CART", JSON.stringify(carts) )
}

function renderSubtotal(){
  let totalprice =0,
  totalitems =0;

  carts.forEach((item)=>{
    totalprice += item.price * item.numberofunits
    totalitems += item.numberofunits
  })
  sumtotalEl.innerHTML=`
  <div class="sumof">
    <p>Total Items: <span>${totalitems}</span> </p>
  </div>
  <div class="totalamt">
  Subtotal : <span>$ ${totalprice.toFixed()}</span>   
  </div>
  `
  cartTotalEl.innerHTML = totalitems;
}

function renderCartItems(){
  cartItems.innerHTML="";
   carts.forEach((iteam)=>{
    cartItems.innerHTML +=`
    <div class="insidecard">
      <div class="cartimag" onclick="removeItem(${iteam.id})">
        <img src="${iteam.imgsrc}" alt="${iteam.iteam}">
      </div>
      <div class="cartdetils">
        <div class="name">
          <h6>${iteam.discription}</h6>
        </div>
        <div class="price">
          <span class="span"> $ ${iteam.price}</span>
          <div class="addsub">
              <div class="add" onclick="changeNumber('plus',${iteam.id})">+</div>
              <div class="addsudnum"><span>${iteam.numberofunits}</span></div>
              <div class="sub" onclick="changeNumber('minus',${iteam.id})">-</div>
          </div>
        </div>
      </div>
     </div>
    `
   })
}


function removeItem(id){
  carts=carts.filter((item=>item.id!==id))

  updatecart()
}

function changeNumber(action,id){
  carts = carts.map((item)=>{
    let numberofunits =item.numberofunits
    
    if(item.id===id){
      if(action==="minus" && numberofunits >1){
        numberofunits--
      }else if(action==="plus" && numberofunits < item.instock) {
        numberofunits++
      }
    }
    return {
      ...item,
      numberofunits,
    }
  })
  updatecart()
}








function renderreviwe(){
  review.forEach((reviews)=>{
    reviewEl.innerHTML+=`
    <div class="raingContainer">
    <div class="innerbox">
        <div class="sideimage">
            <img src="${reviews.imgsrc}" alt="">
        </div>
        <div class="headingStar">
            <span class="items">${reviews.iteam}</span>
            <h2>Low For Sneakers</h2>
            <div class="start">
            <span>rating:${reviews.rating}</span>
            </div>
        </div>
    </div>
    <div class="customerfeels">
         <p>   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum aspernatur optio veritatis dignissimos aut. Et, minus temporibus tenetur dolor iusto nihil expedita perspiciatis adipisci, atque asperiores recusandae, voluptatum officia tempore?
         </p>
         <span>Happy Rj 29 Dec 2021</span>
        </div>
</div>
    `
  })
}
renderreviwe()




