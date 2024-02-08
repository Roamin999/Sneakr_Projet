<template>
  <div class="container">
    <form @submit.prevent="executeSearch" class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search for a sneaker" name="search" />
      <button type="submit"><img src="../assets/search.png" alt="Search button"></button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    executeSearch() {
      // Redirigez vers la page de résultats avec le terme de recherche
      this.$router.push({ name: 'searchResults', query: { search: this.searchTerm } });
    },
  },
};
</script>
<style>
.container {
  width: 100%;
  padding: 2%;
  display: flex;
  justify-content: center;
  padding-right: 0%;
  padding-left: 0%;
}

.search-bar {
  width: 100%;
  max-width: 700px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 60px;
  padding: 10px 0px 10px 20px;
  background-color: #f2f2f2;
}

.search-bar input {
  background: transparent;
  flex: 1;
  border: none;
  outline: none;
  padding: 20px;
  font-size: 20px;
}

::placeholder {
  font-size: 20px;
}

.search-bar button img {
  width: 35px;
}

.search-bar button {
  border: none;
  border-radius: 0% 50px 50px 0%;
  width: 120px;
  height: 60px;
  cursor: pointer;
  margin-right: 0%;
  padding-right: 3%;
  background-image: linear-gradient(to right, #f2f2f2 , #00aaff 55%);
  display: flex;
  justify-content: end;

}

.search-bar button:hover {
  background-image: linear-gradient(to right, #f2f2f2 , #0099e5 40%);
  scale: 1;
  border: none;
}

@media screen and (max-width: 600px) {
  .container {
    display: flex;
    justify-content: center;
    padding-left: 0%;
  }
  .search-bar {
    padding: 10px 0px 10px 10px; 
  }

  .search-bar input {
    padding: 10px;
    font-size: 16px;
  }

  ::placeholder {
    font-size: 16px;
  }

  .search-bar button img {
    width: 30px;
  }

  .search-bar button {
    width: 60px;
  }
}
</style>
