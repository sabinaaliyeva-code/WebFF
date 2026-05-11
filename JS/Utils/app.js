import {renderDetail} from "./detail.js";
import {renderCart} from "./cart.js";

if(!JSON.parse(localStorage.getItem("item-cart"))){
    localStorage.setItem("item-cart", JSON.stringify([]));
}

export function Slider(){

    let currentImage = document.querySelectorAll(".full-image");
    let thumbnailImages = document.querySelectorAll(".thumbnail-image");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let currentIndex = 0;



    function showSlide(index){

        if(index < 0) index = currentImage.length - 1;
        if(index >= currentImage.length) index = 0;

        currentIndex = index;



        currentImage.forEach((img) =>{
            img.classList.remove("active")
        });
        thumbnailImages.forEach((img) => {
            img.classList.remove("active");
        });



        currentImage[currentIndex].classList.add("active");
        thumbnailImages[currentIndex].classList.add("active");

    }



    
    if(next){
        next.addEventListener("click", () => {
            showSlide(currentIndex + 1);
        });
    }



    
    if(prev){
        prev.addEventListener("click", () => {
            showSlide(currentIndex - 1);
        });
    }



    thumbnailImages.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            showSlide(index);
        });
    });



    showSlide(currentIndex);

}






   


export function updateCartCount() {
    let productCart = JSON.parse(localStorage.getItem("item-cart") || "[]");

    let total = 0;

    productCart.forEach((item) => {
        total += item.count;
    });

    let countEl = document.querySelector(".cart-count");

    
    countEl.innerText = total;
    
    
}


export function addToCart(){
    let addToCartSection=document.querySelector(".add-to-cart-section");
    addToCartSection.addEventListener("click", (e) => {

    let btn=e.target;

    if(btn.classList.contains("plus")){

        let productId=btn.dataset.id;



        let countEl=document.querySelector(`.count[data-id="${productId}"]`);

        let count=Number(countEl.innerText);

        count++;

        countEl.innerText=count;

    }

    if(btn.classList.contains("minus")){

        let productId=btn.dataset.id;



        let countEl=document.querySelector( `.count[data-id="${productId}"]` );

        let count=Number(countEl.innerText);

        if(count>1){

            count--;

            countEl.innerText=count;

        }

    }

    let addBtn = btn.closest(".add-to-cart");

         

        if(addBtn){

           let productCart = JSON.parse(localStorage.getItem("item-cart") || "[]");
           let productId = addBtn.dataset.id;

            let countEl = document.querySelector(`.count[data-id="${productId}"]`);

            let count = Number(countEl.innerText);





            let existingProduct = productCart.find((item)=>{

                return item.productId === productId;

            });

            if(existingProduct){

                existingProduct.count += count;

            }
            else{
                
                productCart.push({

                    productId: productId,
                    count: count

                });

            }

            localStorage.setItem("item-cart",JSON.stringify(productCart));

            countEl.innerText = 1;

            updateCartCount();
            renderCart();
            cartNotification("Product added to cart");

        }

    });

}


export function cartQuantity(){

    let cartContainer = document.querySelector(".cart-container");

    cartContainer.addEventListener("click",(e)=>{

        let btn = e.target;



        let productCart = JSON.parse(localStorage.getItem("item-cart") || "[]");


        if(btn.classList.contains("plus")){

            let productId = btn.dataset.id;



            let item = productCart.find((p)=>{
                return p.productId == productId;
            });

            if(item){

                item.count++;

            }

        }

        if(btn.classList.contains("minus")){

            let productId = btn.dataset.id;

            let item = productCart.find((p)=> {
                return p.productId == productId
            });

            if(item && item.count > 1){

                item.count--;

            }

        }



    
        if(btn.classList.contains("remove-item")){

            let productId = btn.dataset.id;



            productCart = productCart.filter((p) =>{ 
                return p.productId != productId
            });

        }

        localStorage.setItem("item-cart",JSON.stringify(productCart));

        updateCartCount();
        renderCart();

    });

}



export function navMenu(){

    let menuIcon = document.querySelector(".menu-icon");
    let nav = document.querySelector("nav");
    let closeBtn = document.querySelector(".fa-xmark");



    if(!menuIcon || !nav || !closeBtn) return;

    menuIcon.addEventListener("click", () => {

        nav.classList.add("active");

    });


    closeBtn.addEventListener("click", () => {

        nav.classList.remove("active");

    });

    

}



export function cartBox(){

    let cartBtn = document.querySelector(".fa-cart-shopping");
    let cartBox = document.querySelector(".cart-box");


    if(!cartBtn || !cartBox) return;

    cartBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        cartBox.classList.toggle("active");

    });

    cartBox.addEventListener("click", (e) => {

        e.stopPropagation();

    });

    

}



function cartNotification(message){

    let cartNotification = document.querySelector(".cart-notification");

    if(!cartNotification){

        cartNotification = document.createElement("div");
        cartNotification.className = "cart-notification";

        document.body.appendChild(cartNotification);

    }

    cartNotification.innerText = message;
    cartNotification.classList.add("active");

    setTimeout(()=>{

        cartNotification.classList.remove("active");

    },2000);

}


