<template>
  <article class="header">
      <img src="../assets/logo_SneakR.jpg" class="logo-SneakR" alt="Sneaker Image">
      <h1 id="Title"> SneakR </h1>
  </article>
  <!-- SearchBar -->
<searchbar></searchbar>
  <!-- Items -->
  <div id="grid">
      <article v-for="sneaker in sneakers" :key="sneaker.id" class="card">
          <img :src="sneaker.attributes.small_image_url" class="sneaker-image" alt="Sneaker Image">
          <div class="sneaker-details">
              <h3 class="sneaker-name">{{ sneaker.attributes.name }}</h3>
              <p class="sneaker-brand"> {{ sneaker.attributes.brand }}</p>
              <p class="sneaker-gender"> {{ sneaker.attributes.gender }}</p>
              <p class="sneaker-price">Retail {{ sneaker.attributes.retailPrice }} €</p>
          </div>
      </article>
  </div>
  <div id="page">
      <button @click="previousPage">Previous Page</button>
      <input type="text" v-model="pageNumber" id="actualPage" />
      <button @click="nextPage">Next Page</button>
  </div>
  <title v-html="pageTitle"></title>
</template>


<script>
import searchbar from '~/components/searchbar.vue';
export default {
  data() {
      return {
          sneakers: [],
          pageTitle: "SneakR - YOUR sneakers reference",
          pageNumber: 1,
          pageSize: 100,
      };
  },
  methods: {        
      async loadData() {
          try {
              const response = await fetch(
                  `http://localhost:1338/api/sneakers?pagination%5Bpage%5D=${this.pageNumber}&pagination%5BpageSize%5D=${this.pageSize}`
              ).then((response) => response.json());

              const sneaker = response.data;
              this.sneakers = sneaker;

              console.log("", sneaker);
          } catch (error) {
              console.error("Erreur lors de la récupération des données :", error);
          }
      },
      previousPage() {
          this.pageNumber = Math.max(1, this.pageNumber - 1);
          this.loadData();
      },
      nextPage() {
          this.pageNumber++;
          this.loadData();
      },
  },
  async mounted() {
      await this.loadData();
  },
};
</script>

<style>
html, body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: large;
    color: #cbd5e1;
    background-color: #111827;
}
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1%;
}

#Title {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 100px;
  text-align: center;
  position: absolute;
  left: 40%;
  color: #8cd8ff;
  margin: 0%;    
}

.logo-SneakR {
  width: 10%;
  min-width: 125px;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  overflow-x: hidden;
  border-radius: 5px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #8cd8ff;
  border-radius: 10px;

}
.card:hover {
  background-color: #5196b9;
  transform: scale(1.05);
}

.sneaker-image {
  width: 100%;
  max-width: 200px;
  height: auto;
}

.sneaker-details {
  margin-top: 10px;
  text-align: center;
}

.sneaker-name {
  font-size: 18px;
  font-weight: bold;
}

.sneaker-price {
  font-size: larger;
  color: #8cd8ff;
  font-weight: bold;
}

button {
  margin: 10px;
  padding: 10px;
  border: 1px solid #00aaff;
  border-radius: 5px;
  background-color: #00aaff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0283c3;
  scale: 1.1;
  border: none;
}

#page {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#actualPage {
  width: minmax(25px, 75px);
  text-align: center;
  font-family: sans-serif;
  font-size: 125%;
  border-radius: 15px;
}
.sneaker-brand
{
  font-weight: bold;
}

@media screen and (max-width: 600px){

  #Title {
    font-size: 350%;
    display: flex;
    justify-content: center;
  }
  .logo-SneakR {
    width: 20%;
  }
}
</style>