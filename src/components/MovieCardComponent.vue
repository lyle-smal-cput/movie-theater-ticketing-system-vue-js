<script setup>
import PrimaryButton from '../components/PrimaryButton.vue';
import PrimaryTag from './PrimaryTag.vue';
import router from "../router/index.js";

``
defineProps({
  id: String,
  title: String,
  description: String,
  image: Blob,
  genre: String,
  ageRestriction: String,
  viewType: String,
  disableButton: Boolean,
})

function redirect(id){
  if (id!==undefined) {
    router.push(`/movie/${id}`);
  }
}
</script>

<template>
  <div class="card">
    <router-link :to="`/movie/${id}`">
      <img v-if="image" :src="'data:image/jpeg;base64,' + image" class="card-img-top" alt="...">
      <img v-else src="/src/assets/no-photo.jpg" class="card-img-top" alt="...">

      <div class="card-body">
        <div class="my-card-header">
          <h5 class="card-title">{{ title }}</h5>&nbsp;
          <PrimaryTag v-if="viewType==='3D'" :label="viewType"/>
        </div>
        <p>{{ genre }}</p>
        <PrimaryButton v-if="!disableButton" buttonText="View Now"/>
      </div>
    </router-link>
  </div>
</template>


<style scoped>
.card{
  width: 18rem;
  background: #141414;
  margin: 10px;
  border-radius: 8px;
}

.card-title{
  font-weight: bolder;
}

.my-card-header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

img{
  aspect-ratio: 2/3;
}
</style>