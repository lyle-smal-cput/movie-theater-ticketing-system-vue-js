<script setup>
import { ref, onMounted } from "vue";
import {getCartByUserId, getAllCartItemsByCartId, } from "../routes/routes.js";
import PaywallComponent from "../components/PaywallComponent.vue";

const userId = localStorage.getItem("authenticatedUserId");
let cartId = localStorage.getItem("cartId");

const cartItems = ref([]);
const totalAmount = ref(0);
const numberOfTickets = ref(0);
const movieTitle = ref("");
const ticketPrice = ref(0);
const selectedSeats = ref([]);

//To fetch cart items
async function fetchCartItems() {
  try {
    const cart = await getCartByUserId(userId);

    if (!cart || !cart.cartId) {
      cartItems.value = [];
      return;
    }

    cartId = cart.cartId;
    localStorage.setItem("cartId", cartId);

    const items = await getAllCartItemsByCartId(cartId);
    cartItems.value = Array.isArray(items) ? items : [];

    if (cartItems.value.length > 0) {
      totalAmount.value = 0;
      numberOfTickets.value = 0;

      //loop through all cart items and retrieve all existing items
      cartItems.value.forEach(item => {
        movieTitle.value = item.movieTitle; 
        numberOfTickets.value += item.quantity;
        totalAmount.value += item.price;
      });

      ticketPrice.value = numberOfTickets.value > 0 ? totalAmount.value / numberOfTickets.value : 0;
    }
  } catch (error) {
    console.error("Error fetching cart items:", error);
    cartItems.value = [];
  }
}

onMounted(fetchCartItems);
</script>

<template>
  <div class="checkout-container">

    <div class="payment-panel">
  <PaywallComponent
    :totalAmount="totalAmount"
    :numberOfTickets="numberOfTickets"
    :movieTitle="movieTitle"
    :selectedSeats="selectedSeats"
  />
</div>

    <div class="details-panel">
      <h2>Ticket Summary</h2>

      <div v-if="cartItems.length > 0" class="ticket-summary">
        <div v-for="(item, index) in cartItems" :key="index" class="movie-item">
              <img v-if="item.image" :src="'data:image/jpeg;base64,' + item.image" alt="Movie Image" class="movie-image"/>
          <div class="movie-details">
            <p><strong>Movie Title:</strong> {{ item.movieTitle }}</p>
            <p><strong>Tickets:</strong> {{ numberOfTickets }}</p>
            <p><strong>Price per ticket:</strong> R{{ ticketPrice }}</p>
            <p><strong>Seats:</strong> {{ selectedSeats.join(", ") }}</p>
          </div>
        </div>
        <h3>Total: R{{ totalAmount }}</h3>
      </div>

      <div v-else>
        <p>No items in your cart yet.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 50px auto;
  color: #fff;
}

.payment-panel,
.details-panel {
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
}

.payment-panel h2,
.details-panel h2 {
  margin-bottom: 20px;
  color: #fff;
}

.ticket-summary {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.movie-item {
  display: flex;
  gap: 15px;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
}

.movie-image {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
}

.movie-details {
  flex: 1;
}

.ticket-summary h3 {
  text-align: right;
  margin-top: 15px;
}

.ticket-summary p {
  margin: 3px 0;
}
</style>
