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
              <b-button variant="outline-light" size="sm" to="/cart">
                <!-- @click="$bvModal.show('bv-modal-example')" -->
                <i class="fas fa-shopping-cart d-none d-md-inline"></i>
                <span class=""> My Cart ({{ cart.length }})</span>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-container class="my-4">
      <!-- Search Function -->
      <b-row class="my-4">
        <b-col md="8" sm="6"><h3>Accessories</h3></b-col>
        <b-col md="4" sm="6">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for accessories..."
          />
        </b-col>
      </b-row>

      <div>
        <b-row v-if="filteredItems.length === 0">
          <b-container
            class="d-flex flex-column align-items-center justify-content-center my-5"
          >
            <b-col cols="12" md="8" lg="6" class="text-center">
              <div class="mb-3">
                <b-icon
                  icon="search"
                  variant="secondary"
                  font-scale="2"
                ></b-icon>
              </div>
              <h4 class="font-weight-bold">Oops! Nothing Found!</h4>
              <p class="text-muted">
                Try searching for different keywords or check our categories!
              </p>
            </b-col>
          </b-container>
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
              img-alt="Item image"
              img-top
              class="h-100 rounded-lg shadow-sm product-card"
              no-body
            >
              <div class="position-relative">
                <b-badge
                  v-if="item.discount"
                  variant="success"
                  pill
                  class="position-absolute m-2 px-2 py-1"
                >
                  {{ item.discount }}% OFF
                </b-badge>
                <b-card-img :src="item.img" :alt="item.name" top></b-card-img>
              </div>

              <b-card-body class="d-flex flex-column">
                <div class="mb-2">
                  <h5 class="font-weight-bold text-truncate mb-1">
                    {{ item.name }}
                  </h5>
                  <div class="d-flex align-items-center mb-2">
                    <h4 class="text-primary mb-0 mr-2">₹{{ item.price }}</h4>
                    <small
                      v-if="item.originalPrice"
                      class="text-muted text-decoration-line-through"
                    >
                      ₹{{ item.originalPrice }}
                    </small>
                  </div>
                  <p class="text-muted small text-truncate mb-2">
                    {{ item.description }}
                  </p>
                </div>

                <div class="d-flex align-items-center mb-3">
                  <div class="d-flex">
                    <b-icon
                      v-for="star in 5"
                      :key="star"
                      :icon="star <= item.rating ? 'star-fill' : 'star'"
                      :variant="star <= item.rating ? 'warning' : 'secondary'"
                      class="mr-1"
                    ></b-icon>
                  </div>
                  <small class="ml-2 text-muted">{{ item.rating }}/5</small>
                </div>

                <b-button
                  :variant="isInCart(item) ? 'danger' : 'primary'"
                  @click="toggleCartItem(item)"
                  class="mt-auto"
                  pill
                  size="sm"
                >
                  <b-icon
                    :icon="isInCart(item) ? 'cart-dash' : 'cart-plus'"
                    class="mr-1"
                  ></b-icon>
                  {{ isInCart(item) ? "Remove" : "Add to Cart" }}
                </b-button>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
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
          id: "a1",
          quantity: 1,
          name: "Sunglasses",
          price: 699,
          discount: 15,
          rating: 5,
          description:
            "Stylish UV-protected sunglasses for outdoor activities.",
          img: "https://img.freepik.com/free-photo/sunglasses_1203-7884.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a2",
          quantity: 1,
          name: "Leather Wallet",
          price: 999,
          discount: 20,
          rating: 5,
          description: "Premium leather wallet with multiple compartments.",
          img: "https://img.freepik.com/free-photo/brown-isolated-leather-pocket-with-white-background_1258-47.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a3",
          quantity: 1,
          name: "Backpack",
          price: 1499,
          discount: 10,
          rating: 4,
          description: "Spacious and durable backpack for daily use.",
          img: "https://img.freepik.com/free-photo/view-3d-school-backpack_23-2151103644.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a4",
          quantity: 1,
          name: "Baseball Cap",
          price: 399,
          discount: 15,
          rating: 4,
          description: "Adjustable cap with a sporty look.",
          img: "https://img.freepik.com/free-photo/set-two-trucker-hats-with-mesh-back_23-2149410050.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a5",
          quantity: 1,
          name: "Wristwatch",
          price: 2499,
          discount: 25,
          rating: 5,
          description: "Elegant wristwatch with a stainless steel strap.",
          img: "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a6",
          quantity: 1,
          name: "Earbuds",
          price: 1999,
          discount: 20,
          rating: 4,
          description: "Wireless earbuds with noise cancellation.",
          img: "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074246.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a7",
          quantity: 1,
          name: "Handbag",
          price: 2299,
          discount: 15,
          rating: 5,
          description: "Chic handbag with ample space for essentials.",
          img: "https://img.freepik.com/free-photo/purse-background-handle-fashionable-fashion_1203-6492.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a8",
          quantity: 1,
          name: "Belt",
          price: 599,
          discount: 10,
          rating: 4,
          description: "Classic leather belt with a sleek buckle.",
          img: "https://img.freepik.com/free-photo/cinturon-con-fondo-blanco_1187-1576.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a9",
          quantity: 1,
          name: "Scarf",
          price: 499,
          discount: 20,
          rating: 4,
          description: "Soft and cozy scarf to elevate any outfit.",
          img: "https://img.freepik.com/free-photo/beautiful-scarf_1203-7762.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
        },
        {
          id: "a10",
          quantity: 1,
          name: "Travel Pouch",
          price: 899,
          discount: 15,
          rating: 4,
          description: "Compact travel pouch to keep essentials organized.",
          img: "https://img.freepik.com/free-photo/toilet-bag-baggage-arrangement_23-2149879593.jpg?ga=GA1.1.1001727922.1730456661&semt=ais_hybrid",
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
  mounted() {
    this.loadCartFromLocalStorage(); // Load the cart from localStorage when the component mounts
  },
  methods: {
    isInCart(item) {
      return this.cart.some((cartItem) => cartItem.id === item.id);
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
        autoHideDelay: 2000, // Auto hide after 2 seconds
        solid: true,
        toaster: "b-toaster-bottom-center",
      });

      const existingProduct = this.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingProduct) {
        existingProduct.quantity += 0; // Increase quantity if the product is already in the cart
      } else {
        // Add new product to the cart with default quantity 1
        this.cart.push({
          ...item,
          quantity: 1,
          img: item.img || "path/to/default/image.jpg", // Use item's img or default image
        });
        this.$bvToast.toast(`${item.name} added to the cart!`, {
          title: "Item Added",
          variant: "success",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }

      this.saveCartToLocalStorage();
    },
    updateCartQuantity(item, quantity) {
      // Correct comparison: Find the cart item by comparing the ids
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);

      if (cartItem && quantity > 0) {
        cartItem.quantity = quantity; // Update the quantity
        this.saveCartToLocalStorage(); // Save updated cart to localStorage

        this.$bvToast.toast(`${item.name} quantity updated!`, {
          title: "Quantity Updated",
          variant: "info",
          autoHideDelay: 2000,
          solid: true,
          toaster: "b-toaster-bottom-center",
        });
      }
    },
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.saveCartToLocalStorage();
      }
      this.$bvToast.toast(`${item.name} removed from the cart!`, {
        title: "Item Removed",
        variant: "danger",
        autoHideDelay: 2000, // Auto hide after 2 seconds
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
    checkoutFn() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped></style>
