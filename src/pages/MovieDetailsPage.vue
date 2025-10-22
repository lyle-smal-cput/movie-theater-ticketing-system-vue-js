<script setup>
import {useRoute} from "vue-router";
import {getMovieById, getAllBranches, 
        getAllTheatersByBranchId, 
        getMoviesByGenre, 
        createSchedule, 
        getAllSeatsByTheaterRoomIdAndAvailability, 
        createCart, 
        getCustomerDetails, 
        getCartByUserId, getAllCartItemsByCartId} from "../routes/routes.js";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import SecondaryTag from "../components/SecondaryTag.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import SeatComponent from "../components/SeatComponent.vue";
import AdminControlsComponent from "../components/AdminControlsComponent.vue";
import PaywallComponent from "../components/PaywallComponent.vue";
import router from "../router/index.js";
import MovieCardComponent from "../components/MovieCardComponent.vue";
import OrderPDF from "../components/OrderPDF.vue";
import {createCartItem} from "../routes/routes.js";

const route = useRoute(); //gets the route path

const isAdmin = localStorage.getItem("role");

const movieId = route.params.id; // gets the id used as a param
const movie = ref();
const movies = ref([]);
const viewSummary= ref(false);

const branches = ref([]);
const selectedBranchId = ref("Choose a branch");
const defaultBranchText = ref("Choose a branch");
const displaySelectedBranch = ref();

const theaters = ref([]);
const selectedTheaterId = ref("Choose a theater");
const defaultTheaterText = ref("Choose a theater");

const seats = ref([]);
const seatsSelected = ref([]);

const selectedTicketQuantity = ref(null);
const exceedsTicketLimit = ref(false);

const showPaywall = ref(false);
const cartId = localStorage.getItem("cartId");
const userId = localStorage.getItem("authenticatedUserId");

// To add movie to cart
async function addToCart() {
  try {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    //To retrieve customer details
    const customer = await getCustomerDetails(userId); 

    //To retrieve user's cart
    let cart = await getCartByUserId(userId); 

    // If no cart exists, create one
    if (!cart || !(cart.id || cart.cartId)) {
      cart = await createCart({ userId });
      if (!cart || !(cart.id || cart.cartId)) {
        alert("Could not create a cart for this user.");
        return;
      }
    }

    const cartId = cart.id || cart.cartId;

    //To retrieve all cart items
    let cartItems = [];
    try {
      const response = await getAllCartItemsByCartId(cartId);
      cartItems = Array.isArray(response) ? response : [];
    } catch (err) {
      console.warn("Could not fetch cart items:", err);
      cartItems = [];
    }

    //To prevent duplicates by check if the movies is already in the cart
    const existingItem = cartItems.find(item => item.movieTitle === movie.value.title);
    if (existingItem) {
      alert("This movie is already in your cart!");
      return;
    }

    //To create cart item
    const cartItem = { 
      cart: cart, 
      customer: customer, 
      quantity: selectedTicketQuantity.value, 
      price: movie.value.price * selectedTicketQuantity.value, 
      movieTitle: movie.value.title,
      image: movie.value.image,
      seats: seatsSelected.value,
    }; 

    await createCartItem(cartItem); 
    alert("Movie added to cart!");
    router.push("/cart");
    resetForm();
  } catch (err) {
    console.error("Error adding movie to cart:", err);
    alert("Something went wrong. Please try again.");
  }
}

//To reset the form after adding movie to cart
function resetForm(){
  selectedBranchId.value = defaultBranchText.value;
  selectedTheaterId.value = defaultTheaterText.value;
  selectedTicketQuantity.value = null;
  seatsSelected.value = [];
}


async function checkout(){
  const schedule = {
    movieId: { movieId: movie.value.movieId },
    theaterRoomId: { theaterRoomId: selectedTheaterId.value },
    startTime: "14:00",
    endTime: "16:00",
    date: "2025-09-01"
  };
  const data = await createSchedule(schedule);
  openPaywall();
}

function openPaywall(){
  showPaywall.value = true;
}

function closePaywall(){
  showPaywall.value = false;
}

function toggleTicketSummary(){
  viewSummary.value = !viewSummary.value;
}

async function addSeatSelection(id) {
  const index = seatsSelected.value.indexOf(id);

  if (index === -1) {
    if (seatsSelected.value.length < selectedTicketQuantity.value) {
      seatsSelected.value.push(id);
    }
  }
  else {
    seatsSelected.value.splice(index, 1);
  }
}

function isSeatSelected(id){
  return seatsSelected.value.includes(id);
}

//makes a request on load
onBeforeMount(async() => {
   movie.value = await getMovieById(movieId);
   movies.value = await getMoviesByGenre(movie.value.genre);
   for(let i = 0; i < movies.value.length;i++){
     if(movies.value[i].movieId === movie.value.movieId){
       movies.value.splice(i, 1);
       break;
     }
   }
   branches.value = await getAllBranches();
});

onMounted(async() =>{
  window.scrollTo({ top: 0, behavior: 'auto' });
})

