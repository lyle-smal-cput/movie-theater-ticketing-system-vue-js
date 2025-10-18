<script setup>
import primaryButton from "../components/PrimaryButton.vue";
import {ref} from "vue";
import { addCard, createPayment, updateSeatAvailability } from "../routes/routes.js";
import router from "../router/index.js";

const props = defineProps({
  totalAmount: Number,
  numberOfTickets: Number,
  movieTitle: String,
  selectedSeats: Array
});

const cardHolderName = ref();
const cardNumber = ref();
const cvv = ref();
const expiryDate = ref();

async function onPayNow(){

  if (!cardHolderName.value || !cardNumber.value || !cvv.value || !expiryDate.value) {
    alert("Please fill in all payment details.");
    return;
  }
  const payload = {
    card: {
      cardHolderName: cardHolderName.value,
      cardNumber: cardNumber.value,
      cvv: cvv.value,
      expiryDate: expiryDate.value,
    },
    payment: {
      amount: props.totalAmount,
    }
  };

  try{
    const savedCard = await addCard(payload.card);
    console.log("Card Created: ", savedCard);

    const savedPayment = await createPayment(payload.payment);
    console.log("Payment created:", savedPayment);

    for (let seatId of props.selectedSeats) {
      await updateSeatAvailability(seatId, false);
    }

    alert("Payment processed successfully!");
    router.push("/movies");

  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong with payment.");
  }

  setTimeout(async () => {
    for (let seatId of props.selectedSeats) {
      try {
        await updateSeatAvailability(seatId, true);
        console.log(`Seat ${seatId} reset to available`);

      } catch (err) {
        console.error(`Error resetting seat ${seatId}:`, err);
      }
    }
  }, 30000);
}

</script>

<template>
  <div class="overlay">
    <div class="paywall-container">
      <div class="paywall-header">
        <h1>Paywall</h1>
        <span class="ticket-info">{{numberOfTickets}} x Tickets for {{movieTitle}} @ R{{totalAmount}}</span>
        <!--<primaryButton @click="$emit('close')">X</primaryButton>-->
      </div>

      <input type="text" class="form-control" placeholder="Cardholder Name" v-model="cardHolderName">
      <input type="text" class="form-control" placeholder="Card Number" v-model="cardNumber">

      <div class="inline-fields">
        <input type="date" class="form-control inline-inputs" placeholder="Expiry Date" v-model="expiryDate">
        <input type="text" class="form-control inline-inputs" placeholder="CVV" v-model="cvv">
      </div>

      <primaryButton class="pay-button" @click="onPayNow()">Pay Now</primaryButton>

      <div class="card-icons">
        <img src="https://img.icons8.com/color/48/visa.png" alt="Visa">
        <img src="https://img.icons8.com/color/48/amex.png" alt="Amex">
        <img src="https://img.icons8.com/color/48/mastercard.png" alt="MasterCard">
        <img src="https://img.icons8.com/color/48/discover.png" alt="Discover">
      </div>
    </div>
  </div>
</template>

<style scoped>

/*.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(1px) brightness(95%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}*/

.paywall-container {
  position: relative;
  width: 100%;
  height: auto;
  background-color: #141414;
  border: 2px solid #00FF7F;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}

/*.paywall-container {
  background-color: #141414;
  border: 2px solid #00FF7F;
  border-radius: 5px;
  padding: 20px;
  width: 60%;
  height: 50vh;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}*/

.paywall-header {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #00FF7F;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

h1{
  text-align: center;
}

.ticket-info {
  margin-top: 5px;
  font-size: 16px;
  color: #ccc;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 15px;
}

.inline-inputs{
  width: 10vw;
}

.inline-fields {
  display: flex;
  gap: 10px;
}

.inline-fields input {
  flex: 1;
}

.pay-button {
  width: 50%;
  padding: 15px;
  font-weight: bold;
}

.card-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.card-icons img {
  width: 50px;
}
</style>