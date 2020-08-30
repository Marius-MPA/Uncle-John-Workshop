 

// show cart
(function(){
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function() {
  cart.classList.toggle("show-cart");
  });
})();




// add items to the cart

(function(){

  const cartBtn = document.querySelectorAll('.store-item-icon');

  cartBtn.forEach(function(btn){
    btn.addEventListener('click', function(event){
      //console.log(event.target);
    
      if(event.target.parentElement.classList.contains('store-item-icon')){  
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let position = fullPath.indexOf('images') + 6; 
        let partialPath = fullPath.slice(position);
        const item = {};
        item.img = `images-cart${partialPath}`;
      
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
          //console.log(name);
        item.name = name;

        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[2].textContent;
          //console.log(price);
        let finalPrice = price.slice(1).trim();
          //console.log(finalPrice);
        item.price = finalPrice;

        //show message -IN CART
        event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].classList.toggle("in-cart-item");
        setTimeout(function(){
          event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].classList.toggle("in-cart-item");
        }, 1000)
        

        // we create the cart
        // 1st we create the DIV
        const cartItem = document.createElement('div');
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        );
        cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">
                ${item.name} </p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
            </div>
            <a href="#">
              <i class="fas fa-trash cart-item-remove"></i>
            </a>
        `;
          //console.log(cartItem);
          
      // select cart
      const cart = document.getElementById('cart');
      const total = document.querySelector('.cart-total-container');

      cart.insertBefore(cartItem, total);

      showTotals();
      }
    })
  });
  // show totals
  function showTotals() {

    const total = [];
    const items = document.querySelectorAll('.cart-item-price');
    items.forEach(function(item){
      total.push(parseFloat(item.textContent));  
    });
      //console.log(total);
  
      const totalMoney = total.reduce(function(total,item){
        total += item;
        return total
      }, 0);

      console.log(totalMoney);

      const finalMoney = totalMoney.toFixed(2);
      console.log(finalMoney);
  
    document.getElementById('cart-total').textContent = finalMoney;
    document.querySelector('.item-total').textContent = finalMoney;
    document.getElementById('item-count').textContent = total.length; 
  }

  //  *** clear cart - Button ***
  const clearBtn = document.getElementById('clear-cart');
  clearBtn.addEventListener('click', clearCart);

  function clearCart(){
    const cartItemD = document.querySelectorAll('.cart-item');
//     console.log(cartItemD);
    cartItemD.forEach(function(item){
      item.remove();
    })
    document.getElementById('cart-total').textContent = 0;
    document.querySelector('.item-total').textContent = 0;
    document.getElementById('item-count').textContent = 0;
  };
  // *** end clear cart ***

  //  *** delete item - Button ***
  
  const cart = document.getElementById('cart');
  console.log(cart);
  
  cart.addEventListener('click', event => {
  
    if(event.target.classList.contains('cart-item-remove')){
      
      const element = event.target;
      console.log(element);
      element.parentElement.parentElement.parentElement.removeChild(element.parentElement.parentElement);
      showTotals();
      
    }
  });
  //  *** end delete item - Button ***

})();

