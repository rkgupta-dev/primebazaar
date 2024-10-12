<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-container>
        <b-navbar-brand href="#">PrimeBazaar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/dealsoftheday">Deals of the day</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button
                variant="outline-light"
                size="sm"
                @click="$bvModal.show('bv-modal-example')"
              >
                <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                <span class=""> My Cart ({{ cart.length }})</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!--Modal of Cart Section -->
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>
          My <code>Cart</code> | ({{ cart.length }}) Items
        </template>
        <div class="d-block text-center">
          <ul v-if="cart.length">
            <li v-for="(cartItem, idx) in cart" :key="idx">
              {{ cartItem.name }} - ₹{{ cartItem.price }}
              <b-button
                variant="danger"
                size="sm"
                @click="removeFromCart(cartItem)"
                class="ml-2"
              >
                Remove
              </b-button>
            </li>
          </ul>
          <p v-else>Bhaiya please shopping kar ligiye na garib company hai.</p>
        </div>
        <b-button class="mt-3" block>Check Out</b-button>
      </b-modal>
    </div>

    <b-container class="my-4">
      <h3>Electronics Items</h3>
      <!-- Search Function -->
      <b-row>
        <b-col>
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for electronics..."
            class="my-4"
          />
        </b-col>
      </b-row>

      <!-- Electronics Items List -->
      <b-row>
        <b-col
          v-for="(item, index) in filteredItems"
          :key="index"
          md="3"
          class="my-2"
        >
          <b-card
            img-src="https://via.placeholder.com/300x200"
            img-alt="Item image"
            img-top
          >
            <b-card-text>
              <p>
                <strong>{{ item.name }}</strong>
              </p>
              <p><strong>Price:</strong> ₹{{ item.price }}</p>
              <p class="text-truncate">{{ item.description }}</p>
            </b-card-text>
            <b-button
              :variant="isInCart(item) ? 'danger' : 'primary'"
              @click="toggleCartItem(item)"
              size="sm"
            >
              {{ isInCart(item) ? "Remove from Cart" : "Add to Cart" }}
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      items: [
        {
          name: "Smart TV 55 inch",
          price: 49999,
          description:
            "High definition 4K Smart TV with amazing picture quality.",
        },
        {
          name: "Wireless Headphones",
          price: 7999,
          description:
            "Noise-cancelling, wireless headphones with a long-lasting battery.",
        },
        {
          name: "Gaming Laptop",
          price: 129999,
          description:
            "High-performance gaming laptop with 16GB RAM and 1TB SSD.",
        },
        {
          name: "Bluetooth Speaker",
          price: 2999,
          description:
            "Portable Bluetooth speaker with deep bass and crystal-clear sound.",
        },
        {
          name: "Smart Watch",
          price: 19999,
          description:
            "Water-resistant smartwatch with fitness tracking and call features.",
        },
        {
          name: "Tablet 10 inch",
          price: 39999,
          description:
            "Versatile tablet with a sharp display and long battery life.",
        },
      ],
      cart: [],
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    isInCart(item) {
      return this.cart.some((cartItem) => cartItem.name === item.name);
    },
    toggleCartItem(item) {
      if (this.isInCart(item)) {
        this.removeFromCart(item);
      } else {
        this.addToCart(item);
      }
    },
    addToCart(item) {
      this.cart.push(item);
      this.saveCartToLocalStorage();
      this.$bvToast.toast(`${item.name} added to the cart!`, {
        title: "Item Added",
        variant: "success",
        autoHideDelay: 3000, // Auto hide after 3 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    removeFromCart(item) {
      const index = this.cart.findIndex(
        (cartItem) => cartItem.name === item.name
      );
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 3000, // Auto hide after 3 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });
    },
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCartFromLocalStorage() {
      const cartFromStorage = localStorage.getItem("cart");
      if (cartFromStorage) {
        this.cart = JSON.parse(cartFromStorage);
      }
    },
  },
  mounted() {
    this.loadCartFromLocalStorage(); // Load the cart from localStorage when the component mounts
  },
};
</script>

<style scoped></style>