watch(selectedBranchId, async (newBranchId) => {

  if (!newBranchId) {
    theaters.value = []
    return
  }

  selectedTheaterId.value = defaultTheaterText.value;
  theaters.value = await getAllTheatersByBranchId(newBranchId)

  for(let i=0; i < branches.value.length ; i++){
    if(selectedBranchId.value === branches.value[i].branchId){
      displaySelectedBranch.value = branches.value[i].location;
      return
    }
  }
})

watch(selectedTheaterId, async(newTheaterId)=>{
    selectedTicketQuantity.value = null;
    seats.value = await getAllSeatsByTheaterRoomIdAndAvailability(newTheaterId, true);
})

watch(selectedTicketQuantity, async(ticketQuantity)=>{
    exceedsTicketLimit.value = false;

  if(ticketQuantity < 0){
    selectedTicketQuantity.value = null;
  }

  if (ticketQuantity > seats.value.length){
    exceedsTicketLimit.value = true;
  }

  //reset seat selection
  seatsSelected.value = [];
})

async function redirect(id){
  await router.push(`/movie/edit/${id}`);
}
</script>

<template>
<div class="main">

  <div class="movie-details-container">
    <img v-if="movie.image" :src="'data:image/jpeg;base64,' + movie.image" alt="Movie poster" />
    <img v-else src= '/src/assets/no-photo.jpg'>

    <!--MOVIE DETAILS-->
    <div class="movie-details">
      <h1><strong>{{ movie.title }}</strong></h1>

      <PrimaryTag v-if="movie.viewType==='3D'" :label="movie.viewType"/>
      <div>
      <SecondaryTag v-if="movie.genre" :label="movie.genre"/>
      <SecondaryTag v-if="movie.distributor" :label="movie.distributor"/>
      </div>

      <p>{{ movie.description }}</p>

      <div v-if="movie.price" class="movie-details-pricing">
      <h1><strong>R{{ movie.price }}</strong></h1>
        &nbsp;
      <p> per ticket</p>
      </div>
    </div>
    </div>

  <!--BOOK NOW-->
  <div class="book-now-container card">
    <h1 style="margin: 40px;"><strong>Book Now</strong></h1>

    <!--FORM FIELDS-->
    <div class="form-fields">
    <div v-if="!viewSummary">
      <!--BRANCH-->
      <div class="mb-3">
    <h6>Choose a branch
      <PrimaryTag v-if="selectedBranchId!==defaultBranchText" label="✓" />
    </h6>
    <select class="form-select" v-model="selectedBranchId">
      <option selected>{{ defaultBranchText }}</option>
      <option v-for="branch in branches" :key="branch.branchId" :value="branch.branchId">{{branch.location}}</option>
    </select>
    </div>
    </div>

    <!--THEATER ROOM-->
    <div v-if="selectedBranchId!==defaultBranchText && !viewSummary" class="mb-3">
    <h6>Theater Room
      <PrimaryTag v-if="selectedTheaterId!==defaultTheaterText" label="✓" />
    </h6>

      <select class="form-select" v-model="selectedTheaterId">
      <option selected>{{ defaultTheaterText }}</option>
      <option v-for="theater in theaters" :key="theater.theaterRoomId" :value="theater.theaterRoomId">RM{{theater.roomNumber}}</option>
    </select>

      <p v-if="selectedTheaterId===defaultTheaterText && !viewSummary">No Theater Selected</p>
      <h1 v-else ><strong>RM{{ selectedTheaterId }}</strong></h1>
    </div>

    <!--TICKET QUANTITY-->
    <div v-if="selectedTheaterId!==defaultTheaterText && !viewSummary" class="mb-3">
      <label for="seatQuantity" class="form-label">
        Enter your ticket quantity
        <PrimaryTag v-if="selectedTicketQuantity" label="✓" />
      </label>
      <input v-model="selectedTicketQuantity" class="form-control" :class="{warningField: exceedsTicketLimit}" type="number" id="seatQuantity" placeholder="E.g 1">
      <label for="seatQuantity" class="form-label warning" v-if="exceedsTicketLimit">{{seats.length}} seats available</label>
    </div>

    <div v-if="selectedTicketQuantity && !viewSummary && !exceedsTicketLimit" class="seats">
      <h6>
        Select {{ selectedTicketQuantity }} seat(s)
        <PrimaryTag v-if="seatsSelected.length===selectedTicketQuantity" label="✓" />
      </h6>

    <div class="seat-container">
    <SeatComponent v-for="seat in seats" :key="seat.seatId" :label="seat.seatId" :isSelected="isSeatSelected(seat.seatId)" @click="addSeatSelection(seat.seatId)" />
    </div>
    </div>

    <!--TICKET SUMMARY-->
    <div class="accordion" id="ticketSummary">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="toggleTicketSummary()">
            Ticket Summary
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#ticketSummary">
          <div class="accordion-body">
            <img v-if="movie.image" :src= "'data:image/jpeg;base64,'+ movie.image"/>
            <img v-else src= '/src/assets/no-photo.jpg'/>

            <h3><strong>{{movie.title}}</strong></h3>

            <p v-if="selectedBranchId!==defaultBranchText">
              <strong>Branch</strong>: {{ displaySelectedBranch }}
            </p>

            <p v-if="selectedTheaterId!==defaultTheaterText">
              <strong>Theater</strong>: RM{{ selectedTheaterId }}
            </p>

            <p v-if="selectedTicketQuantity">
              <strong>Quantity</strong>: {{ selectedTicketQuantity }}
            </p>

            <p v-if="seatsSelected.length">
              <strong>Seats</strong>: {{ seatsSelected }}
            </p>
          </div>

          <div v-if="selectedTicketQuantity">
            <h5><strong>Total:</strong></h5>
            <p><strong>R{{selectedTicketQuantity * movie.price}}</strong> @ <strong>R{{movie.price}}</strong> per ticket</p>
          </div>

          <OrderPDF v-if="seatsSelected.length===selectedTicketQuantity" :movie-name="movie.title" :total="selectedTicketQuantity * movie.price" :quantity="selectedTicketQuantity" :price="movie.price" :image="movie.image" :showPDF="true"/>
        </div>
      </div>
    </div>
    </div>




  </div>

  <div v-if="seatsSelected.length === selectedTicketQuantity" class="checkout-container">
    <div class="total-price">
      <h5 v-if="selectedTicketQuantity">
        <strong>
          Total: R{{selectedTicketQuantity * movie.price}}
        </strong>
      </h5>
      <p v-if="selectedTicketQuantity">{{selectedTicketQuantity}} ticket(s)</p>
    </div>

    <PrimaryButton v-if="!viewSummary" class="checkout-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" @click="toggleTicketSummary()" button-text="Confirm"/>
    <PrimaryButton v-else class="cart-button" button-text="Add to Cart" @click="addToCart(movie, 1)"/>
    <!--<PrimaryButton v-else class="checkout-button" button-text="Checkout" @click="checkout()"/>-->

  </div>
  <AdminControlsComponent v-if="isAdmin==='ADMIN'" button-text="Edit Movie" @click="redirect(movieId)"/>
