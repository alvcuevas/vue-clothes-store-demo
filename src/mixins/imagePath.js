export const imagePath = {
    methods: {
        getImagePath(product) {
            return require(`../assets/img/products/${product.images[0]}`);
        }
    }
}