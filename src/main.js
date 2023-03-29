const shop = document.getElementById ('shop');
const cartAmount = document.querySelector ('.cart-amount');

let basket = [];
/** 
 * ! It triggers the generateShop() function when dom content is loaded
**/
window.addEventListener ('DOMContentLoaded', () => {
  basket = getLocalStorage ();
  generateShop ();
  calculation ();
});

/** 
 * ! this function displays all the shop item on dom
**/
const generateShop = () => {
  shop.innerHTML = shopItems
    .map (item => {
      // destructuring
      let {id, name, price, desc, img} = item;
      let search = basket.find (item => item.id === id);
      return `
            <div class="item" id="product-id-${id}">
            <img width="200" src="${img}" alt="" />
            <div class="details">
              <h4 class="item-title">${name}</h4>
              <p class="item-description">
                ${desc}
              </p>
              <div class="price-quantity">
                <div class="price">$${price}</div>
                <div class="quantity-btns">
                  <i onclick = "decerement(${id})" class="bi bi-dash-lg"></i>
                  <span id="${id}" class="quantity">
                    ${search === undefined ? 0 : search.item}
                  </span>
                  <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>`;
    })
    .join ('');
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
  // console.log(basket);
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
  // console.log(basket);
  update (selectedItem.id);
  basket = basket.filter (x => x.item !== 0);
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
 * ! shows the quantity of total selected items on cart icon
**/
const calculation = () => {
  cartAmount.innerHTML = basket.map (x => x.item).reduce ((x, y) => x + y, 0);
};

/** 
 * ! Local storage
**/
const getLocalStorage = () => {
  return localStorage.getItem ('shopData')
    ? JSON.parse (localStorage.getItem ('shopData'))
    : [];
};
