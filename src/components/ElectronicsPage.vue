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
                    <!-- Remove Button -->
                    <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="removeFromCart(cartItem)"
                      class="ml-2"
                      v-b-tooltip.hover.bottomleft="'Remove'"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </div>
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
        <b-button class="mt-4" block>Check Out</b-button>
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
          img: "data:image/jpeg;base64,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0tq4DXpTcWmw1zvYGvaeYtcVZ/KF5+oWrs/qpVe309j8GTjnNNrOfLXGS0xawNdGlpHADiGluiYk6bjLHZ5N6cVufyhefqFq7P6r38o3n6jauz+qahaLTCOMowZIM5/sw7HUDOEdfMvKlKSTonP0ej/6tEDoUk/KN5+o2rs/qvfylefqNq7P6qOMLdSfCNuYSANHLDCnHXDcTvKNYQCA04x/25OGwlsjoUk/KV5+o2rs/qvfynefqNq7P6pxjynqz4R2jSjHi3E/wSOkOYQelH2VxMim/wBj4ANAClNLg7erRoixWqJmOKnE85V4XJew/wAlaeyCcUdSfCJvstR2dN2zClo/7W4nfmqm2WpGjxbo/wBHH2tGfft2qXNuu+B/krT2IVYsF8+p2nsWqdHUnwh1OxVIgsqAZ/sycY5udVMsTwZ0Kg1TxZmMdSmP4K+vU7T2DU/B316naewapRznwiX4Bx/RUnfSIGW1ZBoYS4P6aWuBhJ5lJPwV8+p2nsGqzaroveo3RdY7SRnhSA+CtFtHUnw0lGgwYaWjhONOc8YwG1ZFnLAYJbokGCaYEHEeY45gdavflW8/UbV2f1Xn5UvP1G1dn9VaMmiLzHwppaBxLw3Ej9lIERuB17NSyhaaYbIdpaOB5JbyTMQAJMHZtWMeCd5+o2rs/qvPylefqNq7P6qerKvJf8ZM+w/+lXKF7MBneNT9v8Kw/wAo3n6jauz+q8/KF5+o2rs/qq2vtbqWSalftLzh1VP6FlWThFRa8HTEHB3JqYjV+jMH4naod+ULz9RtXZ/VVUuBV6OMCw2id7Q0dbnALPUIm0z7u+cE7/pvizmowux4uHgkgCS2J1DHm5lKFxfwdeDm32a30bTXZTbTp8YT/iBzpdScwQGyP1bV2hRKIERFCRERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/9k=",
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
