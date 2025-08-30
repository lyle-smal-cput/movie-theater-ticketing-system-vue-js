<script setup>
import { ref } from 'vue';
import PrimaryButton from "../components/PrimaryButton.vue";
import { getUserDetails } from "../routes/routes.js";
import router from "../router";

const userId = ref("");
const password = ref("");

const user = ref(null);

async function validateUser() {
  try {

    user.value = await getUserDetails(userId.value);

    if (!user.value) {
      alert("User not found");
      return;
    }

    authenticateUser();
  } catch (err) {
    console.error("Error validating user:", err);
    alert("Something went wrong while validating user.");
  }
}

function authenticateUser() {
  if (user.value.password === password.value) {

    router.push("/user-details");
  } else {
    alert("Invalid password, please try again.");
  }
}
</script>

<template>
  <div class="login-page main">
    <div class="login-container">
      <h2>Login</h2>

      <form @submit.prevent="validateUser" class="login-form">
        <label for="userId">User ID</label>
        <input
            class="form-control"
            id="userId"
            v-model="userId"
            type="text"
            placeholder="Enter your User ID"
        />

        <label for="password">Password</label>
        <input
            class="form-control"
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
        />

        <p class="terms">
          By continuing, you agree to the <a href="#">Terms of Use</a> and
          <a href="#">Privacy Policy</a>.
        </p>

        <PrimaryButton button-text="Login" @click="validateUser" />

        <p class="signup-text">
          Don’t have an account?
          <a href="/signup">Sign up</a>
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
  background: white;
  border: 1px solid #ccc;
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
