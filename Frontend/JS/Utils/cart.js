import {getProduct} from "../Services/api.js";
import {updateCartCount, cartQuantity, cartBox} from "./app.js";
   

if(!JSON.parse(localStorage.getItem("item-cart"))){
    localStorage.setItem("item-cart", JSON.stringify([]));
}


export async function renderCart(){

    let data=await getProduct();
    let productCart = JSON.parse(localStorage.getItem("item-cart")) || [];
    let cartContainer = document.querySelector(".cart-container");
    if (!cartContainer) return;
    
    cartContainer.innerHTML = "";

    if (productCart.length === 0) {
        cartContainer.innerHTML = `<p class="empty">Cart is empty</p>`;
        return;
    }

    productCart.forEach((item) => {

        let cartItem = data.find((e) =>
            (e.productId) ==(item.productId)
        );

        if (cartItem) {
            cartContainer.innerHTML += `
                   
    

        
                <img src="${cartItem.images[0].full}" class="cart-image" data-id="${cartItem.productId}">

                <div class="item-info">
                    <div class="company"><p>${cartItem.company}</p></div>
                    <div class="name"><p>${cartItem.productName}</p></div>
                    <div class="price"><p>${cartItem.currency} ${cartItem.current}</p></div>
                </div>
        
        
            

            <div class="cart-quantity">
            <i class="fa fa-trash remove-item" aria-hidden="true" data-id=${cartItem.productId}></i>
            <div class="total">
               <span>Price : ${cartItem.currency} ${cartItem.current * item.count}</span>
            </div>
             
            <div class="quantity">
                <i class="fa fa-plus plus" aria-hidden="true" data-id=${cartItem.productId}></i>
                <span class="count" data-id=${cartItem.productId}>${item.count}</span>
                <i class="fa fa-minus minus" aria-hidden="true" data-id=${cartItem.productId}></i>
            </div>
            
                
            </div>
            
            

        
       

    
    

    

    `;

            
    }

    
    
    });
   
        
        

    

    





  
   
    
}  
 



cartQuantity();
updateCartCount();
cartBox();
    

renderCart();
 


