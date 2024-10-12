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
      <!-- Cart Modal -->
      <b-modal id="bv-modal-example" hide-footer title-class="font-weight-bold">
        <template #modal-title>
          My <code>Cart</code> | ({{ cart.length }}) Items
        </template>

        <!-- Cart Items List -->
        <div>
          <div v-if="cart.length">
            <!-- Iterate through cart items -->
            <b-card
              v-for="(cartItem, idx) in cart"
              :key="idx"
              class="my-3 p-3 border shadow-sm"
            >
              <!-- Row layout for Image and Details -->
              <div class="d-flex">
                <!-- Product Image -->
                <b-img
                  :src="cartItem.img"
                  alt="Product image"
                  fluid
                  class="cart-item-image mr-3"
                ></b-img>

                <!-- Product Details -->
                <div class="cart-item-details">
                  <!-- Product Name -->
                  <h5 class="mb-2">{{ cartItem.name }}</h5>

                  <!-- Product Price -->
                  <h6 class="text-danger font-weight-bold">
                    ₹{{ cartItem.price }}
                  </h6>

                  <!-- Quantity control -->
                  <div class="d-flex align-items-center my-2">
                    <label class="mr-2">Qty:</label>
                    <b-form-spinbutton
                      :id="'sb-inline-' + idx"
                      v-model="cartItem.quantity"
                      inline
                      min="1"
                      max="100"
                      size="sm"
                    ></b-form-spinbutton>
                  </div>

                  <!-- Remove Button -->
                  <b-button
                    variant="outline-danger"
                    size="sm"
                    @click="removeFromCart(cartItem)"
                    class="ml-2"
                  >
                    Remove
                  </b-button>
                </div>
              </div>
            </b-card>
          </div>

          <!-- No Items Message -->
          <p v-else class="text-center text-muted mt-3">
            Bhaiya please shopping kar ligiye na, garib company hai.
          </p>
        </div>

        <!-- Checkout Button -->
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
      <b-row v-if="filteredItems.length === 0">
        <b-col>
          <h4>Oops! Nothing Found!</h4>
          <p>Try searching for different keywords or check our categories!</p>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col
          v-for="(item, index) in filteredItems"
          :key="index"
          md="3"
          cols="6"
          sm="6"
          class="my-2"
        >
          <b-card
            :img-src="item.img"
            img-alt="Item image"
            img-top
            class="custom-card"
          >
            <b-card-text>
              <p class="text-truncate">
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
              {{ isInCart(item) ? "Remove" : "Add to Cart" }}
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
          img: "data:image/jpeg;base64,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",
        },
        {
          name: "Wireless Headphones",
          price: 7999,
          description:
            "Noise-cancelling, wireless headphones with a long-lasting battery.",
          img: "data:image/jpeg;base64,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",
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

<style scoped>
.custom-card img {
  width: 100px;
  height: 100px;
}
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
