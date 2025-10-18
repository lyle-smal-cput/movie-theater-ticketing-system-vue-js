<script setup>
import { ref, onMounted, computed } from 'vue';
import PrimaryButton from '../components/PrimaryButton.vue';
import { getCartByUserId, getAllCartItemsByCartId, deleteCartItem } from '../routes/routes.js';
import router from '../router/index.js';

const userId = localStorage.getItem('authenticatedUserId');
const cartItems = ref([]);
let cartId = localStorage.getItem('cartId');

//To fetch cart items
async function fetchCartItems() {
  try {
    //To get the logged-in user's cart
    let cart = await getCartByUserId(userId);

    if (!cart || !cart.cartId) {
      cartItems.value = [];
      return;
    }

    cartId = cart.cartId;
    localStorage.setItem('cartId', cartId);

    const items = await getAllCartItemsByCartId(cartId);
    cartItems.value = Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    cartItems.value = [];
  }
}

//Remove an item from cart
async function removeFromCart(cartItemId) {
  try {
    await deleteCartItem(cartItemId);
    cartItems.value = cartItems.value.filter(item => item.cartItemId !== cartItemId);
  } catch (error) {
    console.error('Error removing item:', error);
    alert('Failed to remove item from cart.');
  }
}

//To direct to checkout
function goToCheckout() {
  if (cartItems.value.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  router.push('/checkout');
}

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price, 0);
});


onMounted(fetchCartItems);
</script>

<template>
  <div class="cart-page">
    <main class="cart-container">
      <h1 class="cart-title">Cart</h1>

        <p class="movie-amount">Movies in Cart: {{ cartItems.length }}</p>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <p class="message">Your cart is empty.</p>
        <PrimaryButton button-text="Browse Movies" @click="$router.push('/movies')" />
      </div>

      <div v-else class="cart-list">
        <div v-for="item in cartItems" :key="item.cartItemId" class="cart-item">

          <div class="remove-btn">
            <PrimaryButton button-text="Remove" @click="removeFromCart(item.cartItemId)" />
          </div>

          <div class="cart-left">
            <h3 class="movie-title">{{ item.movieTitle }}</h3>
            <img
              v-if="item.image" :src="'data:image/jpeg;base64,' + item.image" alt="Movie Image" class="movie-image"/>
            <img v-else src= '/src/assets/no-photo.jpg'/>

          </div>

          <div class="cart-right">
            <div class="movie-info">
              <p><strong>Quantity:</strong> {{ item.quantity }}</p>
              <p><strong>Price per ticket:</strong> R{{ item.price }}</p>
            </div>
          </div>

        </div>

        <div class="checkout-section">
          <h2>Total: R{{ cartTotal }}</h2>
          <PrimaryButton button-text="Checkout" @click="goToCheckout" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 1000px;
  margin: 40px auto;
  color: #fff;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #333;
}

.cart-container p {
  font-size: 20px;
}
.cart-title {
  color: #fff;
  margin-bottom: 25px;
  text-align: center;
}

.movie-amount {
  text-align: left;
}

.message {
  text-align: center;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #ccc;
}

.cart-item {
  position: relative; 
  display: flex;
  gap: 20px;
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  border-left: 5px solid #00ff7f;
  margin-bottom: 20px;
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
}

.cart-left {
  display: flex;
  flex-direction: column;
  width: 40%;
}

.movie-title {
  color: #00ff7f;
  font-size: 18px;
  margin-bottom: 10px;
  text-align: left;
}

.movie-image {
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #333;
}

.cart-right {
  display: flex;
  align-items: center;
  flex: 1;
}

.movie-info {
  line-height: 1.6;
  color: #ddd;
}

.movie-info p {
  margin: 6px 0;
  font-size: 15px;
}

.checkout-section {
  text-align: right;
  margin-top: 30px;
  border-top: 1px solid #333;
  padding-top: 20px;
}

.checkout-section h2 {
  margin-bottom: 10px;
  color: #fff;
}
</style>
