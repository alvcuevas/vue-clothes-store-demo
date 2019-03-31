<template>
  <div class="wrapper">
    <h1>Cart</h1>
    <div class="flex-col">
      <ul class="cart-list">
        <li v-for="item in cartItems" :key="item.id" class="flex-col cart-list-item">
          <img :src="getImagePath(item)" class="thumbnail" alt>
          <div class="flex-col item-details">
            <div>
              <p>{{ item.name }}</p>
              <p>Size: {{ item.size }}</p>
              <p>Color: {{ item.color }}</p>
            </div>
            <p>${{ item.price }}</p>
            <button @click="removeFromCart(item.id)" class="btn btn-remove">Remove</button>
          </div>
        </li>
      </ul>
      <section class="total-section">
        <ul class="total-section-list">
          <li class="total-section-item">
            <p class="item-label">{{ cartItemsCount }} items</p>
            <p>{{ itemsSubtotal }}</p>
          </li>
          <li class="total-section-item">
            <p class="item-label">Shipping</p>
            <select v-model="selectedShippingOption">
              <option disabled value>Please select an option</option>
              <option
                v-for="option in shippingOptionsArray"
                :key="option.text"
                :value="option.rate"
              >{{ option.text }} (${{ option.rate }})</option>
            </select>
          </li>
          <li class="total-section-item">
            <p class="item-label">Subtotal</p>
            <p>{{ subtotal }}</p>
          </li>
          <li class="total-section-item">
            <p class="item-label">Total</p>
            <p>{{ total }}</p>
          </li>
        </ul>
        <button
          :disabled="!this.selectedShippingOption"
          class="btn btn-grey checkout-btn"
        >Check out</button>
      </section>
    </div>
  </div>
</template>

<script>
import { imagePath } from "@/mixins/imagePath.js";
export default {
  name: "cart",
  mixins: [imagePath],
  data() {
    return {
      salesTax: 0.06,
      selectedShippingOption: "",
      shippingOptionsArray: [
        {
          text: "One day",
          rate: 20
        },
        {
          text: "Two days",
          rate: 15
        },
        {
          text: "Three to five days",
          rate: 10
        },
        {
          text: "One week or more",
          rate: 5
        }
      ]
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartItemsCount() {
      return this.cartItems.length;
    },
    itemsSubtotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
    subtotal() {
      if (this.selectedShippingOption) {
        return Number(this.itemsSubtotal) + Number(this.selectedShippingOption);
      }
      return "---";
    },
    total() {
      if (this.selectedShippingOption) {
        return Number(this.subtotal) + Number(this.salesTaxApplied);
      }
      return "---";
    },
    salesTaxPercentage() {
      return `${this.salesTax * 100}%`;
    },
    salesTaxApplied() {
      if (this.selectedShippingOption) {
        return (this.subtotal * this.salesTax).toFixed(2);
      }
      return "---";
    }
  },
  methods: {
    removeFromCart(itemId) {
      this.$store.dispatch("removeFromCart", itemId);
    }
  }
};
</script>

<style lang="scss">
.cart-list {
  width: 70%;
  margin-right: 1rem;
  @media only screen and (max-width: 832px) {
    width: 100%;
  }
}

.cart-list-item {
  width: 100%;
  border-bottom: 1px solid #2c3e50;
}

.item-details {
  flex: 2;
  justify-content: space-between;
  margin-left: 2rem;
}

.btn-remove {
  margin-top: .5rem;
  &:hover {
    color: red;
  }
}

.thumbnail {
  max-width: 50px;
  margin-top: .5rem;
}

.total-section {
  background: #fafafa;
  padding: 0 1rem 1rem;
}

.total-section-list {
  margin: 0;
}

.total-section-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-label {
  font-weight: bold;
  margin-right: 1rem;
}

.checkout-btn {
  width: 100%;
}
</style>