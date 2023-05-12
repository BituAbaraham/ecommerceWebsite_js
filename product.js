
const mainImage = document.getElementById('main-image');
const subImages = document.querySelectorAll('.sub-image');

const Descriptionbtn = document.getElementById('Descriptionbtn')
const Sizebtn = document.getElementById('Sizebtn')
const Description = document.querySelector('.Description')
const Size = document.querySelector('.sizedetails')

const menuOutline = document.querySelector('.menuOutline');
const listItem = document.querySelector('.listItem ul');
const cart = document.querySelector('.cart');
const closeicon = document.getElementById('close-icon');
const carticone = document.getElementById('cartOutline');

const producrEl = document.querySelector(".shocareItems")

const reviewEl = document.querySelector('.customerContainer')
const cartItems = document.querySelector('.innercontainer')
const sumtotalEl =document.querySelector('.sumsection')
const cartTotalEl =document.querySelector('.itemsCount')

Descriptionbtn.addEventListener('click',()=>{

    if (Size.style.display === 'block') {
        Size.style.display = 'none';
      }
      Description.style.display = 'block';
})
Sizebtn.addEventListener('click',()=>{
    
    if (Description.style.display === 'block') {
        Description.style.display = 'none';
      }
      Size.style.display = 'block';
})



subImages.forEach(subImage => {
subImage.addEventListener('click', () => {
const newImageSrc = subImage.getAttribute('data-image');
mainImage.src = newImageSrc;
});
});

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


function renderProduct(){
  products.forEach((product)=>{
    producrEl.innerHTML+=`
    <div class="banner">
    <div class="iteamImage">
       <a href="/product.html"> <img src="${product.imgsrc}" alt=""></a>
        <div class="card">
            <div class="seen">
                <span class="material-symbols-outlined">
                    visibility
                    </span>
            </div>
            <div class="toCart">
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



  
  

