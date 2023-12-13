<template>
    <article class="header">
        <img src="../assets/logo_SneakR.jpg" class="logo-SneakR" alt="Sneaker Image">
        <Title id="Title"> SneakR </Title>
    </article>
    <div id="grid">
        <article v-for="sneaker in sneakers" :key="sneaker.id" class="card">
            <img :src="sneaker.attributes.small_image_url" class="sneaker-image" alt="Sneaker Image">
            <div class="sneaker-details">
                <h3 class="sneaker-name">{{ sneaker.attributes.name }}</h3>
                <p class="sneaker-price">Retail {{ sneaker.attributes.retailPrice }} €</p>
            </div>
        </article>
    </div>
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


<style scooped>
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
}

.logo-SneakR {
    width: 10%;
    min-width: 125px;
}

#grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 5fr));
    gap: 20px;
}
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #00aaff;
    border-radius: 5px;
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
    font-size: 14px;
    color: #8cd8ff;
}
</style>