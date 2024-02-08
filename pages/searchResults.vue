<template>
  <div>
    <h2>Résultats de la recherche pour "{{ $route.query.search }}"</h2>
    <div v-for="sneaker in searchResults" :key="sneaker.id" class="card">
      <img :src="sneaker.small_image_url" class="sneaker-image" alt="Sneaker Image">
      <div class="sneaker-details">
        <h3 class="sneaker-name">{{ sneaker.name }}</h3>
        <p class="sneaker-brand">{{ sneaker.brand }}</p>
        <p class="sneaker-gender">{{ sneaker.gender }}</p>
        <p class="sneaker-price">Retail {{ sneaker.retailPrice }} €</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchResults: [],
    };
  },
  methods: {
    async fetchSearchResults() {
      try {
        // Étape 1: Recherche par nom et marque
        const response = await fetch(
          `http://localhost:1338/api/sneakers?_where[or][0][attributes.name_contains]=${this.searchTerm}&_where[or][1][attributes.brand_contains]=${this.searchTerm}`
        ).then((response) => response.json());

        const sneakers = response.data;

        // Étape 2: Récupération des IDs correspondants
        const sneakerIds = sneakers.map((sneaker) => sneaker.id);

        // Étape 3: Récupération des sneakers par ID
        const detailedResponse = await Promise.all(
          sneakerIds.map((sneakerId) =>
            fetch(`http://localhost:1338/api/sneakers/${sneakerId}`).then((response) => response.json())
          )
        );

        this.searchResults = detailedResponse.map((sneaker) => sneaker.data);

        console.log("", this.searchResults);
      } catch (error) {
        console.error('Erreur lors de la récupération des résultats de recherche :', error);
      }
    },
  },
  watch: {
    $route(to, from) {
      // Réexécutez la recherche chaque fois que l'URL change
      this.fetchSearchResults();
    },
  },
  mounted() {
    // Exécutez la recherche initiale lors du montage de la page
    this.fetchSearchResults();
  },
};
</script>

<style>
/* Ajoutez vos styles CSS ici si nécessaire */
</style>
