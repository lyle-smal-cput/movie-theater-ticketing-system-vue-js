<script setup>
import { ref,onBeforeMount, watch } from 'vue';
import MovieCardComponent from '../components/MovieCardComponent.vue';
import { getAllMovies } from "../routes/routes.js";
import AdminControlsComponent from "../components/AdminControlsComponent.vue";

const movies = ref([]);
const filteredMovies = ref([]);
const searchQuery = ref("");
const selectedGenre = ref("");
const genres = ref(["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Sports", "Documentary", "Thriller", "Animation", "Fantasy", "Mystery", "Crime", "Adventure", "Musical"]);

//Makes a request on the first load
onBeforeMount(async () => {
  movies.value = await getAllMovies();
  filteredMovies.value = movies.value;
});

//Search and Dropdown function
watch([searchQuery, selectedGenre], () => {
  filteredMovies.value = movies.value.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = selectedGenre.value ? movie.genre === selectedGenre.value : true;
    return matchesSearch && matchesGenre;
  });
});

</script>

<template>
  <div class="main">
  <div class="main-container">

    <div class="results-header">
      <h1>Movies</h1>
      <p v-if="!filteredMovies.length">No results</p>
      <p v-else >{{filteredMovies.length}} results found</p>
    </div>

    <div class="search-bar">
      <input type="text" 
      v-model="searchQuery" 
      placeholder="Search Movies..." 
      />

      <select v-model="selectedGenre">
        <option value="">All Genres</option>
        <option v-for="(genre, index) in genres" :key="index" :value="genre">{{ genre }}</option>
      </select>
    </div>

    <div class="movies-container">
      <MovieCardComponent v-for="(movie, index) in filteredMovies"
      :key="index"
      :title="movie.title"
      :description="movie.description"
      :id="movie.movieId"
      :genre="movie.genre"
      :age-restriction="movie.ageRestriction"
      :view-type="movie.viewType"
      :image="movie.image"/>
    </div>
  </div>

    <AdminControlsComponent button-text="Add Movies" button-link="/movie/create"/>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.results-header {
  background: transparent;
  padding: 10px;
  width: 150px;
  border-left: 10px solid #00FF7F;
}

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.search-bar {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.search-bar input[type="text"] {
  padding: 12px 40px;
  border: 3px solid #00FF7F;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.search-bar input[type="text"]:focus {
  border-color: #00FF7F;
  box-shadow: 0 0 5px rgba(0, 255, 127, 0.5);
  outline: none;
}

.search-bar select {
  padding: 12px 50px;
  border: 3px solid #00FF7F;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.search-bar select:focus {
  border-color: #00FF7F;
  box-shadow: 0 0 5px rgba(0, 255, 127, 0.5);
  outline: none;
}

</style>