</div>

  <PaywallComponent
      v-if="showPaywall"
      @close="closePaywall"
      :total-amount="selectedTicketQuantity * movie.price"
      :number-of-tickets="selectedTicketQuantity"
      :movie-title="movie.title"
      :selected-seats="seatsSelected"
  />

  <div v-if="movies.length > 0" class="related-movies-container">
      <p>Movies related by genre: <PrimaryTag :label="movie.genre"/></p>
        <div class="related-movies">
          <MovieCardComponent
              v-for="(movie, index) in movies.slice(0, 4)"
              :key="index"
              :id="movie.movieId"
              :image="movie.image"
              :title="movie.title"
              :genre="movie.genre"
              :view-type="movie.viewType"
          />
        </div>
  </div>
</template>

<style scoped>
@media(min-width: 1025px) {
  .main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  img {
    aspect-ratio: 2/3;
    height: 650px;
    border-radius: 25px;
  }

  .movie-details-container {
    display: flex;
    flex-direction: row;
    max-height: 650px;
  }

  .movie-details-pricing {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    bottom: 10vh;
    position: absolute;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    padding: 20px;
  }

  .related-movies {
    display: flex;
    flex-direction: row;
  }

  .book-now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    aspect-ratio: 1/1.3;
    background: transparent;
    border-radius: 25px;
    height: 650px;
    min-width: 500px;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    aspect-ratio: 1/1.3;
    border-radius: 25px;
    min-width: 500px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  select {
    width: 320px;
  }

  input {
    width: 320px;
  }

  .accordion {
    width: 320px;
  }

  .accordion button {
    color: white;
    background: #141414;
  }

  .collapse {
    background: #282828;
  }

  .accordion-body p {
    text-align: left;
  }

  .accordion img{
    height: 100px;
    aspect-ratio: 1/1.3;
    border-radius: 0;
  }
}



  .checkout-container {
    color: #141414;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 100px;
    background: #00FF7F;
    position: fixed;
    bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    z-index: 10;
    opacity: 90%;
  }

  .total-price {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .seat-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: scroll;
    width: 320px;
    max-height: 75px;
  }

@media(max-width: 1024px){
  img {
    aspect-ratio: 2/3;
    width: 100%;
    border-radius: 25px;
  }

  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .movie-details-pricing {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 0;
  }

  .related-movies {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .book-now-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #141414;
    border-radius: 25px;
    width: 80vw;
    height: auto;
    padding: 5vw;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #141414;
    border-radius: 25px;
    width: 80vw;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
  }

  select {
    width: 70vw;
  }

  input {
    width: 70vw;
  }
  .accordion{
    width: 70vw;
  }

  .checkout-container{
    top: 11vh;
    width: 80vw;
  }

  .seat-container {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    width: 70vw;
  }

  .accordion img{
    width: 50vw;
    aspect-ratio: 1/1.3;
    border-radius: 0;
  }
}
</style>