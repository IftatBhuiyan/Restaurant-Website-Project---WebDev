// This file handles simple page interactions.

// Start by getting the nav elements from the page.
const nav = document.querySelector('nav');
const menuButton = document.querySelector('.menu-toggle');

// Add button click for mobile menu.
if (menuButton && nav) {
  // Toggle nav open/close on click for small screens.
  menuButton.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}

// Cart data and DOM targets.
// Keep these at the top so all cart functions can use them.
const addButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.querySelector('.clear-cart-btn');
const checkoutButton = document.querySelector('.checkout-btn');

let cart = {};

function formatMoney(value) {
  // Always show prices as currency format, like $12.00.
  return `$${value.toFixed(2)}`;
}

// Draw the cart UI from current cart object.
function drawCart() {
  // Some pages (like Home) do not have cart sections.
  if (!cartItems || !cartTotal) {
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;

  const names = Object.keys(cart);

  if (names.length === 0) {
    // Show message and disable buttons when nothing is in cart.
    const empty = document.createElement('p');
    empty.className = 'empty-cart';
    empty.textContent = 'Your cart is empty.';
    cartItems.appendChild(empty);
    cartTotal.textContent = formatMoney(0);

  if (clearCartButton) {
    // Disable clear + checkout when cart is empty.
    clearCartButton.disabled = true;
  }

  if (checkoutButton) {
    // Disable clear + checkout when cart is empty.
    checkoutButton.disabled = true;
  }

    return;
  }

  if (clearCartButton) {
    // Enable clear button now that we have at least one item.
    clearCartButton.disabled = false;
  }

  if (checkoutButton) {
    // Enable checkout now that we have at least one item.
    checkoutButton.disabled = false;
  }

  names.forEach(function (name) {
    const item = cart[name];
    // Build total price for each line (qty x price).
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

  // Final total goes into the amount section at the bottom.
  cartTotal.textContent = formatMoney(total);
}

// Add a new item, or increase quantity by 1 if it already exists.
function addItem(name, price) {
  if (!cart[name]) {
    cart[name] = { qty: 1, price: price };
  } else {
    cart[name].qty += 1;
  }
  drawCart();
}

// Remove one item each click; delete it completely when qty reaches 0.
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

// Clear everything and rebuild a clean cart view.
function resetCart() {
  cart = {};
  drawCart();
}

// Listen for menu item adds.
addButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    // Read product name and price from data attributes.
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
    // Only react to remove buttons, not other area clicks.
    if (!event.target.classList.contains('remove-from-cart-btn')) {
      return;
    }

    removeItem(event.target.dataset.name);
  });
}

// Clear all cart lines.
if (clearCartButton) {
  clearCartButton.addEventListener('click', function () {
    // This will remove all lines from the cart.
    resetCart();
  });
}

// Basic checkout placeholder.
if (checkoutButton) {
  // Not connected to payment yet, just proves total was calculated.
  checkoutButton.addEventListener('click', function () {
    if (!cartTotal) {
      return;
    }

    if (cartItems && cartItems.textContent.includes('Your cart is empty.')) {
      alert('Your cart is empty. Add something first.');
      return;
    }

    const amount = cartTotal.textContent;
    alert('Your total is ' + amount + '. Checkout is not connected yet.');
  });
}

// Start page with empty cart state shown.
drawCart();

// Set up gallery slider controls if this page has the slider.
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider-btn.prev');
const nextButton = document.querySelector('.slider-btn.next');
const sliderTrack = document.querySelector('.slides');

if (slides.length > 0 && sliderTrack) {
  // Track which slide should be shown right now.
  let current = 0;

  // Move slider using percentage based on current index.
  function moveToSlide(index) {
    current = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      // Go back one. Negative index wraps to the last.
      moveToSlide(current - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      // Go forward one. Over max wraps to first.
      moveToSlide(current + 1);
    });
  }

  // Auto slide every 4.5 seconds.
  setInterval(function () {
    moveToSlide(current + 1);
  }, 4500);
}
