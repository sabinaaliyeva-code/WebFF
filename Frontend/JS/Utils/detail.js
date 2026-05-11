import {getProduct} from "../Services/api.js";
import {Slider, updateCartCount, addToCart, navMenu} from "./app.js";
import {renderCart} from "./cart.js";




if(!JSON.parse(localStorage.getItem("item-cart"))){
    localStorage.setItem("item-cart", JSON.stringify([]));
}

export async function renderDetail(){
    
    let data=await getProduct();
    let currentImage=document.querySelector(".current-image");
    let thumbnailImages=document.querySelector(".thumbnail-images");
    let productInfo=document.querySelector(".product-info");
    currentImage.innerHTML='';
    thumbnailImages.innerHTML='';
    productInfo.innerHTML='';

    data.forEach((product)=>{

        
        
         
         product.images.forEach((container)=>{

            currentImage.innerHTML+=`
           
                
                <img src="${container.full}" class="full-image" data-id="${product.productId}">
                
                

           `
           
           
           thumbnailImages.innerHTML+=`

                  <img src="${container.thumbnail}" class="thumbnail-image"  data-id="${product.productId}">

                `
            });

            currentImage.innerHTML+=`
           
                
                <i class="fa-solid fa-angle-left prev" data-id="${product.productId}"></i>
                <i class="fa-solid fa-angle-right next" data-id="${product.productId}"></i>         
              `
           productInfo.innerHTML=

        `<div class="product-info">
                <div class="company"><p>${product.company}</p></div>
                <div class="title"><h1>${product.productName}</h1></div>
                <div class="description">
                    <p>${product.description}</p>
                </div>
                <div class="price-info">
                    <div class="price"><p>${product.currency}${product.current}<span class="discount">${product.discount}</span></p></div>
                    
                    <div class="old-price"><p>${product.currency}${product.oldPrice}</p></div>


                </div>
                

            </div>
            <div class="add-to-cart-section">
            <div class="quantity">
                <i class="fa fa-plus plus" aria-hidden="true" data-id=${product.productId}></i>
                <span class="count" data-id=${product.productId}>1</span>
                <i class="fa fa-minus minus" aria-hidden="true" data-id=${product.productId}></i>
            </div>
            <button class="add-to-cart" data-id=${product.productId}> 
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>Add To Cart</span>
            </button>
            </div>
            
            

        </div> ` ;
            
         
        
         

    });
    
    
 addToCart(); 
 Slider(); 
 navMenu(); 
    
}




renderDetail();