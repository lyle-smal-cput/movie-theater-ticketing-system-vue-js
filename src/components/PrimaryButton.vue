<script setup>
import router from "../router/index.js";

defineProps({
    buttonText: String,
    link: String
})
</script>

<template>
  <router-link v-if="link" :to="link" class="btn btn-primary">
    {{ buttonText }}
  </router-link>
  <a v-else class="btn btn-primary">{{ buttonText }} <slot/></a>
</template>

<style scoped>
.btn{
  color: white;
  background: #282828;
  font-weight: bolder;
  border: 2px solid transparent;
  transition: ease-in-out 0.3s;
  margin: 5px;
}

.btn:hover{
  color: #141414;
  background: #00FF7F;
}
</style>