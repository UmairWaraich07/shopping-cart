const label = document.getElementById ('label');
const shoppingCart = document.getElementById ('shoppingCart');
const cartAmount = document.querySelector ('.cart-amount');

let basket = [];
/** 
 * ! It triggers the generateShop() function when dom content is loaded
**/
window.addEventListener ('DOMContentLoaded', () => {
  basket = getLocalStorage ();
  calculation ();
  generateShoppingCart ();
});
/** 
 * ! this function displays all the shop cart items on dom
**/
const generateShoppingCart = () => {
  if (basket.length !== 0) {
    displayLabel ();
    return (shoppingCart.innerHTML = basket
      .map (x => {
        // desctructuring
        let {id, item} = x;
        let search = shopItems.find (y => id === y.id) || [];
        // destructuring
        let {img,name,price} = search;
        return `
                <div class="cart-item">
                    <img width = "130" src="${img}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-title-price">
                            <h4 class="cart-item-title">${name}</h4>
                            <span class="cart-item-price">$ ${price}</span>
                            <i onclick = "removeCartItem(${id})" class="bi bi-x-lg cross-icon"></i>
                        </div>
                        <div class="cart-item-btns">
                            <i onclick = "decerement(${id})"  class="bi bi-dash-lg"></i>
                            <span id = "${id}" class="cart-item-quantity">${item} </span>
                            <i onclick = "increment(${id})"  class="bi bi-plus-lg"></i>
                        </div>
                        <div class="cart-item-total-price">$${item * price}</div>
                    </div>
                </div>
            `;
      })
      .join (''));
  } else {
    shoppingCart.innerHTML = '';
    label.innerHTML = `
            <h2>Cart is empty</h2>
            <a href="index.html" class ="home-btn">Back to home</a>
        `;
  }
};
/** 
 * ! it displays the label section of html
**/
const displayLabel = () => {
  return (label.innerHTML = `
        <div class="total-bill">
            <h2 class="total-bill-title">Total Bill</h2>
            <span class = "total-bill-amount">$ ${totalBill ()}</span>
        </div>
        <div class="label-btns">
            <button class="home-btn checkout-btn">Checkout</button>
            <button onclick = "clearCart()" class="home-btn clear-btn">Clear cart</button>
        </div>
    `);
};
/** 
 * ! it calculates the total bill of all items in cart
**/
const totalBill = () => {
  let amount = basket
    .map (x => {
      let search = shopItems.find (y => x.id === y.id) || [];
      return x.item * search.price;
    })
    .reduce ((prev, next) => prev + next, 0);
  return amount;
};
/** 
 * ! it clears all the cart item from the local storage and dom
**/
const clearCart = () => {
  localStorage.clear ();
  basket = getLocalStorage ();
  generateShoppingCart ();
};
/** 
 * ! it removes the cart item 
**/
const removeCartItem = id => {
  let selectedItem = id;
  let search = basket.find (x => x.id === selectedItem.id) || [];
  basket = basket.filter (x => x.id !== search.id);
  generateShoppingCart ();
  calculation ();
  localStorage.setItem ('shopData', JSON.stringify (basket));
};

/** 
 * ! shows the quantity of total selected items on cart icon
**/
const calculation = () => {
  cartAmount.innerHTML = basket.map (x => x.item).reduce ((x, y) => x + y, 0);
};
/** 
 * ! increments the quantity of item 
**/
const increment = id => {
  let selectedItem = id;
  let search = basket.find (item => item.id === selectedItem.id);
  if (search === undefined) {
    basket.push ({id: selectedItem.id, item: 1});
  } else {
    search.item += 1;
  }
  generateShoppingCart ();
  update (selectedItem.id);
  localStorage.setItem ('shopData', JSON.stringify (basket));
};
/** 
 * ! decrements the quantity of item
**/
const decerement = id => {
  let selectedItem = id;
  let search = basket.find (item => item.id === selectedItem.id);
  //   console.log(search);
  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  }
  search.item -= 1;
  update (selectedItem.id);
  basket = basket.filter (x => x.item !== 0);
  generateShoppingCart ();
  localStorage.setItem ('shopData', JSON.stringify (basket));
};
/** 
 * ! updates the quantity of item on dom
**/
const update = id => {
  let search = basket.find (item => item.id === id);
  document.getElementById (search.id).innerHTML = search.item;
  calculation ();
};

/** 
 * ! Local storage
**/
const getLocalStorage = () => {
  return localStorage.getItem ('shopData')
    ? JSON.parse (localStorage.getItem ('shopData'))
    : [];
};
