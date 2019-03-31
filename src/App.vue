<template>
  <div class="app">
    <div class="nav wrapper flex-col flex-col--align-center">
      <h1 class="flex-col--2">Vue Store</h1>
      <div class="flex-col--2 nav-items">
        <router-link to="/" class="item">Home</router-link>
        <router-link :to="{ name: 'gender-overview', params: { gender: 'women'}}" class="item">
          Women
        </router-link>
        <router-link :to="{ name: 'gender-overview', params: { gender: 'men'}}" class="item">
          Men
        </router-link>
        <router-link to="/cart" class="item">
          Cart
          <cart-counter :count="cartCount"></cart-counter>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import CartCounter from "@/components/CartCounter";

export default {
  name: "app",
  components: { CartCounter },
  computed: {
    cartCount() {
      return this.$store.state.cart.length;
    }
  }
};
</script>

<style lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav {
  padding: 30px;
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.nav-items {
  justify-content: flex-end;
  display: flex;
}

.item {
  margin-left: 1rem;
  position: relative;
}

ul {
  padding-left: 0;
  list-style: none;
}
</style>
