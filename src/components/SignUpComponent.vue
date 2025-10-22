<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PrimaryButton from "../components/PrimaryButton.vue";
import { createCustomer, createAdmin, createCart } from "../routes/routes.js";

const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const isAdmin = ref(false);

function validateForm() {
  if (!firstName.value || !lastName.value || !username.value || !email.value || !password.value) {
    alert("Please fill in all required fields.");
    return false;
  }
  if (!email.value.includes("@")) {
    alert("Please enter a valid email.");
    return false;
  }
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }
  return true;
}

async function createUser() {
  if (!validateForm()) return;

  const newUser = {
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    admin: isAdmin.value
  };

  if (isAdmin.value !== true) {
    try {
      const data = await createCustomer(newUser);
      localStorage.setItem("authenticatedUserId", data.userId);
      localStorage.setItem("isAdmin", isAdmin.value);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Create a cart
      const cartObject = {
        quantity: 0,
        customer: { userId: data.userId},
      }

      const token = localStorage.getItem("token");
      const cart = await createCart(cartObject, token);
      localStorage.setItem("cartId", cart.cartId);

      alert("Customer account created successfully!");
      await router.push("/movies");
    } catch (err) {
      console.error("Failed to create account:", err);
      alert("Something went wrong while creating your account.");
    }
  } else {
    try {
      const data = await createAdmin(newUser);
      localStorage.setItem("authenticatedUserId", data.userId);
      localStorage.setItem("isAdmin", isAdmin.value);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Admin account created successfully!");
      await router.push("/movies");
    } catch (err) {
      console.error("Failed to create account:", err);
      alert("Something went wrong while creating your account.");
    }
  }
}
</script>

<template>
  <div class="signup-page main">
    <div class="signup-container">
      <h2>
        <strong>
          Create an account
        </strong>
      </h2>
      <p class="login-link">
        Already have an account? <router-link to="/login">Log in</router-link>
      </p>

      <form class="signup-form" >
        <div class="name-fields">
          <div class="field">
            <label for="firstName">First Name</label>
            <input
                id="firstName"
                class="form-control"
                v-model="firstName"
                type="text"
                placeholder="Enter your first name"
            />
          </div>

          <div class="field">
            <label for="lastName">Last Name</label>
            <input
                id="lastName"
                class="form-control"
                v-model="lastName"
                type="text"
                placeholder="Enter your last name"
            />
          </div>
        </div>

        <label for="username">What should we call you?</label>
        <input
            id="username"
            class="form-control"
            v-model="username"
            type="text"
            placeholder="Enter a display name"
        />

        <label for="email">What's your email?</label>
        <input
            id="email"
            class="form-control"
            v-model="email"
            type="email"
            placeholder="Enter your email"
        />

        <label for="password">Create a password</label>
        <input
            id="password"
            class="form-control"
            v-model="password"
            type="password"
            placeholder="Enter a strong password"
        />
        <p class="password-hint">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        <label>Sign up as Admin
          <input id="admin" v-model="isAdmin" type="checkbox" />
        </label>

        <p class="terms">
          By creating an account, you agree to the
          <a @click="router.push('/terms-and-conditions')">Terms & Conditions</a> and
          <a @click="router.push('/privacy-policy')">Privacy Policy</a>.
        </p>

        <PrimaryButton button-text="Create an account" type="submit" @click="createUser"/>
      </form>
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-container {
  background: transparent;
  padding: 30px;
  border-radius: 10px;
  text-align: left;
  width: 100%;
  max-width: 600px;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
  color: white;
}

.login-link {
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.login-link a {
  color: #00FF7F;
  text-decoration: none;
  font-weight: bold;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.name-fields {
  display: flex;
  gap: 20px;
}

.field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 5px;
}

input {
  border-radius: 5px;
  color: black;
  padding: 10px;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: #00FF7F;
}

.password-hint {
  font-size: 0.8rem;
  color: white;
  margin-top: -10px;
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
</style>

