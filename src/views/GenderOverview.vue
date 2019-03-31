
<template>
  <div>
    <h1 class="wrapper">{{ pageTitle }}</h1>
    <ul class="wrapper grid-items-list">
      <li v-for="product in productsByGender" :key="product.id" class="grid-item">
        <router-link :to="{ name: 'product', params: { id: product.id}}">
          <img class="product-image" :src="getImagePath(product)" alt="">
          <p class="product-title">{{ product.name }}</p>
          <p><em>${{ product.price }}</em></p>
        </router-link>
      </li>
    </ul>
    <div class="wrapper random-items-list-wrapper">
      <h2>Our Recommendations</h2>
      <p>Try these on for size!</p>
      <section class="random-items-list">
        <router-link :to="{ name: 'product', params: { id: randomTopProduct.id}}" class="random-item">
          <img class="product-image" :src="getImagePath(randomTopProduct)" alt="">
          <p class="product-title">{{ randomTopProduct.name }}</p>
          <p><em>${{ randomTopProduct.price }}</em></p>
        </router-link>
        <router-link :to="{ name: 'product', params: { id: randomBottomProduct.id}}" class="random-item">
          <img class="product-image" :src="getImagePath(randomBottomProduct)" alt>
          <p class="product-title">{{ randomBottomProduct.name }}</p>
          <p><em>${{ randomBottomProduct.price }}</em></p>
        </router-link>
        <router-link :to="{ name: 'product', params: { id: randomFootProduct.id}}" class="random-item">
          <img class="product-image" :src="getImagePath(randomFootProduct)" alt>
          <p class="product-title">{{ randomFootProduct.name }}</p>
          <p><em>${{ randomFootProduct.price }}</em></p>
        </router-link>
      </section>
      <button class="btn btn-grey" @click="recommendRandomOutfit">Suggest Me!</button>
    </div>
  </div>
</template>

<script>
import { imagePath } from "@/mixins/imagePath";

export default {
  name: "genderOverview",
  mixins: [imagePath],
  created() {
    this.recommendRandomOutfit();
  },
  data() {
    return {
      randomTopId: null,
      randomBottomId: null,
      randomFootId: null
    };
  },
  computed: {
    gender() {
      return this.$route.params.gender;
    },
    pageTitle() {
      return `${this.gender[0].toUpperCase()}${this.gender.slice(1)}`;
    },
    productsByGender() {
      return this.$store.getters.productsByGender(this.gender);
    },
    randomTopProduct() {
      return this.$store.getters.product(this.randomTopId);
    },
    randomBottomProduct() {
      return this.$store.getters.product(this.randomBottomId);
    },
    randomFootProduct() {
      return this.$store.getters.product(this.randomFootId);
    }
  },
  methods: {
    randomProductIdByCategory(category) {
      let categoryProducts = this.productsByGender.filter(p => p.category === category);
      let randomIndex = Math.floor(Math.random() * categoryProducts.length);
      return categoryProducts[randomIndex].id;
    },
    recommendRandomOutfit() {
      this.randomTopId = this.randomProductIdByCategory("Shirts");
      this.randomBottomId = this.randomProductIdByCategory("Pants");
      this.randomFootId = this.randomProductIdByCategory("Shoes");
    }
  }
};
</script>

<style lang="scss">
.random-items-list-wrapper {
  background: #fafafa;
  text-align: center;
  padding: 3rem;
}
.random-items-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.random-item {
  flex: 0 0 33%;
}
.grid-items-list {
  list-style: none;
  padding-left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}
.grid-item {
  box-sizing: border-box;
  text-align: center;
  padding: 1rem;
  flex: 0 0 33.3%;
  @media only screen and (max-width: 832px) {
    flex: 0 0 50%;
  }
  @media only screen and (max-width: 475px) {
    flex: 0 0 100%;
  }
}
</style>