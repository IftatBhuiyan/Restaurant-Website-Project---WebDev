// This file handles simple page interactions.

const nav = document.querySelector('nav');
const menuButton = document.querySelector('.menu-toggle');

// Add button click for mobile menu.
if (menuButton && nav) {
  menuButton.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}

// Cart data and DOM targets.
const addButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.querySelector('.clear-cart-btn');
const checkoutButton = document.querySelector('.checkout-btn');

let cart = {};

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function drawCart() {
  if (!cartItems || !cartTotal) {
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;

  Object.keys(cart).forEach(function (name) {
    const item = cart[name];
    const linePrice = item.qty * item.price;
    total += linePrice;

    const line = document.createElement('div');
    line.className = 'cart-line';

    const text = document.createElement('span');
    text.textContent = `${item.qty} x ${name} - ${formatMoney(linePrice)}`;
    line.appendChild(text);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-from-cart-btn';
    remove.textContent = 'Remove';
    remove.dataset.name = name;
    line.appendChild(remove);

    cartItems.appendChild(line);
  });

  cartTotal.textContent = formatMoney(total);
}

function addItem(name, price) {
  if (!cart[name]) {
    cart[name] = { qty: 1, price: price };
  } else {
    cart[name].qty += 1;
  }
  drawCart();
}

function removeItem(name) {
  if (!cart[name]) {
    return;
  }

  if (cart[name].qty > 1) {
    cart[name].qty -= 1;
  } else {
    delete cart[name];
  }

  drawCart();
}

function resetCart() {
  cart = {};
  drawCart();
}

// Listen for menu item adds.
addButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    if (name && !Number.isNaN(price)) {
      addItem(name, price);
    }
  });
});

// Listen for remove from cart.
if (cartItems) {
  cartItems.addEventListener('click', function (event) {
    if (!event.target.classList.contains('remove-from-cart-btn')) {
      return;
    }

    removeItem(event.target.dataset.name);
  });
}

// Clear all cart lines.
if (clearCartButton) {
  clearCartButton.addEventListener('click', function () {
    resetCart();
  });
}

// Basic checkout placeholder.
if (checkoutButton) {
  checkoutButton.addEventListener('click', function () {
    if (!cartTotal) {
      return;
    }

    const amount = cartTotal.textContent;
    alert('Your total is ' + amount + '. Checkout is not connected yet.');
  });
}

drawCart();

// Set up gallery slider controls if this page has the slider.
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider-btn.prev');
const nextButton = document.querySelector('.slider-btn.next');
const sliderTrack = document.querySelector('.slides');

if (slides.length > 0 && sliderTrack) {
  let current = 0;

  function moveToSlide(index) {
    current = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      moveToSlide(current - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      moveToSlide(current + 1);
    });
  }

  setInterval(function () {
    moveToSlide(current + 1);
  }, 4500);
}
