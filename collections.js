var productContainer=document.getElementById("products")
var search=document.getElementById("search")
var productlist= productContainer.querySelectorAll("div")


search.addEventListener("keyup",function(){
    var enteredValue=event.target.value.toUpperCase()
    for(count=0;count<productlist.length;count=count+1)
    {
        var productname=productlist[count].querySelector("p").textContent
        if(productname.toUpperCase().indexOf(enteredValue)<0)
        {
            productlist[count].style.display="none"
            
            
        }
        else{
            productlist[count].style.display="block"
        }
    }

})


// cart box js

var cart=document.querySelector(".cart");

function show(){
    cart.style.right="0"
}

function out(){
    cart.style.right="-340px"
}


// cart remove js

document.addEventListener('DOMContentLoaded',loadProduct);

function loadProduct(){
loadContent();

}
function loadContent(){
    //remove product item from cart
    let remove = document.querySelectorAll('.cart-remove');
    remove.forEach((btn)=>{
        btn.addEventListener('click',removeItem)
    });
    //product item change event
    let quty = document.querySelectorAll('.cart-quantity');
    quty.forEach((inp)=>{
        inp.addEventListener('change',changeQty);
    });

// product cart
 let cartBtns=document.querySelectorAll('.collection-btn');

cartBtns.forEach((butn)=>{
    butn.addEventListener('click',addCart);
});
updateTotal();
}


//remove item
function removeItem(){
    
    if(confirm('Are You Sure To Remove')){
       
       let titl=this.parentElement.querySelector('.cart-product-tittle').innerHTML;
       itemList=itemList.filter(el=>el.titl!=titl);
        this.parentElement.remove();
       loadContent();

    }
   
}



//change quantity
function changeQty(){
    if(isNaN(this.value) || this.value<1)
    {
        this.value=1;
    }
    loadContent();
}

 
let itemList=[];

// add cart
function addCart(){
    let prdt = this.parentElement;
   let titl = prdt.querySelector('.collection-nme').innerHTML;   
   let prices = prdt.querySelector('.product-price').innerHTML;
   let imgSrc= prdt.querySelector('.prd-img').src;
   //console.log(titl,prices,imgSrc);
   
   let newProduct={titl,prices,imgSrc}
   // check product already exist in cart
   if(itemList.find((el)=>el.titl==newProduct.titl)){
    alert('Product Already Added In Cart')
    return;
   }else{
    itemList.push(newProduct)
   }
   
   let newProductElement = createCartProduct(titl,prices,imgSrc); 
   let element=document.createElement('div');
   element.innerHTML=newProductElement;
   let cartBasket=document.querySelector('.cart-content');
   cartBasket.append(element);
   loadContent();
}
   


function createCartProduct(titl,prices,imgSrc){
    return `
     <div class="cart-box">
                <img src="${imgSrc}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-tittle">${titl}</div>
                  <div class="price-box">
                    <div class="cart-price">${prices}</div>
                    <div class="cart-amt">${prices}</div>
                  </div>
                  <input type="number" value="1" class="cart-quantity">
                </div>
               <span class="cart-remove"><i class="fa fa-trash" aria-hidden="true"></i></span>
               
            </div>
            `;
}

 

function updateTotal(){
    const cartItems=document.querySelectorAll('.cart-box');
     const totalValue =document.querySelector('.total-price');

     let total=0;
     cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerHTML="Rs."+(price*qty)

     });

     totalValue.innerHTML="Rs."+total;

     // add product count in cart icon

     const cartCount=document.querySelector('.cart-count');
    let btnBuy=document.querySelector('.btn-buy')
   
     let count= itemList.length;
     cartCount.innerHTML=count;

     if(count==0)
     {
        cartCount.style.display="none"
        btnBuy.style.display='none'
       
     }
     else{
        cartCount.style.display="block"
        btnBuy.style.display='block'
        
    }
}


function placeOrder(){
    alert('Your Order Is Succesfully Placed')
}


