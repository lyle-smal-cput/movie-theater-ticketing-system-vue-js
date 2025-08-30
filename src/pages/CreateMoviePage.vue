<script setup>
import {ref} from "vue";
import MovieCardComponent from "../components/MovieCardComponent.vue";
import PrimaryTag from "../components/PrimaryTag.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
import {createMovie} from "../routes/routes";
import router from "../router";

const movieTitle = ref("");
const movieGenre = ref("");
const movieDuration = ref("");
const moviePrice = ref("");
const movieDistributor = ref("");
const movieImage = ref("");
const movieDescription = ref("");
const ageRestriction = ref("");
const viewType = ref("");

function onFileChange(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    movieImage.value = reader.result.split(",")[1];
  };
  reader.readAsDataURL(file);
}

async function onSubmit() {
  const movie = {
    title: movieTitle.value,
    genre: movieGenre.value,
    description: movieDescription.value,
    ageRestriction: ageRestriction.value,
    viewType: viewType.value,
    durationMinutes: movieDuration.value,
    price: moviePrice.value,
    distributor: movieDistributor.value,
    image: movieImage.value,
  };

  try {
    const data = await createMovie(movie);
    alert("Movie created!");
    router.push(`/movie/${data.movieId}`);


  } catch (err) {
    console.error("Failed to create movie:", err);
    alert("Failed to create movie: " + err.message);
  }
}
</script>

<template>
  <div class="main">
    <div class="main-container">


      <div class="form">
        <h1 v-if="!movieTitle"><strong>Create Movie</strong></h1>
        <h1 v-else><strong>Create Movie</strong>: {{movieTitle}}</h1>

        <label for="movieTitle" class="form-label">
          Enter the title
        </label>
        <input class="form-control" v-model="movieTitle" :class="{warningField: null}" id="movieTitle" placeholder="E.g Jurassic Park">

        <label for="movieGenre" class="form-label">
          Enter the genre
        </label>
        <input class="form-control" v-model="movieGenre" :class="{warningField: null}" id="movieGenre" placeholder="E.g Comedy">

        <label for="movieDistributor" class="form-label">
          Enter the distributor
        </label>
        <input class="form-control" v-model="movieDistributor" :class="{warningField: null}" id="movieDistributor" placeholder="E.g Marvel Studios">

        <label for="movieDuration" class="form-label">
          Movie duration
        </label>
        <input class="form-control" :class="{warningField: null}" v-model="movieDuration" id="movieDuration" type="number" placeholder="E.g 90 mins">

        <label for="movieDescription" class="form-label">
          Enter the description
        </label>
        <textarea class="form-control" :class="{warningField: null}" v-model="movieDescription" id="movieDescription" placeholder="E.g When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans."/>

        <label for="ageRestriction" class="form-label">
          Age restriction
        </label>
        <input class="form-control" :class="{warningField: null}" v-model="ageRestriction" id="ageRestriction" type="number" placeholder="E.g 18">

        <label for="moviePrice" class="form-label">
          Price
        </label>
        <input class="form-control" :class="{warningField: null}" v-model="moviePrice" id="moviePrice" type="number" placeholder="E.g R180">

        <label class="form-label">Select the view type</label>

        <div class="radio-buttons">
        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="2D"
              value="2D"
              v-model="viewType"
          />
          <label class="form-check-label" for="list"><PrimaryTag label="2D"/></label>
        </div>

        <div class="form-check">
          <input
              class="form-check-input"
              type="radio"
              id="3D"
              value="3D"
              v-model="viewType"
          />
          <label class="form-check-label" for="grid"><PrimaryTag label="3D"/></label>
        </div>
        </div>

      </div>

      <div class="form">
        <img v-if="movieImage" :src="'data:image/jpeg;base64,' + movieImage" />
        <img v-else src="/src/assets/no-photo.jpg" />

        <label for="movieImage" class="form-label">
          Select an image
        </label>
        <input
            class="form-control"
            :class="{ warningField: null }"
            id="movieImage"
            type="file"
            accept="image/png, image/jpeg"
            @change="onFileChange"
            placeholder="Select the cover image"
        />
      </div>

      <div class="preview">
        <h3><strong>Preview</strong></h3>
      <MovieCardComponent
          :image="movieImage"
          :title="movieTitle"
          :genre="movieGenre"
          :view-type="viewType"
          :disable-button="true"
      />
  </div>
  </div>
    <PrimaryButton v-if="movieTitle" :button-text="'Create ' + movieTitle" @click="onSubmit"/>
  </div>
</template>
<style scoped>
.main-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: left !important;
  width: 500px;
}

.radio-buttons{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

img{
  aspect-ratio: 2/3 !important;
  width: 300px !important;
  border-radius: 25px;
}
</style>
