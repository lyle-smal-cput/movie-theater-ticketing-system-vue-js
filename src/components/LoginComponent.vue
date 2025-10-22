<script setup>
import { ref } from 'vue';
import PrimaryButton from "../components/PrimaryButton.vue";
import { useRouter } from "vue-router";
import {authenticateUser, getCartByUserId} from "../routes/routes.js";

const router = useRouter();

const username = ref("");
const password = ref("");
const isAdmin = ref(false);
const user = ref({});

async function validateUser() {
  try {
    const response = await authenticateUser(username, password);

    localStorage.setItem("authenticatedUserId", response.userId);
    localStorage.setItem("username", response.username);
    localStorage.setItem("role", response.role);
    localStorage.setItem("token", response.token);
    if (response.role === "ADMIN") {
      localStorage.setItem("isAdmin", true);
    } else {
      localStorage.setItem("isAdmin", false);
    }

    alert("Login successful!");

    if (response.role === "ADMIN") {
      router.push("/movies");
    } else {
      const cart = await getCartByUserId(response.userId)
      if (cart) localStorage.setItem("cartId", cart.cartId);
      router.push("/movies");
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong while logging in.");
  }
}
</script>



<template>
  <div class="login-page main">
    <div class="login-container">
      <h2>
        <strong>
          Login
        </strong>
      </h2>

      <form @submit.prevent="validateUser" class="login-form">
        <label for="username">Username</label>
        <input class="form-control" id="username" v-model="username" type="text" placeholder="Enter your username" />

        <label for="password">Password</label>
        <input class="form-control" id="password" v-model="password" type="password" placeholder="Enter your password" />

        <label>Login as Admin
          <input id="admin" v-model="isAdmin" type="checkbox" />
        </label>

        <p class="terms">
          By continuing, you agree to the <a @click="router.push('/terms-and-conditions')">Terms & Conditions</a> and
          <a @click="router.push('/privacy-policy')">Privacy Policy</a>.
        </p>


        <PrimaryButton button-text="Login" @click="validateUser"/>

        <p class="signup-text">
          Don’t have an account?
          <router-link to="/signup">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background: transparent;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 550px;
}

h2 {

  margin-bottom: 20px;
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 5px;
}

input {
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #00FF7F;
}

.terms {
  font-size: 0.8rem;
  color: white;
  line-height: 1.4;
}

.terms a {
  color: #00FF7F;
  text-decoration: none;
  font-weight: bold;
}

.signup-text {
  text-align: center;
  color: white;
  margin-top: 10px;
}

.signup-text a {
  color: #00FF7F;
  font-weight: bold;
  text-decoration: none;
}
</style>

