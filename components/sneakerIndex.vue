<template>
    <h1 id="title">SneakR</h1>
    <article v-for="sneaker in sneakers" :key="sneaker.id" class="colonne">
        <div id="eachSneakers">

            <img :src="sneaker.attributes.small_image_url" id="sneak" alt="Sneaker Image">
            {{ sneaker.attributes.name }} - Retail {{ sneaker.attributes.retailPrice }} €


        </div>
    </article>
</template>

<script>
export default {
    data() {
        return {
            sneakers: [],
            page: 1,
        };
    },
    methods: {
        async loadData() {
            try {
                const response = await fetch('http://localhost:1338/api/sneakers?pagination%5Bpage%5D=1&pagination%5BpageSize%5D=100')
                    .then(response => {
                        return response.json();
                    });

                const sneaker = response.data;
                this.sneakers = sneaker;

                console.log("", sneaker);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        },
        async loadMore() {
            try {
                this.page += 1;
                await this.loadData();
            } catch (error) {
                console.error('Erreur lors du chargement de plus de données :', error);
            }
        },
    },
    async mounted() {
        await this.loadData();
    },
};
</script>

<style>
#title {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 50px;
    text-align: center;
}

#sneak {
    width: 50%;
}

#eachSneakers {
    list-style: none;
    display: flex;
    flex-direction: column;
  }
</style>
