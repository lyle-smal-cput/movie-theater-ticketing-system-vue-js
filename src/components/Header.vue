<template>
  <header>
    <div style="display: flex; flex-direction: row;">
      <h2><strong>Studio Vista</strong></h2>
    </div>

    <nav>
      <a class="nav-elem" :class="{active : router.currentRoute.value.path === '/movies'}" @click="router.push('/movies')">Browse Movies</a> | <a class="nav-elem" :class="{active : router.currentRoute.value.path === '/about-us'}" @click="router.push('/about-us')">About Us</a>
    </nav>

    <div class="login-sign-up">

      <PrimaryButton v-if="userId===null" link="/login" button-text="Login" />
      <PrimaryButton v-if="userId===null" link="/signup" button-text="Sign Up" />

      <a @click="router.push('/cart')">
        <i class="fas fa-shopping-cart"></i>
      </a>
      <a v-if="userId!==null" @click="router.push('/user-details')">
        <i class="fas fa-user"></i>

        <PrimaryTag v-if="userId" :label="username"/>
      </a>

      <PrimaryButton v-if="userId!==null" button-text="Log Out" @click="logOut()"/>

    </div>
  </header>
</template>

<script setup>
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryTag from "./PrimaryTag.vue";
import {onMounted, ref, watch} from "vue";
import router from "../router";
import {useRoute} from "vue-router";

const userId = ref();
const isAdmin = ref();
const username = ref();

const route = useRoute();

function setUserDetails(loggedIn = true){
  if(loggedIn){
  userId.value = localStorage.getItem('authenticatedUserId');
  username.value = localStorage.getItem('username');
  isAdmin.value = localStorage.getItem('isAdmin') === 'true';
  }
  else{
   localStorage.clear();
    userId.value = null;
    username.value = null;
    isAdmin.value = undefined;
  }
}

function logOut(){
  setUserDetails(false);
  router.push("/login");
}

watch(
    () => route.fullPath,
    () => {
      setUserDetails();
    },
    { immediate: true } // also call it once on initial load
);

onMounted(() => {
  setUserDetails();
});

</script>

<style scoped>
.active{
  color: #00FF7F;
}
</style>
