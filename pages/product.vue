<template>
</template>

<script>
export default {
    data() {
        return {
            sneakers: [],
            sneaker: {
                attributes: {
                    id: '',
                    name: '',
                    price: '',
                    description: '',
                    image: '',
                    brand: '',
                    color: '',
                    size: '',
                    stock: '',
                    created_at: '',
                    updated_at: ''
                }
            }
        }
    },
    mounted() {
        this.getSneakers();
        this.getSneaker(this.$route.params.id);
    },
    methods: {
        getSneakers() {
            if (this.$axios) {
                this.$axios.get('http://localhost:1338/api/sneakers')
                    .then((response) => {
                        this.sneakers = response.data.data;
                        console.log('Sneakers:', this.sneakers);
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
            }
        },
        getSneaker(id) {
            if (this.$axios) {
                this.$axios.get('http://localhost:1338/api/sneakers/' + id)
                    .then((response) => {
                        this.sneaker = response.data.data;
                        console.log('Sneaker ID:', this.sneaker.attributes.id); // Ajout de l'affichage de l'ID dans la console
                        console.log('Sneaker:', this.sneaker);
                    })
                    .catch((error) => {
                        console.log('Error:', error);
                    });
            }
        },
    },
}
</script>

<style>
</style>
